document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Gestion des filtres (Activités, Restaurants, Bars)
    const filters = document.querySelectorAll('.filter-item');

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            // On retire la classe 'active' de tous les filtres
            filters.forEach(f => f.classList.remove('active'));
            // On l'ajoute sur celui qui a été cliqué
            filter.classList.add('active');
            
            console.log("Filtre sélectionné :", filter.textContent.trim());
            // Ici, tu pourras plus tard ajouter un filtrage réel des adresses
        });
    });

    // 2. Animation au clic sur les cartes
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = "scale(0.98)";
            setTimeout(() => {
                card.style.transform = "scale(1)";
                // Redirection vers la page spécifique (exemple: wifi.html)
                // window.location.href = card.getAttribute('data-link');
            }, 100);
        });
    });
});