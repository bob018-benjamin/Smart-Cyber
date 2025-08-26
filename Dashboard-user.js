// dashboard-user.js
import { supabase } from './supabaseClient.js';
import { protectPage, logout } from './auth.js';

protectPage();

const emailSpan = document.getElementById("user-email");
const phoneSpan = document.getElementById("user-phone");
const profilePic = document.getElementById("profile-pic");
const logoutBtn = document.getElementById("logout-btn");

async function loadUserProfile() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return;

  emailSpan.textContent = user.email;

  // Fetch additional user profile info from "profiles" table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("phone, avatar_url")
    .eq("id", user.id)
    .single();

  if (profileError) return;

  phoneSpan.textContent = profile.phone || "Not set";

  if (profile.avatar_url) {
    profilePic.src = profile.avatar_url;
  }
}

logoutBtn.addEventListener("click", async () => {
  await logout();
});

loadUserProfile();
