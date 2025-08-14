import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 border-t mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6 text-sm text-gray-500">
                    <div className="flex flex-col space-y-2">
                        <Link
                            to="/about"
                            className="hover:underline text-gray-700"
                        >
                            About Us
                        </Link>
                        <p className="text-gray-700">Privacy Policy</p>
                        <p className="text-gray-700">Careers</p>
                    </div>

                    <div className="text-center">
                        <p>
                            &copy; {currentYear} TripNest. All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Link to="/contact" className="hover:underline">
                            Contact Us
                        </Link>
                        <p>Press Release</p>
                        <p>Services</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
