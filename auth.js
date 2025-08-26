const SUPABASE_URL = "https://xbkloxgdqnxuubdnjwzk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhia2xveGdkcW54dXViZG5qd3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMzU0NDksImV4cCI6MjA3MTcxMTQ0OX0.6n8c6ZzFTOCAXM-RN8LrkpfxHil2nTV35ArEGgrs_9w";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const authForm = document.querySelector("#auth-form");

// Sign In
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert(error.message);
  } else {
    // Optionally, you can get the user object: data.user
    window.location.href = "dashboard.html"; // Redirect after successful login
  }
});

