import React, { useState, useEffect } from 'react';
import API from '../services/api';
import PropertyCard from '../components/PropertyCard.jsx';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await API.get('/api/properties');
                setProperties(res.data);
            } catch (err) {
                setError('Failed to fetch properties.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    if (loading) return <div className="text-center mt-20">Loading properties...</div>;
    if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-8">Available Properties</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {properties.map(property => (
                    <PropertyCard key={property._id} property={property} />
                ))}
            </div>
        </div>
    );
};

export default Home;