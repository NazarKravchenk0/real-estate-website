import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  property_type: string;
  status: string;
  year_built: number;
  images: string[];
  features: string[];
  created_at: string;
  updated_at: string;
};

export type Inquiry = {
  id: string;
  property_id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: string;
  created_at: string;
};
