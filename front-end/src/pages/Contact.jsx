import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Contact() {
    const navigate = useNavigate();
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                'service_6k4a4ng',
                'template_esf3s7w',
                form.current,
                'b2bHFMHthZvpnYohR',
            )
            .then(
                (result) => {
                    console.log(result.text);
                    alert('Message sent successfully!');
                    navigate('/');
                },
                (error) => {
                    console.log(error.text);
                    alert('Failed to send message. Try again.');
                },
            );
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Shoot Your Queries
                </h2>
                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full px-4 py-2 text-gray-700 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 text-gray-700 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Message"
                        rows="4"
                        className="w-full px-4 py-2 text-gray-700 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
