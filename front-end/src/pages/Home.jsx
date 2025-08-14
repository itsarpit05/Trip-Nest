import React, { useState, useEffect } from 'react';
import API from '../services/api';
import PropertyCard from '../components/PropertyCard.jsx';
import Search from '../components/Search.jsx';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        setLoading(true);
        setError('');

        try {
            const params = new URLSearchParams(); // Helps to format url contaning ? ,=,&
            if (e.location) {
                params.append('location', e.location);
            }
            if (e.checkin && e.checkin.getTime() !== e.checkout.getTime()) {
                params.append('checkin', e.checkin.toISOString());
            }
            if (e.checkout && e.checkin.getTime() !== e.checkout.getTime()) {
                params.append('checkout', e.checkout.toISOString());
            }
            if (e.guests) {
                params.append('guests', e.guests);
            }

            const res = await API.get(
                `/api/properties/search?${params.toString()}`,
            );
            setProperties(res.data);
        } catch (error) {
            setError(
                error.response?.data?.msg ||
                    'No properties found matching your search.',
            );
            setProperties([]);
        }
        setLoading(false);
    };

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

    if (loading)
        return <div className="text-center mt-20">Loading properties...</div>;
    if (error)
        return <div className="text-center mt-20 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <Search onSearch={handleSearch} />
            <h1 className="text-3xl font-bold mb-8">Available Properties</h1>
            {/* if loading state is true then display Loading.. */}
            {loading && <div className="text-center mt-20">Loading...</div>}
            {/* if loading state is false it displays set of properties */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        {error ||
                            'No properties available. Try adjusting your search.'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Home;
