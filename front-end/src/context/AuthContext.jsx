import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api.js';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To handle initial auth check
    const navigate = useNavigate();

    // Effect to check for user session on initial load
    useEffect(() => {
        const loadUser = () => {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('accesstoken');

            if (storedUser && token) {
                setUser(JSON.parse(storedUser));
                // Set the token for all subsequent API requests
                API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    // Login function
    const login = (userData) => {
        // The user object from the backend now includes the role
        localStorage.setItem('user', JSON.stringify(userData.user));
        localStorage.setItem('accesstoken', userData.accesstoken);
        API.defaults.headers.common['Authorization'] = `Bearer ${userData.accesstoken}`;
        setUser(userData.user);
        navigate('/'); // Redirect to home on login
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accesstoken');
        delete API.defaults.headers.common['Authorization'];
        setUser(null);
        navigate('/login'); // Redirect to login on logout
    };

    // The value provided to consuming components
    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading: loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
