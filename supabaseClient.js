// js/supabaseClient.js
const SUPABASE_URL = 'https://xbkloxgdqnxuubdnjwzk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // use full anon key here

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
