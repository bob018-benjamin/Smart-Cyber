// js/supabaseClient.js

// Replace with your actual project URL and anon key
const SUPABASE_URL = 'https://xbkloxgdqnxuubdnjwzk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhia2xveGdkcW54dXViZG5qd3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMzU0NDksImV4cCI6MjA3MTcxMTQ0OX0.6n8c6ZzFTOCAXM-RN8LrkpfxHil2nTV35ArEGgrs_9w';

// Create a Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
