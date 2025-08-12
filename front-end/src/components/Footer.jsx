import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 border-t mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6 text-sm text-gray-500">
                  
                    <div>
                        <Link to="/about" className="hover:underline">About Us</Link>
                    </div>

                    
                    <div className="text-center">
                        <p>&copy; {currentYear} TripNest. All rights reserved.</p>
                    </div>

                    
                    <div>
                        <Link to="/contact" className="hover:underline">Contact Us</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
