/* ==========================================================================
   CONFIG.JS — Source unique de tout le contenu du livret d'accueil
   --------------------------------------------------------------------------
   Modifiez ici : textes, codes, images, vidéos, adresses, lieux, FAQ, etc.
   Vous n'avez normalement JAMAIS besoin de toucher aux autres fichiers.
   ========================================================================== */

window.CONFIG = {

  /* ------------------------------------------------------------------
     1. LOGEMENT
     ------------------------------------------------------------------ */
  logement: {
    nom: "La Parenthèse du Grau",
    adresse: "503 Avenue du Palais de la Mer, 30240 Le Grau-du-Roi",
    coords: [43.52707168221571, 4.1433827163793735], // Coordonnées GPS du logement pour centrer la carte
    imagePrincipale: "assets/img/hero.jpg",
    boutonNavigation: "Rejoindre le logement"
  },

  /* ------------------------------------------------------------------
     2. COULEURS (appliquées automatiquement au site)
     ------------------------------------------------------------------ */
  couleurs: {
    fond: "#F5F6F8",
    fondCarte: "#FFFFFF",
    accent: "#4894bd",
    accentFonce: "#296d92",
    accentClair: "#E8F3F9",
    titre: "#0E2A47",
    texte: "#14181F",
    texteSecondaire: "#6B7280",
    bordure: "#ECEEF2",
    bordureBouton: "#D9DDE3"
  },

  /* ------------------------------------------------------------------
     3. CODES D'ACCÈS
     ------------------------------------------------------------------ */
  codes: {
    digicode:  { titre: "Digicode", valeur: "1970",   icone: "fa-solid fa-building-lock" },
    boiteCles: { titre: "Boîte à clés", valeur: "923462", icone: "fa-solid fa-key" }
  },

  /* ------------------------------------------------------------------
     4. ARRIVÉE
     ------------------------------------------------------------------ */
  arrivee: {
    titre: "Arrivée",
    heure: "15 h 00",
    titreDetail: "Procédure d'arrivée",
    sousTitreDetail: "Suivez les étapes ci-dessous pour accéder au logement en toute autonomie.",
    etapes: [
      {
        titre: "Accéder à la résidence",
        icone: "fa-solid fa-location-dot",
        textes: [
          "<strong>Adresse :</strong> 503 Avenue du Palais de la Mer, 30240 Le Grau-du-Roi",
          "De nombreux parkings gratuits se trouvent à proximité de la résidence.",
          "Le logement se trouve dans le <strong>bâtiment D</strong>, la porte d'entrée du bâtiment se trouve à gauche après être passé sous le porche (2ème porte d'entrée)."
        ],
        medias: [
          { type: "image", src: "assets/img/arrivee/entree_bat.jpg", legende: "L'entrée de la résidence" },
        ]
      },
      {
        titre: "Digicode du bâtiment (D)",
        icone: "fa-solid fa-building-lock",
        textes: [
          "Entrez le code <strong>{{digicode}}</strong> sur le digicode pour rentrer dans le bâtiment et montez à l'étage <strong>D2</strong> (2ème étage)."
        ],
        medias: [
          { type: "image", src: "assets/img/arrivee/etape2-1.jpg", legende: "Le digicode du bâtiment" },
          { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", poster: "", legende: "Vidéo d'exemple — à remplacer" }
        ]
      },
      {
        titre: "Porte du logement (119)",
        icone: "fa-solid fa-door-open",
        textes: [
          "Il s'agit de l'appartement <strong>n°119</strong>. Arrivé à l'étage D2, prenez à droite. La porte se trouve sur votre gauche. Vous retrouverez le numéro de l'appartement ainsi qu'une petite plaque « La Parenthèse du Grau » apposés sur la porte d'entrée."
        ],
        medias: [
          { type: "image", src: "assets/img/arrivee/etape2-1.jpg", legende: "Porte d'entrée du logement" },
        ]
      },
      {
        titre: "Boîte à clés",
        icone: "fa-solid fa-key",
        textes: [
          "Abaissez le volet de la boîte, appuyez sur l'écran pour faire apparaître les numéros.",
          "Entrez le code <strong>{{boite_cles}}</strong> puis sur <strong>✓</strong> pour déverrouiller la boîte à clés.",
          "Récupérez le trousseau de clés.",
          "<strong>Bienvenue chez vous !</strong>"
        ],
        medias: [
          { type: "image", src: "assets/img/arrivee/boite_cles.jpg", legende: "Boîte à clés du logement" },
          { type: "video", src: "assets/video/arrivee/boite_cles.mov", poster: "", legende: "Vidéo - Ouverture de la boîte à clés" }
        ]
      }
    ],
    noteFinale: "Arrivée possible dès 15h00. En cas de problème, contactez-nous directement."
  },

  /* ------------------------------------------------------------------
     5. DÉPART
     ------------------------------------------------------------------ */
  depart: {
    titre: "Départ",
    heure: "11 h 00",
    titreDetail: "Procédure de départ",
    sousTitreDetail: "Cochez chaque élément pour ne rien oublier avant de partir.",
    checklist: [
      { icone: "fa-solid fa-utensils",        texte: "Vaisselle lavée et rangée" },
      { icone: "fa-solid fa-fan",             texte: "Ventilateur / chauffage éteints" },
      { icone: "fa-solid fa-trash-can",       texte: "Poubelles vidées" },
      { icone: "fa-solid fa-bath",            texte: "Linge de bain déposé dans la salle de bain" },
      { icone: "fa-solid fa-bed",             texte: "Linge de lit déposé dans le salon" },
      { icone: "fa-solid fa-window-maximize", texte: "Fenêtres et volets roulants fermés" },
      { icone: "fa-solid fa-lock",            texte: "Porte d'entrée verrouillée" },
      { icone: "fa-solid fa-key",             texte: "Clés remises dans la boîte à clés" }
    ],
    messageFin: "Merci pour votre séjour, à bientôt à La Parenthèse du Grau !"
  },

  /* ------------------------------------------------------------------
     6. WI-FI
     ------------------------------------------------------------------ */
  wifi: {
    titre: "Connexion Wi-Fi",
    nomReseau: "La Parenthèse du Grau",
    motDePasse: "Laparenthesedugrau30!"
  },

  /* ------------------------------------------------------------------
     7. RÈGLEMENT INTÉRIEUR
     ------------------------------------------------------------------ */
  reglement: {
    titre: "Règlement intérieur",
    sousTitreDetail: "Merci de prendre connaissance des règles ci-dessous pour assurer le confort de tous et le bon déroulement de votre séjour.",
    boutonTexte: "Voir le règlement intérieur",
    regles: [
      { icone: "fa-solid fa-moon",          titre: "Calme et respect du voisinage",
        texte: "Merci de préserver le calme de la résidence, en particulier entre 21h00 et 8h00. Les fêtes, soirées et nuisances sonores ne sont pas autorisées." },
      { icone: "fa-solid fa-ban-smoking",   titre: "Logement non-fumeur",
        texte: "Il est strictement interdit de fumer ou de vapoter à l'intérieur du logement." },
      { icone: "fa-solid fa-champagne-glasses", titre: "Pas de fêtes ni d'événements",
        texte: "Les soirées ou événements festifs sont interdits dans le logement." },
      { icone: "fa-solid fa-users",         titre: "Logement limité à 2 personnes",
        texte: "Le logement est prévu pour 2 personnes maximum. Seules les personnes déclarées lors de la réservation sont autorisées à séjourner dans l’appartement." },
      { icone: "fa-solid fa-paw",           titre: "Animaux interdits",
        texte: "Pour des raisons d’hygiène et de confort, les animaux ne sont pas autorisés dans le logement." },
      { icone: "fa-solid fa-broom",         titre: "Propreté et déchets",
        texte: "Merci de respecter le mobilier, les équipements et les installations mis à votre disposition. Toute casse ou détérioration doit nous être signalée rapidement. Merci également de jeter vos déchets avant votre départ." },
      { icone: "fa-solid fa-bolt",          titre: "Économie d'énergie et d'eau",
        texte: "Pensez à éteindre les lumières, la climatisation et le chauffage lorsque vous quittez le logement, et à fermer les robinets." },
      { icone: "fa-solid fa-key",           titre: "Clés et accès",
        texte: "Ne communiquez pas les codes d'accès à des tiers. En cas de perte de clés, prévenez-nous immédiatement." },
      { icone: "fa-solid fa-screwdriver-wrench", titre: "Dégradations et casse",
        texte: "Merci de nous signaler toute casse ou panne le plus tôt possible. Nous trouverons ensemble une solution." },
      { icone: "fa-solid fa-shield-halved", titre: "Sécurité",
        texte: "Fermez toujours la porte à clé en sortant, ainsi que les fenêtres et volets roulants. Ne laissez aucun appareil de cuisson sans surveillance." }
    ]
  },

  /* ------------------------------------------------------------------
     8. NUMÉROS UTILES
     ------------------------------------------------------------------ */
  contacts: {
    titre: "Numéros utiles",
    hote: {
      prenom: "Charles",
      libelle: "Votre hôte",
      telephone: "+33600000000"
    },
    urgences: [
      { nom: "Police",   numero: "17", icone: "fa-solid fa-shield-halved" },
      { nom: "Pompiers", numero: "18", icone: "fa-solid fa-fire-extinguisher" },
      { nom: "SAMU",     numero: "15", icone: "fa-solid fa-truck-medical" }
    ]
  },

  /* ------------------------------------------------------------------
     9. F.A.Q.
     ------------------------------------------------------------------ */
  faq: {
    titre: "F.A.Q",
    sousTitre: "Besoin d'aide ? Je réponds à vos questions !",
    afficherInitialement: 3,
    questions: [
      { q: "Où puis-je me garer ?",
        r: "De nombreux parkings et places de stationnement gratuits sont disponibles à proximité immédiate de la résidence. Le logement ne dispose pas de place de parking privative." },
      { q: "Puis-je arriver plus tôt ou partir plus tard ?",
        r: "L'arrivée est possible dès 15 h 00 et le départ doit se faire avant 11 h 00. Selon les disponibilités, nous pouvons parfois proposer un horaire différent : contactez-nous à l'avance." },
      { q: "Le linge de lit et de bain est-il fourni ?",
        r: "Oui, le linge de lit et les serviettes de bain sont fournis. Au départ, merci de déposer le linge de bain dans la salle de bain et le linge de lit dans le salon." },
      { q: "Quel est le mot de passe du Wi-Fi ?",
        r: "Vous le trouverez sur la page d'accueil, dans la section « Connexion Wi-Fi ». Un bouton permet de le copier en un clic. Vous retrouverez également dans le logement un QR-Code à scanner vous permettant de vous y connecter directement." },
      { q: "Que faire si je n'arrive pas à ouvrir la boîte à clés ?",
        r: "Vérifiez que vous avez bien abaissé le volet et appuyé sur l'écran pour faire apparaître les chiffres, puis saisissez le code suivi de ✓. Si cela ne fonctionne toujours pas, appelez-nous." },
      { q: "Où jeter les poubelles ?",
        r: "Les conteneurs de la résidence sont à votre disposition. Merci de trier vos déchets et de ne pas laisser de sacs dans le logement au départ." },
      { q: "Où se trouvent les commerces et les restaurants ?",
        r: "Le centre-ville, le port et de nombreux commerces sont à proximité. Retrouvez nos adresses préférées dans l'onglet « Découvrir »." },
      { q: "Y a-t-il une plage près du logement ?",
        r: "Oui, les plages du Grau-du-Roi sont toutes proches. Pour des paysages plus sauvages, la plage de l'Espiguette est incontournable !" },
      { q: "Un appareil ne fonctionne pas, que faire ?",
        r: "Consultez l'onglet « Infos » : chaque appareil dispose d'un mode d'emploi et d'une vidéo. Si le problème persiste, contactez-nous, nous le réglerons au plus vite." },
    ]
  },

  /* ------------------------------------------------------------------
     10. ZONES DE STATIONNEMENT (CARTE)
     ------------------------------------------------------------------ */
  parking: {
    titre: "Zones de stationnement",
    zones: [
      {
        nom: "Parking du Palais de la Mer",
        type: "Gratuit",
        couleur: "#22c55e",
        adresse: "Avenue du Palais de la Mer, Le Grau-du-Roi",
        coordonnees: [
          [43.52772064719685, 4.145342195800788],
          [43.52761255471954, 4.1453717934513845],
          [43.52704973412181, 4.142256955705211],
          [43.5274586600603, 4.142136098700039],
          [43.52756987844793, 4.142543603721411],
          [43.52733733067629, 4.142667559621448],
        ]
      },
      {
        nom: "Parking Municipal de Beauduc",
        type: "Payant (2h gratuites)",
        couleur: "#ef4444",
        adresse: "Parking de Beauduc, Rue Amiot d'Inville, Le Grau-du-Roi",
        coordonnees: [
          [43.526767626539836, 4.141303893277544],
          [43.52619143976552, 4.1416566624064854],
          [43.52615843606047, 4.140729220986849],
          [43.52661361056633, 4.140524387299077]
        ]
      },
      {
        nom: "Parking du Seaquarium",
        type: "Gratuit",
        couleur: "#22c55e",
        adresse: "Le Grau-du-Roi",
        coordonnees: [
          [43.527932155469536, 4.141301794392086],
          [43.527690152195134, 4.140963504719712],
          [43.52742852594141, 4.14136945232656],
          [43.52759694797236, 4.141694210412039]
        ]
      },
      {
        nom: "Parking de la Méditérranée",
        type: "Payant",
        couleur: "#ef4444",
        adresse: "567 Rue Folco de Baroncelli, Le Grau-du-Roi",
        coordonnees: [
          [43.52935697711689, 4.142378591966034],
          [43.52939250380732, 4.142554319293784],
          [43.52809760365869, 4.143086570324949],
          [43.52806330129047, 4.142885497709543]
        ]
      },
    ]
  },

  /* ------------------------------------------------------------------
     11. PAGE « INFOS » : TEXTES ET APPAREILS
     ------------------------------------------------------------------ */
  infos: {
    titre: "Informations utiles",
    sousTitre: "Retrouvez les informations importantes concernant le logement ainsi que sur le fonctionnement des appareils.",
    titreAppareils: "Utilisation des appareils",
    appareils: [
      {
        id: "tv", nom: "Télévision", icone: "fa-solid fa-tv",
        image: "assets/img/appareils/tv.jpg",
        description: "La télévision est connectée à internet : vous pouvez utiliser vos propres comptes de streaming.",
        etapes: [
          "Allumez la TV avec la télécommande (bouton rouge).",
          "Choisissez la source ou l'application souhaitée.",
          "Connectez-vous à votre compte si besoin.",
          "Pensez à vous déconnecter de vos comptes avant le départ."
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "lit", nom: "Canapé lit", icone: "fa-solid fa-fire-burner",
        image: "assets/img/appareils/plaques.jpg",
        description: "Les plaques de cuisson se commandent grâce aux boutons situés sur la façade.",
        etapes: [
          "Utilisez exclusivement les casseroles et poêles fournies dans le logement.",
          "Tournez le bouton de la zone choisie pour régler la puissance.",
          "Remettez toujours le bouton sur 0 après utilisation.",
          "Laissez refroidir avant de nettoyer."
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "plaques", nom: "Plaques de cuisson", icone: "fa-solid fa-fire-burner",
        image: "assets/img/appareils/plaques.jpg",
        description: "Les plaques de cuisson se commandent grâce aux boutons situés sur la façade.",
        etapes: [
          "Utilisez exclusivement les casseroles et poêles fournies dans le logement.",
          "Tournez le bouton de la zone choisie pour régler la puissance.",
          "Remettez toujours le bouton sur 0 après utilisation.",
          "Laissez refroidir avant de nettoyer."
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "micro-ondes", nom: "Micro-ondes", icone: "fa-solid fa-bowl-food",
        image: "assets/img/appareils/micro-ondes.jpg",
        description: "Utilisez uniquement des contenants adaptés au micro-ondes <strong>(pas de métal !)</strong>.",
        etapes: [
          "Placez votre plat dans l'appareil recouvert de la cloche et fermez la porte.",
          "Réglez la puissance et la durée.",
          "Appuyez sur Démarrer.",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "cafetiere", nom: "Cafetière", icone: "fa-solid fa-mug-hot",
        image: "assets/img/appareils/cafetiere.jpg",
        description: "Un petit stock de café est à votre disposition dans le bocal situé à côté de la cafetière.",
        etapes: [
          "Remplissez le réservoir avec de l'eau.",
          "Ajoutez la dosette de café dans l'appareil et refermez pour le verrouiller.",
          "Placez une tasse et lancez la préparation.",
          "Jetez la dosette de café dans la poubelle une fois la préparation terminée.",
          "Nettoyez l'appareil après toute utilisation.",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "ventilateur", nom: "Ventilateur", icone: "fa-solid fa-mug-hot",
        image: "assets/img/appareils/cafetiere.jpg",
        description: "La télécommande du ventilateur se situe sur le mur à côté de la télévision. Le ventilateur de plafond possède également un éclairage.",
        etapes: [
          "Appuyez sur l'icone de lampe pour allumer la lumière si vous le souhaitez.",
          "Appuyez sur les chiffres de 1 à 6 pour choisir la puissance de ventilation.",
          "Pour arrêter le ventilateur, appuyez sur le bouton POWER <strong>(⏻)</strong>.",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "bouilloire", nom: "Bouilloire", icone: "fa-solid fa-mug-hot",
        image: "assets/img/appareils/cafetiere.jpg",
        description: "La télécommande du ventilateur se situe sur le mur à côté de la télévision. Le ventilateur de plafond possède également un éclairage.",
        etapes: [
          "Appuyez sur l'icone de lampe pour allumer la lumière si vous le souhaitez.",
          "Appuyez sur les chiffres de 1 à 6 pour choisir la puissance de ventilation.",
          "Pour arrêter le ventilateur, appuyez sur le bouton POWER <strong>(⏻)</strong>.",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "seche_cheveux", nom: "Sèche-cheveux", icone: "fa-solid fa-mug-hot",
        image: "assets/img/appareils/cafetiere.jpg",
        description: "La télécommande du ventilateur se situe sur le mur à côté de la télévision. Le ventilateur de plafond possède également un éclairage.",
        etapes: [
          "Appuyez sur l'icone de lampe pour allumer la lumière si vous le souhaitez.",
          "Appuyez sur les chiffres de 1 à 6 pour choisir la puissance de ventilation.",
          "Pour arrêter le ventilateur, appuyez sur le bouton POWER <strong>(⏻)</strong>.",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "hotte", nom: "Hotte de cuisine", icone: "fa-solid fa-mug-hot",
        image: "assets/img/appareils/cafetiere.jpg",
        description: "La télécommande du ventilateur se situe sur le mur à côté de la télévision. Le ventilateur de plafond possède également un éclairage.",
        etapes: [
          "Appuyez sur l'icone de lampe pour allumer la lumière si vous le souhaitez.",
          "Appuyez sur les chiffres de 1 à 6 pour choisir la puissance de ventilation.",
          "Pour arrêter le ventilateur, appuyez sur le bouton POWER <strong>(⏻)</strong>.",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "lampe_cuisine", nom: "Luminaire cuisine", icone: "fa-solid fa-mug-hot",
        image: "assets/img/appareils/cafetiere.jpg",
        description: "La télécommande du ventilateur se situe sur le mur à côté de la télévision. Le ventilateur de plafond possède également un éclairage.",
        etapes: [
          "Appuyez sur l'icone de lampe pour allumer la lumière si vous le souhaitez.",
          "Appuyez sur les chiffres de 1 à 6 pour choisir la puissance de ventilation.",
          "Pour arrêter le ventilateur, appuyez sur le bouton POWER <strong>(⏻)</strong>.",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "grille_pain", nom: "Grille pain", icone: "fa-solid fa-mug-hot",
        image: "assets/img/appareils/cafetiere.jpg",
        description: "La télécommande du ventilateur se situe sur le mur à côté de la télévision. Le ventilateur de plafond possède également un éclairage.",
        etapes: [
          "Appuyez sur l'icone de lampe pour allumer la lumière si vous le souhaitez.",
          "Appuyez sur les chiffres de 1 à 6 pour choisir la puissance de ventilation.",
          "Pour arrêter le ventilateur, appuyez sur le bouton POWER <strong>(⏻)</strong>.",
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
    ]
  },

  /* ------------------------------------------------------------------
     12. PAGE « DÉCOUVRIR »
     ------------------------------------------------------------------ */
  decouvrir: {
    titre: "Découvrir les alentours",
    sousTitre: "Nos adresses préférées pour profiter pleinement de votre séjour.",
    surtitreSections: "À proximité",
    sections: [
      {
        id: "restaurants",
        titre: "Les restaurants qu'on adore",
        icone: "fa-solid fa-utensils",
        lieux: [
          { nom: "Chez Papé Frezal",          image: "assets/img/lieux/chez-pape-frezal.jpg",   distance: "1,3 km",  note: 4.8, telephone: "0411837341", adresse: "Le Grau-du-Roi" },
          { nom: "La Table du Grau",          image: "assets/img/lieux/la-table-du-grau.jpg",   distance: "1,4 km",  note: 4.7, telephone: "0466465745", adresse: "Le Grau-du-Roi" },
          { nom: "L@ Guadeloupéenne",         image: "assets/img/lieux/la-guadeloupeenne.jpg",  distance: "1,3 km",  note: 4.8, telephone: "0783210227", adresse: "Le Grau-du-Roi" },
          { nom: "L'Assiette Amoureuse",      image: "assets/img/lieux/assiette-amoureuse.jpg", distance: "1,3 km",  note: 4.7, telephone: "0466538846", adresse: "Le Grau-du-Roi" },
          { nom: "Mona",                      image: "assets/img/lieux/mona.jpg",               distance: "900 m",  note: 4.6, telephone: "0466952068", adresse: "Le Grau-du-Roi" },
          { nom: "La Barque Bleue",           image: "assets/img/lieux/barque-bleue.jpg",       distance: "1,3 km",  note: 4.6, telephone: "0466530746", adresse: "Le Grau-du-Roi" },
          { nom: "Restoro",                   image: "assets/img/lieux/restoro.jpg",            distance: "130 m",  note: 4.0, telephone: "0466510256", adresse: "Le Grau-du-Roi" },
        ]
      },
      {
        id: "activites",
        titre: "Les activités qu'on recommande",
        icone: "fa-solid fa-umbrella-beach",
        lieux: [
          { nom: "Seaquarium Institut Marin", image: "assets/img/lieux/seaquarium.jpg",        distance: "220 m",  note: 4.3, telephone: "+33466515757", adresse: "Le Grau-du-Roi" },
          { nom: "Plage de l'Espiguette",     image: "assets/img/lieux/espiguette.jpg",        distance: "5 km",  note: 4.4, telephone: "", adresse: "Plage de l'Espiguette, 30240 Le Grau-du-Roi" },
          { nom: "Phare de l'Espiguette",     image: "assets/img/lieux/phare-espiguette.jpg",  distance: "5,5 km",  note: 4.5, telephone: "0448583001", adresse: "Parking des Baronnets, 30240 Le Grau-du-Roi" },
          { nom: "Port Camargue",             image: "assets/img/lieux/port-camargue.jpg",     distance: "1,8 km", note: 4.7, telephone: "", adresse: "Station service du port, Rue de l'Altier, Quai Bonne Espérance, 30240" },
          { nom: "Arènes du Grau-du-Roi",     image: "assets/img/lieux/arenes.jpg",            distance: "1,8 km",   note: 4.4, telephone: "0466511212", adresse: "3 Route d'Aigues-Mortes, 30240 Le Grau-du-Roi" },
          { nom: "Salins d'Aigues-Mortes",    image: "assets/img/lieux/salins.jpg",            distance: "6,5 km",   note: 3.9, telephone: "0466734024", adresse: "Salins d'Aigues-Mortes" },
          { nom: "Cité médiévale d'Aigues-Mortes", image: "assets/img/lieux/aigues-mortes.jpg",distance: "7,8 km",   note: 4.7, telephone: "", adresse: "Aigues-Mortes" }
        ]
      },
      {
        id: "bars",
        titre: "Les bars qu'on apprécie",
        icone: "fa-solid fa-martini-glass-citrus",
        lieux: [
          { nom: "L'Estuaire Plage",          image: "assets/img/lieux/estuaire-plage.jpg",    distance: "550 m",  note: 4.1, telephone: "0770695795", adresse: "Le Grau-du-Roi" },
          { nom: "Playa Miramar",             image: "assets/img/lieux/playa-miramar.jpg",     distance: "800 m",   note: 4.4, telephone: "0772459252", adresse: "Le Grau-du-Roi" },
          { nom: "Mona",                      image: "assets/img/lieux/mona.jpg",               distance: "900 m",  note: 4.6, telephone: "0466952068", adresse: "Le Grau-du-Roi" },
          { nom: "La Réserve Plage",          image: "assets/img/lieux/la-reserve.jpg",        distance: "400 m",  note: 4.1, telephone: "", adresse: "Le Grau-du-Roi" },
          { nom: "Broche't And Beer",         image: "assets/img/lieux/brochet-and-beer.jpg",  distance: "1,6 km",   note: 4.6, telephone: "0659255597", adresse: "Le Grau-du-Roi" },
        ]
      },
      {
        id: "commerces",
        titre: "Les commerces de proximité",
        icone: "fa-solid fa-martini-glass-citrus",
        lieux: [
          { nom: "Carrefour Express",          image: "assets/img/lieux/carrefour-express.jpg",    distance: "290 m",  note: 3.9, telephone: "0466513395", adresse: "Le Grau-du-Roi" },
          { nom: "Boulangerie La Friandise",             image: "assets/img/lieux/la-friandise.jpg",     distance: "300 m",   note: 3.8, telephone: "0466510700", adresse: "Le Grau-du-Roi" },
          { nom: "Pharmacie du Centre",             image: "assets/img/lieux/pharmacie-centre.jpg",     distance: "1,3 km",   note: 4.1, telephone: "0466514034", adresse: "Le Grau-du-Roi" },
          { nom: "Super U et Drive",             image: "assets/img/lieux/super-u.jpg",     distance: "1,9 km",   note: 4.0, telephone: "0466530380", adresse: "Le Grau-du-Roi" },
          { nom: "Lidl",             image: "assets/img/lieux/lidl.jpg",     distance: "2,2 km",   note: 4.0, telephone: "0188247070", adresse: "Le Grau-du-Roi" },
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------
     13. LIBELLÉS
     ------------------------------------------------------------------ */
  menu: [
    { id: "accueil",   libelle: "Accueil",   icone: "fa-solid fa-house" },
    { id: "infos",     libelle: "Infos",     icone: "fa-solid fa-circle-info" },
    { id: "decouvrir", libelle: "Découvrir", icone: "fa-solid fa-compass" }
  ],
  libelles: {
    enSavoirPlus: "En savoir plus",
    retour: "Retour",
    appeler: "Appeler",
    sYRendre: "S'y rendre",
    copier: "Copier",
    copie: "Copié !",
    voirPlus: "Voir plus",
    voirMoins: "Voir moins",
    aDistance: "à",
    sectionArriveeDepart: "Arrivée / Départ",
    sectionCodes: "Codes d'accès",
    nomReseau: "Nom du réseau",
    motDePasse: "Mot de passe"
  }
};
