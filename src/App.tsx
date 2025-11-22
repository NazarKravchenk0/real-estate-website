import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyFilters, FilterOptions } from './components/PropertyFilters';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetail } from './components/PropertyDetail';
import { InquiryForm } from './components/InquiryForm';
import { SuccessMessage } from './components/SuccessMessage';
import { Footer } from './components/Footer';
import { supabase, Property } from './lib/supabase';


const STATIC_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Loft',
    description: 'Stunning modern loft in the heart of downtown with floor-to-ceiling windows and breathtaking city views. Features an open floor plan, gourmet kitchen with stainless steel appliances, hardwood floors throughout, and luxury finishes.',
    price: 875000,
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zip_code: '94102',
    country: 'USA',
    bedrooms: 2,
    bathrooms: 2,
    square_feet: 1500,
    year_built: 2020,
    property_type: 'Condo',
    status: 'for_sale',
    image_url: '/images/modern-downtown-loft-1.jpg',
    images: ['/images/modern-downtown-loft-1.jpg', '/images/modern-downtown-loft-2.jpg', '/images/modern-downtown-loft-3.jpg'],
    features: [
      'City Views',
      'Hardwood Floors',
      'Stainless Steel Appliances',
      'Open Floor Plan',
      'Parking Included',
      'Gym Access',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Charming Victorian Home',
    description: 'Beautifully restored Victorian home with original architectural details. Spacious rooms, updated kitchen and bathrooms, large backyard perfect for entertaining. Walking distance to parks, shops, and restaurants.',
    price: 1250000,
    address: '456 Oak Avenue',
    city: 'San Francisco',
    state: 'CA',
    zip_code: '94110',
    country: 'USA',
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2800,
    year_built: 1905,
    property_type: 'Single Family',
    status: 'for_sale',
    image_url: '/images/charming-victorian-home-1.jpg',
    images: ['/images/charming-victorian-home-1.jpg', '/images/charming-victorian-home-2.jpg', '/images/charming-victorian-home-3.jpg'],
    features: [
      'Updated Kitchen',
      'Original Details',
      'Large Backyard',
      'Hardwood Floors',
      'Bay Windows',
      'Close to Transit',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Luxury Beachfront Condo',
    description: 'Spectacular oceanfront condo with panoramic views of the Pacific. This luxury unit features high-end finishes, spa-like bathrooms, chef\'s kitchen, and private balcony. Resort-style amenities including pool, spa, and fitness center.',
    price: 2100000,
    address: '789 Ocean Drive',
    city: 'Santa Monica',
    state: 'CA',
    zip_code: '90401',
    country: 'USA',
    bedrooms: 3,
    bathrooms: 3,
    square_feet: 2200,
    year_built: 2018,
    property_type: 'Condo',
    status: 'for_sale',
    image_url: '/images/luxury-beachfront-condo-1.jpg',
    images: ['/images/luxury-beachfront-condo-1.jpg', '/images/luxury-beachfront-condo-2.jpg', '/images/luxury-beachfront-condo-3.jpg'],
    features: [
      'Ocean Views',
      'Private Balcony',
      'Pool',
      'Spa',
      'Fitness Center',
      '24/7 Security',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Cozy Suburban Retreat',
    description: 'Perfect family home in a quiet neighborhood with excellent schools. Updated throughout with new paint, flooring, and modern fixtures. Large fenced yard, two-car garage, and plenty of storage space.',
    price: 685000,
    address: '321 Maple Lane',
    city: 'San Jose',
    state: 'CA',
    zip_code: '95123',
    country: 'USA',
    bedrooms: 3,
    bathrooms: 2.5,
    square_feet: 2000,
    year_built: 1998,
    property_type: 'Single Family',
    status: 'for_sale',
    image_url: '/images/cozy-suburban-retreat-1.jpg',
    images: ['/images/cozy-suburban-retreat-1.jpg', '/images/cozy-suburban-retreat-2.jpg', '/images/cozy-suburban-retreat-3.jpg'],
    features: [
      'Fenced Yard',
      'Two Car Garage',
      'Updated Interior',
      'Good Schools',
      'Quiet Neighborhood',
      'Storage Space',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Contemporary Mountain View Home',
    description: 'Stunning contemporary home with breathtaking mountain views. Open concept design with walls of glass, chef\'s kitchen, master suite with spa bathroom, and outdoor living space with infinity pool.',
    price: 1850000,
    address: '654 Ridge Road',
    city: 'Los Altos',
    state: 'CA',
    zip_code: '94022',
    country: 'USA',
    bedrooms: 4,
    bathrooms: 4.5,
    square_feet: 3500,
    year_built: 2019,
    property_type: 'Single Family',
    status: 'for_sale',
    image_url: '/images/contemporary-mountain-view-home-1.jpg',
    images: ['/images/contemporary-mountain-view-home-1.jpg', '/images/contemporary-mountain-view-home-2.jpg', '/images/contemporary-mountain-view-home-3.jpg'],
    features: [
      'Mountain Views',
      'Infinity Pool',
      'Open Concept',
      'Spa Bathroom',
      'Chef Kitchen',
      'Smart Home',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Historic Craftsman Bungalow',
    description: 'Charming craftsman bungalow with authentic period details. Features include built-in cabinets, original woodwork, coved ceilings, and cozy fireplace. Updated systems while maintaining historic character.',
    price: 925000,
    address: '987 Pine Street',
    city: 'Pasadena',
    state: 'CA',
    zip_code: '91101',
    country: 'USA',
    bedrooms: 3,
    bathrooms: 2,
    square_feet: 1800,
    year_built: 1922,
    property_type: 'Single Family',
    status: 'for_sale',
    image_url: '/images/historic-craftsman-bungalow-1.jpg',
    images: ['/images/historic-craftsman-bungalow-1.jpg', '/images/historic-craftsman-bungalow-2.jpg', '/images/historic-craftsman-bungalow-3.jpg'],
    features: [
      'Historic Character',
      'Fireplace',
      'Built-ins',
      'Original Woodwork',
      'Updated Systems',
      'Covered Porch',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    propertyType: '',
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, filters, searchQuery]);

  const fetchProperties = async () => {
    // Если Supabase не настроен, используем статические демо-объекты,
    // чтобы сайт выглядел как пример из Bolt.
    if (!supabase) {
      console.warn('Supabase client is not configured. Using static demo properties.');
      setProperties(STATIC_PROPERTIES);
      setFilteredProperties(STATIC_PROPERTIES);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'for_sale')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        setProperties(STATIC_PROPERTIES);
        setFilteredProperties(STATIC_PROPERTIES);
      } else {
        const safeData = (data && data.length > 0 ? data : STATIC_PROPERTIES) as Property[];
        setProperties(safeData);
        setFilteredProperties(safeData);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties(STATIC_PROPERTIES);
      setFilteredProperties(STATIC_PROPERTIES);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.city.toLowerCase().includes(query) ||
          p.state.toLowerCase().includes(query) ||
          p.title.toLowerCase().includes(query) ||
          p.property_type.toLowerCase().includes(query)
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter((p) => p.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseFloat(filters.maxPrice));
    }

    if (filters.bedrooms) {
      filtered = filtered.filter((p) => p.bedrooms >= parseInt(filters.bedrooms));
    }

    if (filters.propertyType) {
      filtered = filtered.filter((p) => p.property_type === filters.propertyType);
    }

    setFilteredProperties(filtered);
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleInquireClick = () => {
    setShowInquiryForm(true);
  };

  const handleInquirySuccess = () => {
    setShowInquiryForm(false);
    setSelectedProperty(null);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onContactClick={() => setShowInquiryForm(true)} />

      <Hero onSearch={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="properties">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Properties</h2>
          <p className="text-gray-600">Discover your perfect home from our exclusive collection</p>
        </div>

        <PropertyFilters filters={filters} onFilterChange={setFilters} />

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-xl text-gray-600">No properties found matching your criteria.</p>
            <button
              onClick={() => {
                setFilters({
                  minPrice: '',
                  maxPrice: '',
                  bedrooms: '',
                  propertyType: '',
                });
                setSearchQuery('');
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={() => handlePropertyClick(property)}
              />
            ))}
          </div>
        )}

        <section id="about" className="mt-20 bg-white rounded-2xl shadow-lg p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Premier Estates</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              With over 20 years of experience in luxury real estate, Premier Estates has established
              itself as the premier choice for discerning buyers and sellers. Our team of dedicated
              professionals is committed to providing exceptional service and expertise.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We specialize in connecting clients with their dream properties, offering personalized
              guidance through every step of the real estate journey. From initial consultation to
              closing, we're here to make your experience seamless and successful.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {selectedProperty && (
        <PropertyDetail
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onInquire={handleInquireClick}
        />
      )}

      {showInquiryForm && (
        <InquiryForm
          propertyId={selectedProperty?.id}
          propertyTitle={selectedProperty?.title}
          onClose={() => setShowInquiryForm(false)}
          onSuccess={handleInquirySuccess}
        />
      )}

      {showSuccess && <SuccessMessage onClose={() => setShowSuccess(false)} />}
    </div>
  );
}

export default App;
