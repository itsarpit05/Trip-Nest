import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Header = () => {
    const { user, logout, isAuthenticated } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const renderGuestControls = () => (
        <div className="flex items-center border border-gray-200 rounded-full shadow-sm">
            <div className="px-4 py-2 font-semibold border-r border-gray-200">Where</div>
            <div className="px-4 py-2 font-semibold border-r border-gray-200">Check in</div>
            <div className="px-4 py-2 font-semibold border-r border-gray-200">Check out</div>
            <div className="px-4 py-2 text-gray-500">No of Guests</div>
            <button className="p-2 m-1 text-white bg-pink-500 rounded-full">
                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </div>
    );

    const renderHostControls = () => (
        <button onClick={() => navigate('/host-property')} className="px-4 py-2 font-semibold transition rounded-full hover:bg-gray-100">
            Host your property
        </button>
    );

    return (
       
        <header className="flex items-center justify-between p-4 border-b">
            
            <Link to="/" className="text-2xl font-bold text-pink-500">
                TRIPNEST
            </Link>

          
            <div className="hidden md:block">
                {isAuthenticated && user?.role === 'guest' && renderGuestControls()}
                {isAuthenticated && user?.role === 'host' && renderHostControls()}
            </div>

           
            <div className="relative z-50">
                {isAuthenticated ? (
                    <div>
                        <button 
                            onClick={() => setShowDropdown(!showDropdown)} 
                            className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-full"
                        >
                             <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <div className="w-8 h-8 overflow-hidden bg-gray-600 rounded-full text-white flex items-center justify-center font-bold">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 w-48 py-2 mt-2 bg-white border rounded-lg shadow-xl">
                                <Link to="/my-bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Bookings</Link>
                                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                                <div className="border-t my-1"></div>
                                <button onClick={logout} className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="px-4 py-2 font-semibold rounded-full hover:bg-gray-100">Login</Link>
                        <Link to="/signup" className="px-4 py-2 font-semibold rounded-full hover:bg-gray-100">Sign Up</Link>
                    </div>
                )}
            </div>
        </header>
         
    );
};

export default Header;
