import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css'; // We'll create this file for styling

 const Header = () => {
    const { user, logout, isAuthenticated } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleHostProperty = () => {
        navigate('/host-property');
    };
    
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const renderGuestControls = () => (
        <div className="search-bar">
            <span>Where</span>
            <span>Check in</span>
            <span>Check out</span>
            <span>No of Guests</span>
            <button className="search-icon">🔍</button>
        </div>
    );

    const renderHostControls = () => (
        <div className="host-controls">
            <button onClick={handleHostProperty} className="host-property-btn">
                Host a property
            </button>
        </div>
    );

    return (
        <header className="app-header">
            <Link to="/" className="logo">
                TRIPNEST
            </Link>

            {isAuthenticated && user?.role === 'guest' && renderGuestControls()}
            {isAuthenticated && user?.role === 'host' && renderHostControls()}

            <div className="user-menu">
                {isAuthenticated ? (
                    <div className="collapsible-dashboard">
                        <button onClick={toggleDropdown} className="dashboard-toggle">
                            {user?.name || 'Menu'} ▾
                        </button>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <Link to="/my-bookings">My Bookings</Link>
                                <Link to="/profile">My Profile</Link>
                                <button onClick={logout}>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="auth-links">
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                )}
            </div>
        </header>
    );
};


export default Header