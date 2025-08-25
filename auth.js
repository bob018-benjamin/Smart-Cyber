const SUPABASE_URL = "https://xbkloxgdqnxuubdnjwzk.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY"; // replace with actual anon key

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const authForm = document.querySelector("#auth-form");
const signupBtn = document.querySelector("#signup");

// Sign In
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) alert(error.message);
  else window.location.href = "dashboard.html";
});

// Sign Up
signupBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = prompt("Enter your email:");
  const password = prompt("Enter a password (min 6 chars):");

  if (!email || !password) return;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) alert(error.message);
  else alert("Account created! Check your email to confirm.");
});

