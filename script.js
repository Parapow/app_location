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
            if (e.target.tagName === 'IMG' || e.target.closest('#copyBtn') || e.target.closest('.image-overlay')) {
                return;
            }
            const wasActive = card.classList.contains('active');
            cards.forEach(c => c.classList.remove('active'));
            if (!wasActive) card.classList.add('active');
        });
    });

    // 3. Zoom Images (Lightbox HD Plein Écran)
    const overlay = document.getElementById('imageOverlay');
    const enlargedImg = document.getElementById('enlargedImg');
    const clickableImgs = document.querySelectorAll('.thumb-img, .gallery-item img');

    clickableImgs.forEach(img => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const hdImageUrl = img.getAttribute('data-fullsrc');
            enlargedImg.src = hdImageUrl ? hdImageUrl : img.src;
            
            overlay.classList.add('active');
        });
    });

    overlay.addEventListener('click', (e) => {
        e.stopPropagation();
        overlay.classList.remove('active');
    });

    // 4. Bouton Copier WiFi (Version avec texte "Copié !")
    const copyBtn = document.getElementById('copyBtn');
    if(copyBtn) {
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const pass = document.getElementById('wifiPassword').textContent;
            
            navigator.clipboard.writeText(pass).then(() => {
                const originalContent = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copié !';
                copyBtn.style.borderColor = "#ff5a5f";
                copyBtn.style.color = "#ff5a5f";

                setTimeout(() => {
                    copyBtn.innerHTML = originalContent;
                    copyBtn.style.borderColor = "rgba(255,255,255,0.4)";
                    copyBtn.style.color = "white";
                }, 2000);
            });
        });
    }
});