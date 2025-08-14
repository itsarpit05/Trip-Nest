import React, { useState } from 'react';
import API from '../services/api';
import { Navigate, useNavigate } from 'react-router-dom';

const HostPropertyPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pricePerNight, setPricePerNight] = useState('');
    const [images, setImages] = useState([]); // Stores Cloudinary URLs
    const [uploading, setUploading] = useState(false);
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });
    const [amenities, setAmenities] = useState([]);

    const [maxGuests, setMaxGuests] = useState(1);

    const availableAmenities = [
        'Wi-Fi',
        'Kitchen',
        'Washer',
        'Dryer',
        'Air Conditioning',
        'Heating',
        'TV',
        'Free Parking',
        'Pool',
        'Hot Tub',
        'Gym',
        'EV Charger',
    ];

    const [error, setError] = useState('');
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const handleAmenitiesChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setAmenities((prev) => [...prev, value]);
        } else {
            setAmenities((prev) => prev.filter((amenity) => amenity !== value));
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        setError('');

        try {
            const res = await API.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setImages([...images, res.data.imageUrl]);
        } catch (err) {
            setError('Image upload failed. Please try again.');
            console.error('Error uploading image:', err);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const propertyData = {
                title,
                description,
                address,
                pricePerNight,
                images,
                amenities,
                maxGuests,
                // ... include other property data
            };
            await API.post('/api/properties', propertyData);
            navigate('/');
        } catch (err) {
            setError('Failed to create property.');
            console.error('Error creating property:', err);
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-3xl">
            {/* <h1 className="text-3xl font-bold mb-6">Host Your Property</h1> */}
            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-8 rounded-lg shadow-md"
            >
                {/* Inputs for title, description, price, etc. */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="space-y-4 border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Address
                    </h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Street
                        </label>
                        <input
                            type="text"
                            name="street"
                            value={address.street}
                            onChange={handleAddressChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={address.city}
                                onChange={handleAddressChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={address.state}
                                onChange={handleAddressChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Zip Code
                            </label>
                            <input
                                type="text"
                                name="zipCode"
                                value={address.zipCode}
                                onChange={handleAddressChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Country
                            </label>
                            <input
                                type="text"
                                name="country"
                                value={address.country}
                                onChange={handleAddressChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                </div>
                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900">
                        Amenities
                    </h3>
                    <p className="text-sm text-gray-500">
                        Select all that apply.
                    </p>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {availableAmenities.map((amenity) => (
                            <label
                                key={amenity}
                                className="flex items-center space-x-3"
                            >
                                <input
                                    type="checkbox"
                                    value={amenity}
                                    onChange={handleAmenitiesChange}
                                    className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                />
                                <span className="text-gray-700">{amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Price Per Night (INR)
                    </label>
                    <input
                        type="number"
                        value={pricePerNight}
                        onChange={(e) => setPricePerNight(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Max Guests
                    </label>
                    <input
                        type="number"
                        value={maxGuests}
                        onChange={(e) => setMaxGuests(e.target.value)}
                        min="1"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Property Images
                    </label>
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                    />
                    {uploading && (
                        <p className="text-sm text-gray-500 mt-2">
                            Uploading...
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap gap-4">
                    {images.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Property Upload ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-md shadow-sm"
                        />
                    ))}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full py-3 px-4 bg-pink-600 text-white font-bold rounded-md hover:bg-pink-700 disabled:bg-gray-400 transition-colors"
                >
                    Create Property
                </button>
            </form>
        </div>
    );
};

export default HostPropertyPage;
