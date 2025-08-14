import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Header = () => {
    const { user, logout, isAuthenticated } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimated(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const renderGuestControls = () => (
        <div
            className={`hidden md:flex items-center justify-center transition-all duration-700 ease-out ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
        >
            <p
                className="text-3xl font-medium text-gray-600 tracking-widest transition-all duration-300 hover:text-pink-500 hover:drop-shadow-lg"
                style={{ fontFamily: "'Dancing Script', cursive" }}
            >
                Find your nest, start your journey....
            </p>
        </div>
    );

    const renderHostControls = () => (
        <button
            onClick={() => navigate('/host-property')}
            className="px-8 py-4 font-semibold transition rounded-full bg-gray-300 hover:bg-pink-500"
        >
            Host your property
        </button>
    );

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');
                `}
            </style>
            <header className="flex items-center justify-between p-4 border-b">
                <Link to="/" className="flex items-center">
                    <img
                        src="https://res.cloudinary.com/dkkvovzts/image/upload/v1755147233/Gemini_Generated_Image_yey3rryey3rryey3-removebg-preview_ightv1.png"
                        alt="TripNest Logo"
                        className="h-17 "
                    />
                </Link>

                <div className="hidden md:block">
                    {isAuthenticated &&
                        user?.role === 'guest' &&
                        renderGuestControls()}
                    {isAuthenticated &&
                        user?.role === 'host' &&
                        renderHostControls()}
                </div>

                <div className="relative z-50">
                    {isAuthenticated ? (
                        <div>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-full"
                            >
                                <svg
                                    xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
                                    className="w-6 h-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                                <div className="w-8 h-8 overflow-hidden bg-gray-600 rounded-full text-white flex items-center justify-center font-bold">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            </button>
                            {showDropdown && (
                                <div className="absolute right-0 w-48 py-2 mt-2 bg-white border rounded-lg shadow-xl">
                                    <Link
                                        to="/my-bookings"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        My Bookings
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        My Profile
                                    </Link>
                                    <div className="border-t my-1"></div>
                                    <button
                                        onClick={logout}
                                        className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="px-4 py-2 font-semibold rounded-full hover:bg-gray-100"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-2 font-semibold rounded-full hover:bg-gray-100"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
