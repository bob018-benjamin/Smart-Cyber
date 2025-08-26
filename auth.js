authForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  // Make sure email is confirmed
  if (!user.email_confirmed_at) {
    alert("Please verify your email before logging in.");
    return;
  }

  // Fetch role from profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    alert("Error fetching user role.");
    return;
  }

  if (profile.role === "admin") {
    window.location.href = "dashboard-admin.html";
  } else {
    window.location.href = "dashboard-user.html";
  }
});
