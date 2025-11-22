import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase client is optional: if env vars не заданы, приложение не падает,
// просто работает без загрузки данных с бэкенда.
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase environment variables are not set. Supabase client is disabled.');
}

export { supabase };

export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  property_type: string;
  image_url: string | null;
  featured: boolean;
  status: 'for_sale' | 'sold' | 'pending';
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
