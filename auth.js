// js/auth.js

// Sign up a new user (customer)
async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({
    email,
    password
  });
  if (error) throw error;
  return user;
}

// Log in an existing user
async function signIn(email, password) {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return user;
}

// Log out the current user
async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  window.location.href = 'index.html';
}

// Get current session
async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Protect pages that require login
async function protectPage() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
  }
}
