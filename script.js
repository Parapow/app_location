document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // CONFIGURATION
    // ============================================================

    const coordsLogement = [43.52720677316535, 4.1432819106324175];

    // ============================================================
    // SÉLECTEURS
    // ============================================================

    const homeView   = document.getElementById('home-view');
    const guidesView = document.getElementById('guides-view');
    const focusView  = document.getElementById('focus-view');
    const mapView    = document.getElementById('map-view');

    const btnAccueil = document.getElementById('btn-accueil');
    const btnGuides  = document.getElementById('btn-guides');
    const btnMap     = document.getElementById('btn-map');

    const backBtn          = document.getElementById('back-button');
    const pinPopup  = document.getElementById('pinPopup');

    const fullscreenOverlay = document.getElementById('fullscreen-overlay');
    const fullscreenImg    = document.getElementById('fullscreen-img');

    // Coordonnées du pin actuellement sélectionné
    let activeLatLng = null;

    function updatePopupPosition() {
        if (!activeLatLng || pinPopup.style.display === 'none') return;
        const point = map.latLngToContainerPoint(activeLatLng);
        pinPopup.style.left = point.x + 'px';
        pinPopup.style.top  = point.y + 'px';
    }

    function showPinPopup(item) {
        document.getElementById('popupName').textContent    = item.name;
        document.getElementById('popupType').textContent    = item.type;
        document.getElementById('popupAddress').textContent = item.address;
        document.getElementById('popupMapsLink').href =
            `https://www.google.com/maps/search/?api=1&query=${item.pos[0]},${item.pos[1]}`;

        activeLatLng = L.latLng(item.pos[0], item.pos[1]);

        // Centrer la carte sur le pin
        map.panTo(activeLatLng);

        pinPopup.style.display = 'block';
        updatePopupPosition();
    }

    function hidePinPopup() {
        pinPopup.style.display = 'none';
        activeLatLng = null;
    }

    // ============================================================
    // CARTE (Leaflet)
    // ============================================================

    let map          = null;
    let markersLayer = null;
    let currentMapType = 'resto';

    // ============================================================
    // DONNÉES — GUIDES D'ÉQUIPEMENTS
    // ============================================================

    const equipments = [
        { id: 'cafe',        title: 'Machine à café',       icon: 'fa-coffee' },
        { id: 'tv',          title: 'TV connecté / Netflix', icon: 'fa-tv' },
        { id: 'ventilateur', title: 'Ventilateur de plafond', icon: 'fa-wind' },
        { id: 'plaques',     title: 'Plaque de cuisson',     icon: 'fa-fire-burner' }
    ];

    // ============================================================
    // DONNÉES — CARTES D'INFORMATION
    // ============================================================

    const contents = {
        wifi: {
            title: "WiFi",
            img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
            html: `
                <div class="wifi-section">
                    <h3>Nom du réseau</h3>
                    <div class="wifi-box">La Perle Bohème - Le Grau</div>
                </div>
                <div class="wifi-section">
                    <h3>Mot de passe</h3>
                    <div class="wifi-box">
                        <span id="pass-text">Laperleboheme30</span>
                        <button class="copy-btn" id="btn-copy">
                            <i class="fa-regular fa-copy"></i> Copier
                        </button>
                    </div>
                </div>
                <div class="wifi-section" style="text-align:center;">
                    <p style="font-size:0.82rem; font-weight:600; color:#999; margin-bottom:16px; margin-top:20px;">
                        Scannez le QR Code pour vous connecter directement au WiFi
                    </p>
                    <img
                        src="https://genqrcode.com/embedded?style=0&inner_eye_style=0&outer_eye_style=4&logo=null&color=%23000000FF&background_color=%23FFFFFFFF&inner_eye_color=%23000000&outer_eye_color=%23000000&imageformat=svg&language=fr&frame_style=0&frame_text=SCAN%20ME&frame_text_icon_color=%23000000&frame_text_icon=null&frame_color=%23000000&frame_background_color=%23FFFFFF&frame_text_color=%23FFFFFF&invert_colors=false&gradient_style=0&gradient_color_start=%23FF0000&gradient_color_end=%237F007F&gradient_start_offset=5&gradient_end_offset=95&stl_type=1&logo_remove_background=null&stl_size=100&stl_qr_height=1.5&stl_base_height=2&stl_include_stands=false&stl_qr_magnet_type=3&stl_qr_magnet_count=0&type=1&network=La%20Boh%C3%A8me%20du%20Grau&password=LabohemeduGrau30&encryption=0&hidden=false&width=200&height=200&bordersize=1"
                        alt="QR Code WiFi"
                        style="width:200px; height:200px; display:block; margin:0 auto; border-radius:12px;"
                    />
                </div>
            `
        },

        acces: {
            title: "Accès au logement",
            img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800",
            html: `
                <div class="wifi-section">
                    <div style="display:flex; gap:10px;">
                        <div class="wifi-box" style="flex:1; flex-direction:column; align-items:flex-start;">
                            <span class="box-subtitle">Heure d'arrivée</span>
                            <span style="font-size:1.1rem;">15:00</span>
                        </div>
                        <div class="wifi-box" style="flex:1; flex-direction:column; align-items:flex-start;">
                            <span class="box-subtitle">Heure de départ</span>
                            <span style="font-size:1.1rem;">11:00</span>
                        </div>
                    </div>
                </div>
                <a href="https://www.google.com/maps/search/?api=1&query=43.52720677316535,4.1432819106324175"
                   target="_blank" class="btn-access btn-primary">
                    <i class="fa-solid fa-location-arrow"></i> Obtenir l'itinéraire
                </a>
                <div class="wifi-section">
                    <span class="box-subtitle">Accès Bâtiment (Vue satellite)</span>
                    <div class="wifi-box" style="padding:10px;">
                        <img src="https://i.ibb.co/0pbpzfCq/Entr-e-Bat.png" class="box-img zoomable">
                    </div>
                </div>
                <div class="wifi-section">
                    <h3>Digicode de l'immeuble</h3>
                    <div class="wifi-box" style="flex-direction:column; align-items:flex-start; gap:10px;">
                        <span style="font-size:1.3rem; letter-spacing:2px;">1234567B#</span>
                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800" class="box-img zoomable">
                    </div>
                </div>
                <div class="wifi-section">
                    <h3>Boîte à clés</h3>
                    <div class="wifi-box" style="flex-direction:column; align-items:flex-start; gap:10px;">
                        <span style="font-size:0.75rem; font-weight:800; color:#ff5a5f;">Bâtiment D - 2ème étage (D2)</span>
                        <span style="font-size:1.3rem; letter-spacing:2px;">1234567#</span>
                        <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800" class="box-img zoomable">
                    </div>
                </div>
                <a href="tel:+33600000000" class="btn-access btn-call">
                    <i class="fa-solid fa-phone"></i> Un problème d'accès ?
                </a>
            `
        },

        reglement: {
            title: "Règlement intérieur",
            img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
            html: `
                <div class="rules-container">
                    <div class="rule-item"><i class="fa-solid fa-ban-smoking"></i><span class="rule-text">Logement strictement non-fumeur</span></div>
                    <div class="rule-item"><i class="fa-solid fa-volume-mute"></i><span class="rule-text">Pas de nuisances sonores après 22h</span></div>
                    <div class="rule-item"><i class="fa-solid fa-users-slash"></i><span class="rule-text">Fêtes et soirées strictement interdites</span></div>
                    <div class="rule-item"><i class="fa-solid fa-paw"></i><span class="rule-text">Animaux de compagnie non admis</span></div>
                    <div class="rule-item"><i class="fa-solid fa-door-closed"></i><span class="rule-text">Merci de bien fermer à clé en sortant</span></div>
                    <div class="rule-item"><i class="fa-solid fa-trash"></i><span class="rule-text">Veuillez jeter vos ordures avant le départ</span></div>
                    <div class="rule-item"><i class="fa-solid fa-bolt"></i><span class="rule-text">Éteignez les lumières et clim en votre absence</span></div>
                </div>
                <div class="rules-disclaimer">
                    <i class="fa-solid fa-circle-info"></i>
                    <p>En confirmant votre réservation, vous reconnaissez avoir pris connaissance et accepté ce règlement. Tout manquement pourra entraîner l'ouverture d'un litige.</p>
                </div>
            `
        },

        urgence: {
            title: "Numéros d'urgence",
            img: "https://images.unsplash.com/photo-1516589174422-b4221442435a?w=800",
            html: `
                <div class="wifi-section">
                    <h3>Secours publics</h3>
                    <div class="rules-container">
                        <a href="tel:15" class="rule-item" style="text-decoration:none; color:inherit;">
                            <i class="fa-solid fa-house-medical"></i><div><span class="rule-text">SAMU : 15</span></div>
                        </a>
                        <a href="tel:17" class="rule-item" style="text-decoration:none; color:inherit;">
                            <i class="fa-solid fa-shield-halved"></i><div><span class="rule-text">POLICE : 17</span></div>
                        </a>
                        <a href="tel:18" class="rule-item" style="text-decoration:none; color:inherit;">
                            <i class="fa-solid fa-fire-extinguisher"></i><div><span class="rule-text">POMPIERS : 18</span></div>
                        </a>
                    </div>
                </div>
                <div class="wifi-section">
                    <h3>Votre hôte</h3>
                    <a href="tel:+33611543892" class="rule-item" style="text-decoration:none; color:inherit; border:1px solid #ff5a5f;">
                        <i class="fa-solid fa-user" style="color:#ff5a5f;"></i>
                        <div><span class="rule-text">CHARLES : 06.11.54.38.92</span></div>
                    </a>
                </div>
            `
        },

        arrivee: {
            title: "À votre arrivée",
            img: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200",
            html: `
                <div class="wifi-section">
                    <div class="wifi-box" style="flex-direction:column; align-items:flex-start; gap:12px;">
                        <div>
                            <span class="box-subtitle">Heure d'arrivée</span>
                            <span style="font-size:1.2rem;">15:00</span>
                        </div>
                    </div>
                    <span style="font-size:0.85rem; line-height:1.5; color:#666;">
                        Merci de nous prévenir en cas d'arrivée tardive ou de retard afin d'organiser au mieux votre accueil.
                    </span>
                </div>
                <div class="wifi-section">
                    <h3>Avant votre installation</h3>
                    <div class="rules-container">
                        <div class="rule-item">
                            <i class="fa-solid fa-book-open"></i>
                            <span class="rule-text">Merci de prendre connaissance du règlement intérieur du logement</span>
                        </div>
                        <div class="rule-item">
                            <i class="fa-solid fa-plug-circle-check"></i>
                            <span class="rule-text">Consultez les guides d'utilisation des équipements mis à disposition</span>
                        </div>
                        <div class="rule-item">
                            <i class="fa-solid fa-shield-heart"></i>
                            <span class="rule-text">Prenez connaissance des consignes de sécurité et numéros utiles</span>
                        </div>
                    </div>
                </div>
                <p style="margin-top:30px; text-align:center; font-size:0.9rem; font-weight:600; color:#777; line-height:1.6;">
                    Nous vous souhaitons un excellent séjour à La Perle Bohème.
                </p>
            `
        },

        depart: {
            title: "À votre départ",
            img: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?w=800",
            html: `<h3>Bon retour !</h3>
                   <p>Le départ se fait avant 11h. Merci de laisser le logement dans un état correct, de jeter vos poubelles et de remettre les clés dans la boîte.</p>`
        }
    };

    // ============================================================
    // DONNÉES — CARTE INTERACTIVE
    // ============================================================

    const dataRestaurants = [
        { name: "Restoro",    type: "Spécialités Tapas",       address: "520 Avenue du Palais de la Mer", pos: [43.527151, 4.142073] },
        { name: "En Face",    type: "Restaurant Traditionnel", address: "733 Rue Folco de Baroncelli",    pos: [43.527269, 4.141786] },
        { name: "Mona",       type: "Restaurant Italien",      address: "6 Avenue Frédéric Mistral",      pos: [43.532851, 4.138533] }
    ];

    const dataBars = [
        { name: "Le Bar Bleu", type: "Bar à Cocktail", address: "520 Avenue du Palais de la Mer", pos: [43.527151, 4.142073] },
        { name: "Sunset Café", type: "Bar de Plage",   address: "Avenue du Palais de la Mer",     pos: [43.526856, 4.139075] }
    ];

    const dataActivities = [
        { name: "Plage", type: "Activité", address: "Le Grau-du-Roi", pos: [43.5279, 4.1402] }
    ];

    const dataParkings = [
        { name: "Parking Victor Hugo",        type: "Payant – courte durée (5h max)",      address: "Allée Victor Hugo, 30240 Le Grau-du-Roi",        pos: [43.5308, 4.1394] },
        { name: "Parking Fanfonne Guillerme", type: "Payant – longue durée (12h max)",     address: "Parvis de la Fe Di Biou, 30240 Le Grau-du-Roi",  pos: [43.5273, 4.1358] },
        { name: "Parking de La Poste",        type: "Payant – courte durée (5h max)",      address: "Avenue de Dossenheim, 30240 Le Grau-du-Roi",     pos: [43.5318, 4.1401] },
        { name: "Parking Plage Sud",          type: "Payant – longue durée (saisonnier)",  address: "Le Grau-du-Roi",                                 pos: [43.5245, 4.1388] }
    ];

    const dataShops = [
        { name: "Carrefour Express",  type: "Supermarché – le plus proche",  address: "Avenue du Palais de la Mer, 30240 Le Grau-du-Roi", pos: [43.5268, 4.1418] },
        { name: "Vival",              type: "Supérette de proximité",        address: "Rue Vincent, 30240 Le Grau-du-Roi",               pos: [43.5301, 4.1372] },
        { name: "SPAR",               type: "Supermarché",                   address: "8 Avenue Jean Lasserre, 30240 Le Grau-du-Roi",    pos: [43.5254, 4.1311] },
        { name: "Super U",            type: "Supermarché",                   address: "Rue du Levant, Centre Cial Port Royal, 30240 Le Grau-du-Roi", pos: [43.5236, 4.1289] }
    ];

    // ============================================================
    // NAVIGATION PRINCIPALE
    // ============================================================

    function hideAllViews() {
        homeView.style.display   = 'none';
        guidesView.style.display = 'none';
        focusView.style.display  = 'none';
        mapView.style.display    = 'none';
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    }

    btnAccueil.addEventListener('click', () => {
        hideAllViews();
        homeView.style.display = 'block';
        btnAccueil.classList.add('active');
    });

    btnGuides.addEventListener('click', () => {
        hideAllViews();
        guidesView.style.display = 'block';
        btnGuides.classList.add('active');
        renderGuidesList();
    });

    btnMap.addEventListener('click', () => {
        hideAllViews();
        mapView.style.display = 'flex';
        btnMap.classList.add('active');

        currentMapType = 'resto';
        setActiveTab('resto');
        initOrUpdateMap('resto');
    });

    // ============================================================
    // WELCOME BOX — COLLAPSE
    // ============================================================

    const welcomeBox    = document.getElementById('welcome-box');
    const welcomeToggle = document.getElementById('welcome-toggle');
    const STORAGE_KEY   = 'welcomeBoxCollapsed';

    if (localStorage.getItem(STORAGE_KEY) === 'true') {
        welcomeBox.classList.add('collapsed');
    }

    welcomeToggle.addEventListener('click', () => {
        welcomeBox.classList.toggle('collapsed');
        localStorage.setItem(STORAGE_KEY, welcomeBox.classList.contains('collapsed'));
    });

    // ============================================================
    // CARROUSEL HEADER
    // ============================================================

    const carouselTrack = document.getElementById('carousel-track');
    const prevBtn       = document.getElementById('carousel-prev');
    const nextBtn       = document.getElementById('carousel-next');

    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.carousel-slide').length;

    function updateCarousel() {
        carouselTrack.scrollTo({
            left: carouselTrack.offsetWidth * currentSlide,
            behavior: 'smooth'
        });
    }

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    // ============================================================
    // CARTES D'INFORMATION — OUVERTURE DU FOCUS
    // ============================================================

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const id   = card.getAttribute('data-id');
            const data = contents[id];
            if (!data) return;

            const banner = document.getElementById('focus-banner');
            banner.classList.remove('guide-banner-minimal');
            banner.style.backgroundImage = `url('${data.img}')`;

            document.getElementById('focus-title-inner').textContent = data.title;
            document.getElementById('focus-content-inner').innerHTML = data.html;
            focusView.style.display = 'block';
            focusView.scrollTop = 0;

            // Logique spécifique : copie du mot de passe WiFi
            if (id === 'wifi') {
                document.getElementById('btn-copy').addEventListener('click', () => {
                    navigator.clipboard.writeText('Laperleboheme30').then(() => {
                        const btn = document.getElementById('btn-copy');
                        btn.classList.add('success');
                        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copié !';
                        setTimeout(() => {
                            btn.classList.remove('success');
                            btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copier';
                        }, 2000);
                    });
                });
            }
        });
    });

    // ============================================================
    // GUIDES D'ÉQUIPEMENTS
    // ============================================================

    function renderGuidesList() {
        const container = document.querySelector('.guides-list');
        container.innerHTML = '';

        equipments.forEach(item => {
            const div = document.createElement('div');
            div.className = 'guide-item';
            div.innerHTML = `
                <div class="guide-icon"><i class="fa-solid ${item.icon}"></i></div>
                <div class="guide-info">
                    <span class="guide-title">${item.title}</span>
                    <span class="guide-subtitle">Appuyez pour voir les instructions</span>
                </div>
            `;
            div.onclick = () => openFocusGuide(item);
            container.appendChild(div);
        });
    }

    function openFocusGuide(item) {
        const banner = document.getElementById('focus-banner');
        banner.classList.add('guide-banner-minimal');
        banner.style.backgroundImage = '';

        document.getElementById('focus-title-inner').textContent = item.title;
        document.getElementById('focus-content-inner').innerHTML = `
            <p>Le guide détaillé pour l'équipement <strong>${item.title}</strong> sera bientôt disponible ici.</p>
        `;

        focusView.style.display = 'block';
        focusView.scrollTop = 0;
    }

    // ============================================================
    // BOUTON RETOUR (focus → vue précédente)
    // ============================================================

    backBtn.addEventListener('click', () => {
        focusView.style.display = 'none';
        const banner = document.getElementById('focus-banner');
        banner.classList.remove('guide-banner-minimal');
        banner.style.backgroundImage = '';
    });

    // ============================================================
    // CARTE INTERACTIVE (Leaflet)
    // ============================================================

    function setActiveTab(type) {
        document.querySelectorAll('.map-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.type === type);
        });
    }

    document.querySelectorAll('.map-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            currentMapType = tab.dataset.type;
            setActiveTab(currentMapType);
            hidePinPopup();
            initOrUpdateMap(currentMapType);
        });
    });

    function initOrUpdateMap(type) {
        const points = type === 'resto'    ? dataRestaurants
                     : type === 'bar'      ? dataBars
                     : type === 'activity' ? dataActivities
                     : type === 'parking'  ? dataParkings
                     : type === 'shop'     ? dataShops
                     : [];

        // Initialisation unique de la carte
        if (!map) {
            map = L.map('map', { zoomControl: false, attributionControl: false })
                   .setView(coordsLogement, 15);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png')
             .addTo(map);

            markersLayer = L.layerGroup().addTo(map);

            // Repositionner la bulle à chaque mouvement/zoom
            map.on('move zoom', updatePopupPosition);
        }

        markersLayer.clearLayers();

        // Pin du logement
        const homeIcon = L.divIcon({
            className: '',
            html: '<div class="pulse-icon pin-home"><i class="fa-solid fa-house"></i></div>',
            iconSize: [34, 34],
            iconAnchor: [17, 17]
        });
        L.marker(coordsLogement, { icon: homeIcon }).addTo(markersLayer);

        // Configuration des pins par type
        const pinConfig = {
            resto:    { cls: 'pin-resto',    html: '<i class="fa-solid fa-utensils"></i>' },
            bar:      { cls: 'pin-bar',      html: '<i class="fa-solid fa-martini-glass-citrus"></i>' },
            activity: { cls: 'pin-activity', html: '<i class="fa-solid fa-person-hiking"></i>' },
            parking:  { cls: 'pin-parking',  html: '<i class="fa-solid fa-square-parking"></i>' },
            shop:     { cls: 'pin-shop',     html: '<i class="fa-solid fa-basket-shopping"></i>' }
        };
        const { cls, html } = pinConfig[type] || pinConfig.resto;

        // Ajout des markers
        points.forEach(item => {
            const icon = L.divIcon({
                className: '',
                html: `<div class="pulse-icon ${cls}">${html}</div>`,
                iconSize: [34, 34],
                iconAnchor: [17, 17]
            });

            L.marker(item.pos, { icon })
             .addTo(markersLayer)
             .on('click', function() {
                 showPinPopup(item);
             });
        });

        map.invalidateSize();
        map.fitBounds(
            new L.featureGroup(markersLayer.getLayers()).getBounds().pad(0.1)
        );
    }

    // ============================================================
    // POPUP BULLE — FERMETURE
    // ============================================================

    document.getElementById('closePopup').addEventListener('click', hidePinPopup);

    // Fermer en cliquant sur la carte
    document.getElementById('map').addEventListener('click', (e) => {
        if (!e.target.closest('#pinPopup')) hidePinPopup();
    });

    // ============================================================
    // PHOTOS PLEIN ÉCRAN
    // ============================================================

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('zoomable')) {
            fullscreenImg.src = e.target.src;
            fullscreenOverlay.classList.add('active');
        } else if (fullscreenOverlay.classList.contains('active')) {
            fullscreenOverlay.classList.remove('active');
        }
    });

});