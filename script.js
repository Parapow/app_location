document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Filtres Explorer
    const filters = document.querySelectorAll('.filter-item');
    filters.forEach(f => {
        f.addEventListener('click', () => {
            filters.forEach(x => x.classList.remove('active'));
            f.classList.add('active');
        });
    });

    // 2. Gestion des Cartes (WiFi & Accès)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('#copyBtn') || e.target.tagName === 'IMG') return;
            
            const wasActive = card.classList.contains('active');
            cards.forEach(c => c.classList.remove('active'));
            if (!wasActive) card.classList.add('active');
        });
    });

    // 3. Zoom Images (Lightbox)
    const overlay = document.getElementById('imageOverlay');
    const enlargedImg = document.getElementById('enlargedImg');
    const clickableImgs = document.querySelectorAll('.thumb-img, .gallery-item img');

    clickableImgs.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            enlargedImg.src = img.src;
            overlay.classList.add('active');
        });
    });

    overlay.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    // 4. Bouton Copier WiFi
    const copyBtn = document.getElementById('copyBtn');
    if(copyBtn) {
        copyBtn.addEventListener('click', () => {
            const pass = document.getElementById('wifiPassword').textContent;
            navigator.clipboard.writeText(pass).then(() => {
                const original = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
                setTimeout(() => copyBtn.innerHTML = original, 2000);
            });
        });
    }
});