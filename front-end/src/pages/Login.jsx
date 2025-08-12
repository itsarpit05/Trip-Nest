import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import API from "../services/api";
import React from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await API.post('/api/auth/login', { email, password });
            login(res.data);
        } catch (err) {
            setError(err.response?.data?.msg || err.response?.data?.error || "Login failed");
        }
    };

    return (
        // Main container to center the content on the page
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            {/* The login card */}
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </form>
                {error && <p className="text-sm text-center text-red-500">{error}</p>}
            </div>
        </div>
    );
};
