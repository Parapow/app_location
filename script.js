document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Gestion des Filtres (Activités, etc. - Inchangé) ---
    const filters = document.querySelectorAll('.filter-item');
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
        });
    });

    // --- 2. Gestion de la Carte WiFi Déployable ---
    const wifiCard = document.querySelector('.card-wifi');

    wifiCard.addEventListener('click', (e) => {
        // Empêcher la carte de se fermer si l'on clique sur le bouton "Copier"
        if (e.target.closest('#copyBtn')) return;

        // Toggle la classe active qui déclenche l'animation CSS
        wifiCard.classList.toggle('active');
    });

    // --- 3. Fonctionnalité de Copie du Mot de Passe ---
    const copyBtn = document.getElementById('copyBtn');
    const wifiPassword = document.getElementById('wifiPassword').textContent;

    copyBtn.addEventListener('click', () => {
        // Utilisation de l'API Presse-papiers moderne
        navigator.clipboard.writeText(wifiPassword).then(() => {
            // Petit retour visuel sur le bouton
            copyBtn.innerHTML = '<i class="fa-solid fa-check copy-icon" style="color:#ff5a5f"></i>Copié !';
            copyBtn.style.borderColor = "#ff5a5f";

            // Remettre le bouton à son état initial après 2 secondes
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fa-regular fa-copy copy-icon"></i>Copier';
                copyBtn.style.borderColor = "rgba(255,255,255,0.4)";
            }, 2000);
        }).catch(err => {
            console.error('Échec de la copie : ', err);
            // Alternative si l'API échoue
            alert("Erreur lors de la copie, voici le mot de passe : " + wifiPassword);
        });
    });
});