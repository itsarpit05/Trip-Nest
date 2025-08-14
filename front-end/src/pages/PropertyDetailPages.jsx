import React, { useContext, useState, useEffect } from 'react';
import API from '../services/api';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { AuthContext } from '../context/AuthContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
// import max

const PropertyDetailPage = () => {
    const { id } = useParams(); // Get the property ID from the URL
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    const [guests, setGuests] = useState(1);

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
            setError('You must be logged in to book a property.');
            return;
        }

        try {
            const bookingData = {
                property: id,
                checkin: dateRange[0].startDate,
                checkout: dateRange[0].endDate,
                guests: guests,
            };
            await API.post('/api/bookings', bookingData);
            // On success, navigate to the user's bookings page
            navigate('/my-bookings', {
                state: {
                    message: 'Booking confirmed! Your trip is now booked.',
                },
            });
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to create booking.');
        }
    };

    const goToNextImage = () => {
        const isLastImage = currentImageIndex === property.images.length - 1;
        const newIndex = isLastImage ? 0 : currentImageIndex + 1;
        setCurrentImageIndex(newIndex);
    };

    const goToPreviousImage = () => {
        const isFirstImage = currentImageIndex === 0;
        const newIndex = isFirstImage
            ? property.images.length - 1
            : currentImageIndex - 1;
        setCurrentImageIndex(newIndex);
    };

    if (loading) return <div className="text-center mt-20">Loading...</div>;
    if (error)
        return <div className="text-center mt-20 text-red-500">{error}</div>;
    if (!property)
        return <div className="text-center mt-20">Property not found.</div>;

    const {
        title,
        address,
        images,
        pricePerNight,
        description,
        amenities,
        owner,
        maxGuests,
    } = property;

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            {/* Property Header */}
            <div className="mb-4">
                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="flex items-center gap-2 text-md text-gray-500 mt-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    <span>{`${address.street}, ${address.city}, ${address.state}, ${address.country}`}</span>
                </div>
            </div>
            {/* --- NEW: Image Slider --- */}
            {images && images.length > 0 && (
                <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden group">
                    <img
                        src={images[currentImageIndex]}
                        alt={`${title} ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                    />
                    {/* Left Arrow */}
                    <button
                        onClick={goToPreviousImage}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    {/* Right Arrow */}
                    <button
                        onClick={goToNextImage}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-2 py-1 rounded-md">
                        {currentImageIndex + 1} / {images.length}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Details */}
                <div className="lg:col-span-2">
                    <div className="pb-6 border-b">
                        <h2 className="text-2xl font-semibold">
                            Hosted by {owner?.name || 'A Host'}
                        </h2>
                        <p className="mt-4 text-gray-700">{description}</p>
                    </div>

                    {/* Amenities */}
                    <div className="py-6 border-b">
                        <h3 className="text-xl font-semibold mb-4">
                            What this place offers
                        </h3>
                        {amenities.length > 0 ? (
                            <ul className="grid grid-cols-2 gap-4">
                                {amenities.map((amenity, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2 text-gray-700"
                                    >
                                        {/* Simple checkmark icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-green-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        {amenity}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">
                                No amenities listed for this property.
                            </p>
                        )}
                    </div>
                </div>

                {/* Right Side: Booking Box */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 p-6 border rounded-xl shadow-lg">
                        <p className="text-2xl mb-4">
                            <span className="font-bold">₹{pricePerNight}</span>
                            <span className="text-gray-600"> / night</span>
                        </p>

                        {/* Calendar Placeholder */}
                        <div className="border rounded-lg overflow-hidden">
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item) =>
                                    setDateRange([item.selection])
                                }
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                                minDate={new Date()} // Prevent booking past dates
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-gray-700">
                                Guests
                            </label>
                            <input
                                type="number"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                min="1"
                                max={maxGuests || 1} // Use maxGuests from property data
                                className="mt-1 w-full p-2 border rounded-md"
                            />
                        </div>
                        <button
                            onClick={handleBooking}
                            className="mt-4 w-full bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition"
                        >
                            Reserve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailPage;
