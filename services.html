// services.js
import { supabase } from './supabaseClient.js';
import { protectPage } from './auth.js';

protectPage();

const servicesList = document.getElementById("services-list");
const totalPriceSpan = document.getElementById("total-price");
const form = document.getElementById("order-form");
const confirmationMessage = document.getElementById("confirmation-message");

let selectedServices = [];
let servicesData = [];

async function loadServices() {
  const { data: services, error } = await supabase.from("services").select("id, name, price");

  if (error) {
    alert("Failed to load services");
    return;
  }

  servicesData = services;
  services.forEach((service) => {
    const div = document.createElement("div");
    div.classList.add("service-item");
    div.innerHTML = `
      <label>
        <input type="checkbox" value="${service.id}" data-price="${service.price}" />
        ${service.name} - KES ${service.price}
      </label>
    `;
    servicesList.appendChild(div);
  });

  document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", updateTotal);
  });
}

function updateTotal() {
  selectedServices = [];
  let total = 0;

  document.querySelectorAll("input[type='checkbox']:checked").forEach((box) => {
    const price = parseFloat(box.getAttribute("data-price"));
    const id = box.value;
    selectedServices.push(id);
    total += price;
  });

  totalPriceSpan.textContent = total;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) return alert("Not logged in");

  const mpesaMessage = document.getElementById("mpesa-message").value;
  const instructions = document.getElementById("instructions").value;

  const total = parseFloat(totalPriceSpan.textContent);

  const { error: insertError } = await supabase.from("orders").insert({
    user_id: user.id,
    service_ids: selectedServices,
    mpesa_message: mpesaMessage,
    instructions,
    total_price: total,
    status: "Pending",
  });

  if (insertError) {
    alert("Failed to place order");
  } else {
    confirmationMessage.innerHTML =
      "<p>Order placed! Expected processing time: &lt; 5 hours.</p>";
    form.reset();
    updateTotal();
  }
});

loadServices();
