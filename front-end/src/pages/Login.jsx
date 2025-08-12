import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import React from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Use the login function from our context
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            
            const res = await API.post('/api/auth/login', { email, password });
            
            // Call the context login function with the response data
            // This will handle saving data and redirecting
            login(res.data);

        } catch (err) {
            setError(err.response?.data?.msg || err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};
