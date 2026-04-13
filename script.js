document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Filtres Explorer
    const filters = document.querySelectorAll('.filter-item');
    filters.forEach(f => {
        f.addEventListener('click', (e) => {
            filters.forEach(x => x.classList.remove('active'));
            f.classList.add('active');
        });
    });

    // 2. Gestion des Cartes (WiFi & Accès)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // STOP SI : on clique sur une image, le bouton copier ou l'overlay de zoom
            if (e.target.tagName === 'IMG' || e.target.closest('#copyBtn') || e.target.closest('.image-overlay')) {
                return;
            }
            
            const wasActive = card.classList.contains('active');
            
            // Fermer toutes les cartes avant d'ouvrir la nouvelle
            cards.forEach(c => c.classList.remove('active'));
            
            // Si la carte n'était pas active, on l'ouvre
            if (!wasActive) {
                card.classList.add('active');
            }
        });
    });

    // 3. Zoom Images (Lightbox)
    const overlay = document.getElementById('imageOverlay');
    const enlargedImg = document.getElementById('enlargedImg');
    const clickableImgs = document.querySelectorAll('.thumb-img, .gallery-item img');

    clickableImgs.forEach(img => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Bloque la propagation du clic vers la carte (parent)
            
            enlargedImg.src = img.src;
            overlay.classList.add('active');
        });
    });

    // Fermer l'overlay quand on clique n'importe où dessus
    overlay.addEventListener('click', (e) => {
        e.stopPropagation();
        overlay.classList.remove('active');
    });

    // 4. Bouton Copier WiFi
    const copyBtn = document.getElementById('copyBtn');
    if(copyBtn) {
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche de fermer la carte
            const pass = document.getElementById('wifiPassword').textContent;
            navigator.clipboard.writeText(pass).then(() => {
                const original = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
                copyBtn.style.borderColor = "#ff5a5f";
                setTimeout(() => {
                    copyBtn.innerHTML = original;
                    copyBtn.style.borderColor = "rgba(255,255,255,0.4)";
                }, 2000);
            });
        });
    }
});