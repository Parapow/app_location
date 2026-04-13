document.addEventListener('DOMContentLoaded', () => {
    let map = null;
    let markersLayer = null;
    const coordsLogement = [43.52720677316535, 4.1432819106324175];

    const btnAccueil = document.getElementById('btn-accueil');
    const btnRestos = document.getElementById('btn-restaurants');
    const btnBars = document.getElementById('btn-bars');
    const cardsContainer = document.getElementById('info-cards-container');
    const mapContainer = document.getElementById('map-container');
    const restoModal = document.getElementById('restoModal');
    const closeResto = document.getElementById('closeResto');

    // --- DONNÉES ---
    const dataRestaurants = [
        { name: "Restoro", type: "Spécialités Tapas", address: "520 Avenue du Palais de la Mer", dist: "100 m", pos: [43.527151304752245, 4.142073545122824] },
        { name: "En Face", type: "Restaurant Traditionnel", address: "733 Rue Folco de Baroncelli", dist: "150 m", pos: [43.527269238917725, 4.141786036831351] },
        { name: "Mona", type: "Restaurant Italien", address: "6 Avenue Frédéric Mistral", dist: "900 m", pos: [43.53285122864556, 4.138533713572132] },
        { name: "La Réserve Plage", type: "Cuisine méditéranéenne", address: "Avenue du Palais de la Mer", dist: "350 m", pos: [43.52685651317171, 4.139075090632571] }
    ];

    const dataBars = [
        { name: "Le Bar Bleu", type: "Bar à Cocktail", address: "520 Avenue du Palais de la Mer", dist: "100 m", pos: [43.527151, 4.142073] },
        { name: "Sunset Café", type: "Bar de Plage", address: "Avenue du Palais de la Mer", dist: "300 m", pos: [43.526856, 4.139075] }
    ];

    function resetActiveButtons() {
        [btnAccueil, btnRestos, btnBars].forEach(btn => {
            btn.classList.remove('active', 'active-resto', 'active-bar');
        });
    }

    // --- NAVIGATION ---
    btnAccueil.addEventListener('click', () => {
        resetActiveButtons();
        btnAccueil.classList.add('active');
        mapContainer.style.display = 'none';
        cardsContainer.style.display = 'block';
        document.getElementById('dynamic-title').textContent = "INFORMATIONS UTILES";
    });

    btnRestos.addEventListener('click', () => {
        resetActiveButtons();
        btnRestos.classList.add('active-resto');
        document.getElementById('dynamic-title').textContent = "RESTAURANTS À PROXIMITÉ";
        initOrUpdateMap(dataRestaurants, 'resto');
    });

    btnBars.addEventListener('click', () => {
        resetActiveButtons();
        btnBars.classList.add('active-bar');
        document.getElementById('dynamic-title').textContent = "BARS À PROXIMITÉ";
        initOrUpdateMap(dataBars, 'bar');
    });

    // --- GESTION CARTE ---
    function initOrUpdateMap(points, type) {
        cardsContainer.style.display = 'none';
        mapContainer.style.display = 'block';

        if (!map) {
            map = L.map('map', { zoomControl: false }).setView(coordsLogement, 15);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);
            markersLayer = L.layerGroup().addTo(map);
        }

        markersLayer.clearLayers();

        // Pin Logement
        const homeIcon = L.divIcon({ 
            className: 'pulse-icon pin-home', 
            html: '<i class="fa-solid fa-house"></i>',
            iconSize: [30, 30], iconAnchor: [15, 15]
        });
        L.marker(coordsLogement, {icon: homeIcon}).addTo(markersLayer);

        // Pins Restos ou Bars
        const iconClass = type === 'resto' ? 'pin-resto' : 'pin-bar';
        const iconHtml = type === 'resto' ? '<i class="fa-solid fa-utensils"></i>' : '<i class="fa-solid fa-martini-glass-citrus"></i>';

        const customIcon = L.divIcon({ 
            className: `pulse-icon ${iconClass}`, 
            html: iconHtml,
            iconSize: [30, 30], iconAnchor: [15, 15]
        });

        points.forEach(item => {
            const marker = L.marker(item.pos, {icon: customIcon}).addTo(markersLayer);
            marker.on('click', () => {
                if(type === 'bar') restoModal.classList.add('is-bar'); else restoModal.classList.remove('is-bar');
                document.getElementById('modalName').textContent = item.name;
                document.getElementById('modalType').textContent = item.type;
                document.getElementById('modalAddress').textContent = item.address;
                document.getElementById('modalDist').textContent = item.dist;
                document.getElementById('modalMapsLink').href = `https://www.google.com/maps/dir/?api=1&destination=${item.pos[0]},${item.pos[1]}&travelmode=walking`;
                restoModal.classList.add('active');
            });
        });
        setTimeout(() => { map.invalidateSize(); }, 200);
    }

    // --- CARTES ACCUEIL ---
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG' || e.target.closest('#copyBtn')) return;
            const wasActive = card.classList.contains('active');
            cards.forEach(c => c.classList.remove('active'));
            if (!wasActive) card.classList.add('active');
        });
    });

    // --- COPIER WIFI ---
    const copyBtn = document.getElementById('copyBtn');
    if(copyBtn) {
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const pass = document.getElementById('wifiPassword').textContent;
            navigator.clipboard.writeText(pass);
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = "Copié !";
            setTimeout(() => { copyBtn.innerHTML = originalHTML; }, 2000);
        });
    }

    // --- ZOOM IMAGES ---
    const overlay = document.getElementById('imageOverlay');
    const enlargedImg = document.getElementById('enlargedImg');
    document.querySelectorAll('.thumb-img').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            enlargedImg.src = img.getAttribute('data-fullsrc') || img.src;
            overlay.classList.add('active');
        });
    });
    overlay.addEventListener('click', () => overlay.classList.remove('active'));
    closeResto.addEventListener('click', () => restoModal.classList.remove('active'));
    window.addEventListener('click', (e) => { if(e.target === restoModal) restoModal.classList.remove('active'); });
});