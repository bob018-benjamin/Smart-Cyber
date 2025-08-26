// orders.js
import { supabase } from './supabaseClient.js';
import { protectPage } from './auth.js';

protectPage();

const tableBody = document.querySelector("#orders-table tbody");

async function loadOrders() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data: orders } = await supabase
    .from("orders")
    .select("*, services(name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  tableBody.innerHTML = "";

  orders.forEach((order) => {
    const row = document.createElement("tr");

    const date = new Date(order.created_at).toLocaleString();
    const servicesList = order.services
      ?.map((s) => s.name)
      .join(", ") || "-";

    row.innerHTML = `
      <td>${date}</td>
      <td>${servicesList}</td>
      <td>KES ${order.total_price}</td>
      <td>${order.status}</td>
    `;

    tableBody.appendChild(row);
  });
}

loadOrders();
