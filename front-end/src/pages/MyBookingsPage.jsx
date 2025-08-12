import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import API from '../services/api';

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // This single endpoint works for both guests and hosts!
                const res = await API.get('/api/bookings/mybookings');
                setBookings(res.data);
            } catch (err) {
                setError(err.response?.data?.msg || 'Failed to fetch bookings.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <div>Loading bookings...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div>
            <h1>My Bookings</h1>
            {user.role === 'host' && <p>Showing bookings for all your properties.</p>}
            
            <div className="bookings-list">
                {bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    bookings.map(booking => (
                        <div key={booking._id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
                            <h3>{booking.property.title}</h3>
                            <p>Check-in: {new Date(booking.checkin).toLocaleDateString()}</p>
                            <p>Check-out: {new Date(booking.checkout).toLocaleDateString()}</p>
                            <p>Guests: {booking.guests}</p>
                            <p>Total Price: ${booking.price}</p>
                            {/* For hosts, show who booked it */}
                            {user.role === 'host' && <p>Booked by: {booking.user.name} ({booking.user.email})</p>}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyBookingsPage;
