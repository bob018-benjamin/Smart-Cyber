const SUPABASE_URL = "https://xbkloxgdqnxuubdnjwzk.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY"; // Replace with your key
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const userNameEl = document.getElementById("user-name");
const userEmailEl = document.getElementById("user-email");
const userPhoneEl = document.getElementById("user-phone");

const serviceListEl = document.getElementById("service-list");
const transactionListEl = document.getElementById("transaction-list");
const ticketListEl = document.getElementById("ticket-list");
const ticketForm = document.getElementById("ticket-form");

// Check if user is logged in
async function loadUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  userNameEl.textContent = user.user_metadata.full_name || "User";
  userEmailEl.textContent = user.email;
  userPhoneEl.textContent = user.user_metadata.phone || "Not set";

  loadServices(user.id);
  loadTransactions(user.id);
  loadTickets(user.id);
}

// Fetch services
async function loadServices(userId) {
  const { data, error } = await supabase.from("services").select("*").eq("user_id", userId);
  if (error) return console.error(error);

  serviceListEl.innerHTML = data.map(s => `
    <div class="service-item">
      <strong>${s.service_type}</strong> - Status: ${s.status}
    </div>
  `).join("");
}

// Fetch transactions
async function loadTransactions(userId) {
  const { data, error } = await supabase.from("transactions").select("*").eq("user_id", userId);
  if (error) return console.error(error);

  transactionListEl.innerHTML = data.map(t => `
    <div class="transaction-item">
      ${t.service} - KES ${t.amount} - ${new Date(t.date).toLocaleDateString()}
    </div>
  `).join("");
}

// Fetch tickets
async function loadTickets(userId) {
  const { data, error } = await supabase.from("tickets").select("*").eq("user_id", userId);
  if (error) return console.error(error);

  ticketListEl.innerHTML = data.map(t => `
    <div class="ticket-item">
      <strong>${t.title}</strong> - Status: ${t.status}
    </div>
  `).join("");
}

// Submit new ticket
ticketForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { title, description, files } = ticketForm.elements;

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return alert("Login first");

  let uploadedFiles = [];
  if (files.files.length > 0) {
    for (let i = 0; i < files.files.length && i < 5; i++) {
      const file = files.files[i];
      const { data, error } = await supabase.storage.from("tickets").upload(`${Date.now()}_${file.name}`, file);
      if (error) return alert(error.message);
      uploadedFiles.push(data.path);
    }
  }

  const { error } = await supabase.from("tickets").insert([{
    user_id: userData.user.id,
    title: title.value,
    description: description.value,
    files: uploadedFiles,
    status: "Pending"
  }]);

  if (error) alert(error.message);
  else {
    alert("Ticket submitted successfully!");
    ticketForm.reset();
    loadTickets(userData.user.id);
  }
});

// Logout
document.getElementById("logout").addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "login.html";
});

loadUser();
