import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// The 'role' prop is optional. If provided, it will check the user's role.
const ProtectedRoute = ({ children, role }) => {
    const { isAuthenticated, user, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
