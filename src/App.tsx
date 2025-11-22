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
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'for_sale')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } else {
        setProperties(data || []);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
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
