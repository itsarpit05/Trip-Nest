import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext.jsx';

const MyBookingsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState('');
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);

    // booking haandling k liye
    useEffect(() => {
        if (location.state?.message) {
            setNotification(location.state.message);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    // Function to fetch all bookings
    const fetchBookings = async () => {
        try {
            const res = await API.get('/api/bookings/mybookings');
            setBookings(res.data);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to fetch bookings.');
            console.error('Failed to fetch bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch bookings on initial load
    useEffect(() => {
        fetchBookings();
    }, []);

    // Function to handle booking cancellation
    const handleCancelBooking = async (bookingId) => {
        // Confirm with the user before deleting
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            await API.delete(`/api/bookings/${bookingId}`);
            // On success, filter out the deleted booking from the state
            setBookings((prevBookings) =>
                prevBookings.filter((b) => b._id !== bookingId),
            );
            setNotification('Booking cancelled successfully.'); // Show success message
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to cancel booking.');
        }
    };

    if (loading)
        return (
            <div className="text-center mt-20">Loading your bookings...</div>
        );

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
            {/* Display success or error messages */}
            {notification && (
                <div
                    className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md relative mb-8"
                    role="alert"
                >
                    <p>{notification}</p>
                </div>
            )}
            {error && (
                <div
                    className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md relative mb-8"
                    role="alert"
                >
                    <p>{error}</p>
                </div>
            )}

            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-gray-600 mb-8">
                {user?.role === 'host'
                    ? 'Here are all the upcoming stays at your properties.'
                    : 'Here are all your upcoming trips.'}
            </p>

            {bookings.length > 0 ? (
                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white p-4 rounded-xl shadow-md border"
                        >
                            <div className="flex flex-col md:flex-row gap-5">
                                <img
                                    src={
                                        booking.property.images[0] ||
                                        'https://placehold.co/600x400/E2E8F0/AAAAAA?text=No+Image'
                                    }
                                    alt={booking.property.title}
                                    className="w-full md:w-56 h-48 object-cover rounded-lg"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {booking.property.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {booking.property.address.city},{' '}
                                        {booking.property.address.country}
                                    </p>
                                    <div className="mt-4 pt-4 border-t">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-700">
                                                    Check-in
                                                </p>
                                                <p className="text-md font-bold text-pink-600">
                                                    {new Date(
                                                        booking.checkin,
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-700">
                                                    Check-out
                                                </p>
                                                <p className="text-md font-bold text-pink-600">
                                                    {new Date(
                                                        booking.checkout,
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm font-semibold text-gray-700">
                                                Guests
                                            </p>
                                            <p className="text-md">
                                                {booking.guests}
                                            </p>
                                        </div>
                                        {user.role === 'host' && (
                                            <div className="mt-3">
                                                <p className="text-sm font-semibold text-gray-700">
                                                    Booked by
                                                </p>
                                                <p className="text-md">
                                                    {booking.user.name} (
                                                    {booking.user.email})
                                                </p>
                                            </div>
                                        )}
                                        <p className="mt-3 text-lg font-bold text-right text-gray-800">
                                            Total:₹{booking.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Update and Delete Buttons */}
                            {user.role === 'guest' && (
                                <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/property/${booking.property._id}`,
                                            )
                                        }
                                        className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                                    >
                                        Update Booking
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleCancelBooking(booking._id)
                                        }
                                        className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold">No Bookings Found</h3>
                    <p className="text-gray-500 mt-2">
                        {user.role === 'guest'
                            ? 'It looks like you have not made any bookings yet. Start exploring!'
                            : 'No one has yet booked your properties'}
                    </p>
                    <Link
                        to="/"
                        className="mt-4 inline-block bg-pink-500 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-600 transition-colors"
                    >
                        Browse Properties
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyBookingsPage;
