import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const res = await API.get('/api/auth/me');
                setUser(res.data);
            } catch (err) {
                // If the request fails, it means no valid cookie was found
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkLoggedIn();
    }, []);

    // Login function
    const login = (userData) => {
        setUser(userData);
        navigate('/');
    };

    // Logout function
    const logout = async () => {
        try {
            await API.post('/api/auth/logout'); // This will clear the cookie on the backend
            setUser(null);
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    // The value provided to consuming components
    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading: loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
