import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

const MyProfile = () => {
    const { user } = useContext(AuthContext);

    // If for some reason the user data isn't available, show a loading or error state.
    if (!user) {
        return (
            <div className="text-center mt-20">
                <p>Loading user profile...</p>
                <p className="text-sm text-gray-500">If you are not redirected, please <Link to="/login" className="underline">log in</Link>.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
            <div className="bg-white p-8 rounded-xl shadow-md border">
                <div className="flex flex-col items-center">
                    {/* Profile Avatar */}
                    <div className="w-24 h-24 mb-4 bg-pink-500 rounded-full text-white flex items-center justify-center text-4xl font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>

                    {/* User Details */}
                    <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                    <p className="text-md text-gray-500 mt-1">{user.email}</p>
                    <span className="mt-3 px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Account
                    </span>
                </div>

                <div className="mt-8 pt-6 border-t text-center">
                    <p className=""></p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
