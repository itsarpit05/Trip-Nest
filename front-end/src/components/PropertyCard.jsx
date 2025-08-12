import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
    // This now only gets the first image, or a placeholder if there are no images.
    const imageUrl = property.images && property.images.length > 0
        ? property.images[0]
        : 'https://placehold.co/600x400/E2E8F0/AAAAAA?text=No+Image';

    const location = property.address
        ? `${property.address.street},${property.address.city}, ${property.address.country}`
        : 'Location not available';

    return (
        // The entire card is a link to the property's detail page.
        <Link to={`/property/${property._id}`} className="group cursor-pointer">
            
            {/* Image Container */}
            <div className="relative w-full overflow-hidden rounded-lg">
                <div className="aspect-video bg-gray-200">
                    <img
                        src={imageUrl}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </div>

            {/* Property Details */}
            <div className="pt-3">
                <h3 className="text-md font-semibold text-gray-800">{property.title}</h3>
                <p className="text-sm text-gray-500">{location}</p>
                <p className="mt-1 text-md">
                    <span className="font-bold">${property.pricePerNight}</span>
                    <span className="text-gray-600"> / night</span>
                </p>
            </div>
        </Link>
    );
};

export default PropertyCard;