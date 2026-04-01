const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

const data = {
  wifi: `
    <h2>📶 WiFi</h2>
    <p><strong>Nom :</strong> MonWifi</p>
    <p><strong>Mot de passe :</strong> 12345678</p>
    <button onclick="copyWifi()">Copier</button>
  `,

  checkin: `
    <h2>🔑 Arrivée</h2>
    <p>Check-in à partir de 15h</p>
    <p>Check-out avant 11h</p>
  `,

  rules: `
    <h2>📋 Règles</h2>
    <ul>
      <li>Pas de fête</li>
      <li>Non fumeur</li>
      <li>Respect du voisinage</li>
    </ul>
  `,

  local: `
    <h2>📍 Bonnes adresses</h2>
    <p>🍕 Pizzeria Roma</p>
    <p>☕ Café du Centre</p>
  `
};

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const target = card.getAttribute("data-target");

    // animation effet "tap"
    card.style.transform = "scale(0.95)";
    setTimeout(() => {
      card.style.transform = "scale(1)";
    }, 150);

    modalContent.innerHTML = data[target];
    modal.classList.add("show");
  });
});

// fermer modal
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

// fonction copy wifi
function copyWifi() {
  navigator.clipboard.writeText("12345678");
  alert("Mot de passe copié !");
}