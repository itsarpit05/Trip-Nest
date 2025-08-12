import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// The 'role' prop is optional. If provided, it will check the user's role.
const ProtectedRoute = ({ children, role }) => {
    const { isAuthenticated, user, isLoading } = useContext(AuthContext);
    const location = useLocation();

    // While context is loading user from localStorage, don't render anything
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If a role is required and the user's role doesn't match, redirect
    if (role && user.role !== role) {
        // Redirect them to the home page or an "unauthorized" page
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
