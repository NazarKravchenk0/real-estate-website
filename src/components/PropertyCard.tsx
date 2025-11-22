import { Bed, Bath, Maximize, MapPin } from 'lucide-react';
import { Property } from '../lib/supabase';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-1 group"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
          {property.status === 'for_sale' ? 'For Sale' : property.status}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {formatPrice(property.price)}
          </p>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">
            {property.city}, {property.state}
          </span>
        </div>

        <div className="flex items-center gap-6 text-gray-700 mb-4">
          <div className="flex items-center gap-2">
            <Bed size={20} className="text-gray-400" />
            <span className="font-medium">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={20} className="text-gray-400" />
            <span className="font-medium">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize size={20} className="text-gray-400" />
            <span className="font-medium">{property.square_feet.toLocaleString()} sqft</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">
          {property.description}
        </p>
      </div>
    </div>
  );
}
