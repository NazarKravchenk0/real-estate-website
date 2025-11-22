import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Создаём клиент только если заданы переменные окружения.
// Иначе оставляем supabase = null, чтобы фронт не падал.
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
  square_feet: number;
  year_built: number;
  property_type: string;
  status: 'for_sale' | 'sold' | 'pending';
  image_url: string | null;
  images: string[];
  features: string[] | null;
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
