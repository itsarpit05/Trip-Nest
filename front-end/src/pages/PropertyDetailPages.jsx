import React, {useContext, useState, useEffect } from 'react';
import API from '../services/api';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { AuthContext } from '../context/AuthContext.jsx';
import {useParams ,useNavigate } from 'react-router-dom';


const PropertyDetailPage = () => {
    
    const { id } = useParams(); // Get the property ID from the URL
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

     const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate : new Date(),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await API.get(`/api/properties/${id}`);
                setProperty(res.data);
            } catch (err) {
                setError('Failed to fetch property details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]); // Re-run the effect if the ID changes

      const handleBooking = async () => {
        if (!user) {
            setError("You must be logged in to book a property.");
            return;
        }

        try {
            const bookingData = {
                property: id,
                checkin: dateRange[0].startDate,
                checkout: dateRange[0].endDate,
            };
            await API.post('/api/bookings', bookingData);
            // On success, navigate to the user's bookings page
           navigate('/my-bookings', { 
                state: { message: 'Booking confirmed! Your trip is now booked.' } 
            });

        } catch (err) {
            setError(err.response?.data?.msg || "Failed to create booking.");
        }
    };


    if (loading) return <div className="text-center mt-20">Loading...</div>;
    if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
    if (!property) return <div className="text-center mt-20">Property not found.</div>;

    const { title, address, images, pricePerNight, description, amenities, owner } = property;

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            {/* Property Header */}
            <div className="mb-4">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-md text-gray-600 underline mt-1">
                    {`${address.street}, ${address.city}, ${address.state}, ${address.country}`}
                </p>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 rounded-lg overflow-hidden">
                <div className="col-span-1 md:col-span-2">
                    <img src={images[0]} alt={title} className="w-full h-full object-cover" />
                </div>
                {images.slice(1, 5).map((img, index) => (
                    <div key={index} className="hidden md:block">
                        <img src={img} alt={`${title} ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Details */}
                <div className="lg:col-span-2">
                    <div className="pb-6 border-b">
                        <h2 className="text-2xl font-semibold">Hosted by {owner?.name || 'A Host'}</h2>
                        <p className="mt-4 text-gray-700">{description}</p>
                    </div>

                    {/* Amenities */}
                    <div className="py-6 border-b">
                        <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
                        <ul className="grid grid-cols-2 gap-2">
                            {amenities.map((amenity, index) => (
                                <li key={index} className="flex items-center">{amenity}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Side: Booking Box */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 p-6 border rounded-xl shadow-lg">
                        <p className="text-2xl mb-4">
                            <span className="font-bold">${pricePerNight}</span>
                            <span className="text-gray-600"> / night</span>
                        </p>
                        
                        {/* Calendar Placeholder */}
                        <div className="border rounded-lg overflow-hidden">
                         <DateRange
                            editableDateInputs={true}
                            onChange={item => setDateRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dateRange}
                            minDate={new Date()} // Prevent booking past dates
                        />
                    </div>

                        <button onClick={handleBooking} className="mt-4 w-full bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition">
                            Reserve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailPage;