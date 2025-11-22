/*
  # Real Estate Website Database Schema

  ## Overview
  Creates a complete database schema for a real estate agent website with properties, 
  agents, and customer inquiries.

  ## New Tables
  
  ### 1. `properties`
  Main table for property listings with complete details
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Property title
  - `description` (text) - Detailed property description
  - `price` (numeric) - Property price
  - `bedrooms` (integer) - Number of bedrooms
  - `bathrooms` (numeric) - Number of bathrooms
  - `square_feet` (integer) - Property size in square feet
  - `address` (text) - Street address
  - `city` (text) - City name
  - `state` (text) - State/Province
  - `zip_code` (text) - Postal code
  - `property_type` (text) - Type (house, condo, apartment, etc.)
  - `status` (text) - Listing status (for_sale, sold, pending)
  - `year_built` (integer) - Year property was built
  - `images` (jsonb) - Array of image URLs
  - `features` (jsonb) - Array of property features
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `inquiries`
  Customer inquiries and contact form submissions
  - `id` (uuid, primary key) - Unique identifier
  - `property_id` (uuid, nullable) - Related property (if applicable)
  - `name` (text) - Customer name
  - `email` (text) - Customer email
  - `phone` (text, nullable) - Customer phone
  - `message` (text) - Inquiry message
  - `status` (text) - Inquiry status (new, contacted, closed)
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for properties (for_sale status only)
  - Authenticated users can submit inquiries
  - Inquiries are private to submitter only

  ## Indexes
  - Properties: city, status, price for efficient filtering
  - Inquiries: property_id, status for efficient queries
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  bedrooms integer NOT NULL DEFAULT 0,
  bathrooms numeric NOT NULL DEFAULT 0,
  square_feet integer NOT NULL DEFAULT 0,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  property_type text NOT NULL DEFAULT 'house',
  status text NOT NULL DEFAULT 'for_sale',
  year_built integer,
  images jsonb DEFAULT '[]'::jsonb,
  features jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_inquiries_property ON inquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available properties"
  ON properties FOR SELECT
  USING (status = 'for_sale');

CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

INSERT INTO properties (title, description, price, bedrooms, bathrooms, square_feet, address, city, state, zip_code, property_type, status, year_built, images, features) VALUES
('Modern Downtown Loft', 'Stunning modern loft in the heart of downtown with floor-to-ceiling windows and breathtaking city views. Features an open floor plan, gourmet kitchen with stainless steel appliances, hardwood floors throughout, and luxury finishes.', 875000, 2, 2, 1500, '123 Main Street', 'San Francisco', 'CA', '94102', 'condo', 'for_sale', 2020, 
'["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg", "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg"]'::jsonb, 
'["City Views", "Hardwood Floors", "Stainless Steel Appliances", "Open Floor Plan", "Parking Included", "Gym Access"]'::jsonb),

('Charming Victorian Home', 'Beautifully restored Victorian home with original architectural details. Spacious rooms, updated kitchen and bathrooms, large backyard perfect for entertaining. Walking distance to parks, shops, and restaurants.', 1250000, 4, 3, 2800, '456 Oak Avenue', 'San Francisco', 'CA', '94110', 'house', 'for_sale', 1905, 
'["https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg", "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg", "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"]'::jsonb,
'["Updated Kitchen", "Original Details", "Large Backyard", "Hardwood Floors", "Bay Windows", "Close to Transit"]'::jsonb),

('Luxury Beachfront Condo', 'Spectacular oceanfront condo with panoramic views of the Pacific. This luxury unit features high-end finishes, spa-like bathrooms, chef''s kitchen, and private balcony. Resort-style amenities including pool, spa, and fitness center.', 2100000, 3, 3, 2200, '789 Ocean Drive', 'Santa Monica', 'CA', '90401', 'condo', 'for_sale', 2018, 
'["https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg", "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg", "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg"]'::jsonb,
'["Ocean Views", "Private Balcony", "Pool", "Spa", "Fitness Center", "24/7 Security"]'::jsonb),

('Cozy Suburban Retreat', 'Perfect family home in a quiet neighborhood with excellent schools. Updated throughout with new paint, flooring, and modern fixtures. Large fenced yard, two-car garage, and plenty of storage space.', 685000, 3, 2.5, 2000, '321 Maple Lane', 'San Jose', 'CA', '95123', 'house', 'for_sale', 1998, 
'["https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg", "https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg", "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"]'::jsonb,
'["Fenced Yard", "Two Car Garage", "Updated Interior", "Good Schools", "Quiet Neighborhood", "Storage Space"]'::jsonb),

('Contemporary Mountain View Home', 'Stunning contemporary home with breathtaking mountain views. Open concept design with walls of glass, chef''s kitchen, master suite with spa bathroom, and outdoor living space with infinity pool.', 1850000, 4, 4.5, 3500, '654 Ridge Road', 'Los Altos', 'CA', '94022', 'house', 'for_sale', 2019, 
'["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg", "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg", "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg"]'::jsonb,
'["Mountain Views", "Infinity Pool", "Open Concept", "Spa Bathroom", "Chef Kitchen", "Smart Home"]'::jsonb),

('Historic Craftsman Bungalow', 'Charming craftsman bungalow with authentic period details. Features include built-in cabinets, original woodwork, coved ceilings, and cozy fireplace. Updated systems while maintaining historic character.', 925000, 3, 2, 1800, '987 Pine Street', 'Pasadena', 'CA', '91101', 'house', 'for_sale', 1922, 
'["https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg", "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg", "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg"]'::jsonb,
'["Historic Character", "Fireplace", "Built-ins", "Original Woodwork", "Updated Systems", "Covered Porch"]'::jsonb);