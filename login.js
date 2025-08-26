// Supabase credentials
const SUPABASE_URL = "https://xbkloxgdqnxuubdnjwzk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhia2xveGdkcW54dXViZG5qd3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMzU0NDksImV4cCI6MjA3MTcxMTQ0OX0.6n8c6ZzFTOCAXM-RN8LrkpfxHil2nTV35ArEGgrs_9w";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM elements
const authForm = document.querySelector("#auth-form");

// Handle sign-in
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert(error.message);
    return;
  }

  if (data.user) {
    // Check if email is confirmed
    const { email_confirmed_at } = data.user;
    if (!email_confirmed_at) {
      alert("Please verify your email before logging in. Check your inbox.");
      return;
    }

    // Redirect verified users to dashboard
    window.location.href = "dashboard.html";
  } else {
    alert("Login failed. Please check your credentials.");
  }
});
