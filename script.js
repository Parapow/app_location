const pills = document.querySelectorAll(".pill");
const cards = document.querySelectorAll(".card");

/* MENU FILTER */
pills.forEach(pill => {
  pill.addEventListener("click", () => {

    // active state
    pills.forEach(p => p.classList.remove("active"));
    pill.classList.add("active");

    const filter = pill.dataset.filter;

    cards.forEach(card => {
      if (card.dataset.category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

  });
});

/* CLICK CARD */
cards.forEach(card => {
  card.addEventListener("click", () => {
    alert("Ouvrir contenu détaillé (modal ou page)");
  });
});