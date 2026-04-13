document.addEventListener('DOMContentLoaded', () => {
    
    // Gestion du clic sur les filtres
    const filters = document.querySelectorAll('.filter-item');

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Retire la classe active de tous les éléments
            filters.forEach(f => f.classList.remove('active'));
            // L'ajoute sur l'élément cliqué
            filter.classList.add('active');
            
            // Note: On pourrait ici ajouter une logique de redirection
            // window.location.href = filter.innerText.toLowerCase() + ".html";
        });
    });

    // Animation au toucher pour les cartes (effet mobile native)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = "scale(0.96)";
        });
        card.addEventListener('touchend', () => {
            card.style.transform = "scale(1)";
        });
    });
});