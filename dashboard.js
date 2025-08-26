// Supabase setup
const SUPABASE_URL = "https://xbkloxgdqnxuubdnjwzk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhia2xveGdkcW54dXViZG5qd3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMzU0NDksImV4cCI6MjA3MTcxMTQ0OX0.6n8c6ZzFTOCAXM-RN8LrkpfxHil2nTV35ArEGgrs_9w";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM elements
const userNameEl = document.getElementById("user-name");
const userEmailEl = document.getElementById("user-email");
const userPhoneEl = document.getElementById("user-phone");
const logoutBtn = document.getElementById("logout");
const ticketForm = document.getElementById("ticket-form");
const ticketList = document.getElementById("ticket-list");

// Check if user is logged in
async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = "login.html";
  } else {
    loadUserInfo(session.user);
  }
}

// Load user info into dashboard
async function loadUserInfo(user) {
  userNameEl.textContent = user.email.split("@")[0]; // Display name as first part of email
  userEmailEl.textContent = user.email;

  // Fetch phone from 'profiles' table if available
  const { data, error } = await supabase
    .from("profiles")
    .select("phone")
    .eq("id", user.id)
    .single();

  if (data) {
    userPhoneEl.textContent = data.phone || "N/A";
  }
}

// Logout
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "login.html";
});

// Handle support ticket submission
ticketForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(ticketForm);
  const files = formData.getAll("files");
  const uploadedFiles = [];

  // Upload files (up to 5)
  for (let i = 0; i < files.length && i < 5; i++) {
    const file = files[i];
    const { data, error } = await supabase.storage
      .from("tickets")
      .upload(`${Date.now()}_${file.name}`, file);

    if (error) {
      alert("File upload error: " + error.message);
      return;
    }
    uploadedFiles.push(data.path);
  }

  // Insert ticket into 'tickets' table
  const { error } = await supabase.from("tickets").insert([{
    user_id: supabase.auth.getUser().data.user.id,
    title: formData.get("title"),
    description: formData.get("description"),
    files: uploadedFiles,
    status: "open",
    created_at: new Date()
  }]);

  if (error) alert(error.message);
  else {
    alert("Ticket submitted successfully!");
    ticketForm.reset();
    loadTickets(); // reload ticket list
  }
});

// Load tickets for this user
async function loadTickets() {
  const userId = supabase.auth.getUser().data.user.id;
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  ticketList.innerHTML = "";
  if (data) {
    data.forEach(ticket => {
      const div = document.createElement("div");
      div.classList.add("ticket-item");
      div.innerHTML = `
        <strong>${ticket.title}</strong> - ${ticket.status}<br>
        ${ticket.description}<br>
        ${ticket.files ? ticket.files.map(f => `<a href="https://xbkloxgdqnxuubdnjwzk.supabase.co/storage/v1/object/public/tickets/${f}" target="_blank">View File</a>`).join(", ") : ""}
      `;
      ticketList.appendChild(div);
    });
  }
}

// Initialize
checkAuth();
loadTickets();
