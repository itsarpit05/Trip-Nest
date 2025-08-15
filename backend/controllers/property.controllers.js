import { Property } from '../models/property.models.js';
import { Bookings } from '../models/bookings.models.js';

// creating a property
export const createProperty = async (req, res) => {
    try {
        const { title, description, address, pricePerNight, images, amenities, maxGuests } = req.body;
        const property = new Property({
            title,
            description,
            address,
            pricePerNight,
            images,
            amenities,
            maxGuests, // The amenities array will now be correctly included
            owner: req.user.id,
        }); // owner is automatically sent from req.user.id
        await property.save(); // saves this created property in mongoDB
        res.status(201).json(property); // responds with the created property
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read all properties

export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate(
            'owner',
            'name email',
        ); // finds all the properties saved in db
        res.json(properties); // responds with those properties
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read one property

export const findProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate(
            'owner',
            'name email',
        );
        if (!property) {
            return res.status(400).json({ msg: 'Property not found' });
        }

        res.json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//update a property
export const updateProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            },
        );
        if (!property)
            return res.status(404).json({ message: 'Property not found' });
        if (property.owner.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ msg: 'Not authorized to update this property' }); // to prevent self booking by host
        }
        res.json(property);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// deletes a property
export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property)
            return res.status(404).json({ message: 'Property not found' });
        if (property.owner.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ msg: 'Not authorized to delete this property' });
        }
        res.json({ msg: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search property

export const searchProperties = async (req, res) => {
    const { location, checkin, checkout, guests } = req.query;

    try {
        let query = {};

        // Filter by location (case-insensitive search on city, state, or country)
        if (location) {
            query.$or = [
                { 'address.city': { $regex: location, $options: 'i' } },
                { 'address.state': { $regex: location, $options: 'i' } },
                { 'address.country': { $regex: location, $options: 'i' } },
            ];
        }

        // Filter by number of guests
        if (guests) {
            query.maxGuests = { $gte: parseInt(guests, 10) };
        }

        let availableProperties = await Property.find(query);

        // Filter by date availability
        if (checkin && checkout) {
            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);

            // Find all bookings that overlap with the requested dates
            const overlappingBookings = await Bookings.find({
                property: { $in: availableProperties.map((p) => p._id) }, // Only check bookings for the filtered properties
                $or: [
                    {
                        checkin: { $lt: checkoutDate },
                        checkout: { $gt: checkinDate },
                    },
                ],
            });

            // Get the IDs of the properties that are already booked
            const bookedPropertyIds = overlappingBookings.map((booking) =>
                booking.property.toString(),
            );

            // Filter out the booked properties from our list
            availableProperties = availableProperties.filter(
                (property) =>
                    !bookedPropertyIds.includes(property._id.toString()),
            );
        }

        if (availableProperties.length === 0) {
            return res
                .status(404)
                .json({ msg: 'No properties found for your search criteria.' });
        }

        res.json(availableProperties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
