import Razorpay from 'razorpay'
import crypto from 'crypto'
import { Property } from '../models/property.models.js'
import { Bookings } from '../models/bookings.models.js'

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const createOrder = async (req, res) => {
    const { propertyId, checkin, checkout } = req.body;

    try {
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }

        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));

        if (nights <= 0) {
            return res.status(400).json({ msg: "Invalid date range." });
        }

        const amount = nights * property.pricePerNight * 100; // Amount in paise

        const options = {
            amount,
            currency: "INR",
            receipt: `receipt_booking_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);

    } catch (error) {
        res.status(500).json({ error: "Server error while creating order." });
    }
};


export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingDetails } = req.body;
     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ success: false, error: "Missing required payment details." });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        // --- PAYMENT IS VERIFIED ---
        // Now, create the booking in the database
        try {
            const { property, checkin, checkout, guests, price } = bookingDetails;
            
            const newBooking = new Bookings({
                property,
                user: req.user.id,
                checkin,
                checkout,
                guests,
                price,
                status: "Booked"
            });

            await newBooking.save();
            res.status(201).json({ success: true, booking: newBooking });

        } catch (dbError) {
            res.status(500).json({ success: false, error: "Database error after payment verification." });
        }
    } else {
        res.status(400).json({ success: false, error: "Payment verification failed." });
    }
};