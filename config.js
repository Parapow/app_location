const CONFIG = {
  // Paramètres globaux
  global: {
    logementNom: "La Parenthèse du Grau",
    logementAdresseLigne1: "503 Avenue du Palais de la Mer",
    logementAdresseLigne2: "Bâtiment D - Appartement 119",
    logementAdresseLigne3: "30240 Le Grau-du-Roi",
    googleMapsLink: "https://maps.google.com/?q=503+Avenue+du+Palais+de+la+Mer,+30240+Le+Grau-du-Roi",
    phoneHost: "06 11 54 38 92"
  },

  // Page d'accueil
  home: {
    heroImg: "https://www.okvoyage.com/wp-content/uploads/2023/08/que-faire-au-grau-du-roi.jpg",
    welcomeTitle: 'Bienvenue à <em>La Parenthèse du Grau</em>.',
    welcomeSubtitle: "Nous sommes ravis de vous accueillir et vous souhaitons un agréable séjour.",
    
    arrivee: {
      heure: "15h00",
      digicode: "1 9 7 0",
      boiteCles: "4 7 2 9",
      note: "Arrivée possible dès 15h00. En cas de problème, contactez-nous directement.",
      etapes: [
        {
          titre: "Accéder à la résidence",
          texte: "Adresse : 503 Avenue du Palais de la Mer, 30240 Le Grau-du-Roi<br><br>De nombreux parkings gratuits se trouvent à proximité de la résidence.<br>Le logement se trouve dans le bâtiment D, la porte d'entrée du bâtiment se trouve à gauche après être passé sous le porche (2ème porte d'entrée)",
          image: "https://i.ibb.co/yFxh6xH3/Entr-e-Bat.png",
          imgAlt: "Entrée Bâtiment D",
          imgNote: "Cliquez sur l'image pour l'agrandir."
        },
        {
          titre: "Digicode du bâtiment",
          texte: "Entrez le code à 4 chiffres sur le digicode pour rentrer dans le bâtiment et montez à l'étage D2."
        },
        {
          titre: "Porte du logement (119)",
          texte: "Il s'agit de l'appartement n°119. Arrivé à l'étage D2, prenez à droite. La porte se trouve sur votre gauche. Vous retrouverez le numéro de l'appartement ainsi qu'une petite plaque \"La Parenthèse du Grau\" apposés sur la porte d'entrée."
        },
        {
          titre: "Boîte à clés",
          texte: "Entrez le code ci-dessous, tirez le volet et récupérez le trousseau de clés."
        }
      ]
    },

    wifi: {
      reseau: "La Parenthèse du Grau",
      motDePasse: "LaparentheseduGrau30!"
    },

    reglement: [
      { icon: "fa-people-group", title: "Respect du voisinage", text: "Silence requis entre 21h et 8h. Merci de penser aux voisins." },
      { icon: "fa-ban-smoking", title: "Non-fumeur", text: "Il est strictement interdit de fumer à l'intérieur du logement." },
      { icon: "fa-paw", title: "Animaux non admis", text: "Les animaux de compagnie ne sont malheureusement pas acceptés." },
      { icon: "fa-circle-xmark", title: "Pas de fêtes", text: "Les soirées ou événements festifs sont interdits dans le logement." },
      { icon: "fa-user-plus", title: "Capacité maximale", text: "Le studio est prévu pour 4 personnes. Merci de respecter cette limite." },
      { icon: "fa-trash-can", title: "Jeter vos ordures", text: "Merci de vider vos déchets et sacs poubelles dans les conteneurs de la résidence avant votre départ." }
    ],

    equipements: [
      { icon: "fa-wifi", name: "WiFi" },
      { icon: "fa-fan", name: "Ventilation" },
      { icon: "fa-fire-burner", name: "Cuisine équipée" },
      { icon: "fa-mug-saucer", name: "Cafetière Nespresso" },
      { icon: "fa-tv", name: "TV connectée" },
      { icon: "fa-shower", name: "Salle de bain" },
      { icon: "fa-square-parking", name: "Parkings gratuits à proximité" }
    ],

    numeros: [
      { label: "Vos hôtes", number: "06 11 54 38 92", link: "tel:+33611543892", type: "host" },
      { label: "SAMU", number: "15", link: "tel:15", type: "urgent" },
      { label: "Pompiers", number: "18", link: "tel:18", type: "urgent" },
      { label: "Police", number: "17", link: "tel:17", type: "urgent" }
    ],

    depart: {
      heure: "10h00",
      taches: [
        "Vaisselle lavée et rangée",
        "Poubelles vidées",
        "Linge de bain déposé dans la salle de bain",
        "Fenêtres et volets fermés",
        "Climatisation éteinte",
        "Clé remise dans la boîte à clés"
      ]
    },

    faq: [
      { q: "Où se garer ?", a: "De nombreux parkings et places de stationnement gratuits sont disponibles à proximité immédiate de la résidence. Le logement ne dispose pas de place de parking privative." },
      { q: "Où se trouve le linge de lit ?", a: "Le linge de lit du canapé lit se trouve dans le petit coffre à côté de celui-ci. Le linge de lit des lits superposés sont disposés directement sur ces derniers." },
      { q: "Y a-t-il du nécessaire de toilette ?", a: "Oui ! Vous avez à votre disposition des serviettes de toilette, du gel douche, du shampoing et du savon pour les mains." },
      { q: "Où jeter mes déchets / poubelles ?", a: "La résidence dispose d'un local poubelle à l'extérieur de celle-ci. Vous le retrouverez en sortant de la résidence, en passant sous le porche à gauche en direction de la mer. Vous aurez besoin de la clé fournie pour ouvrir le local." },
      { q: "Que faire en cas de casse ou dégradation ?", a: "Pas de panique ! Contactez-nous directement pour nous le signaler." },
      { q: "Y a-t-il une machine à laver ?", a: "Le logement ne dispose pas de machine à laver. Vous retrovuerez plusieurs laveries automatiques au Grau-du-Roi." },
      { q: "Quels sont les produits de base fournis pour la cuisine ?", a: "Nous mettons à votre disposition du sel, du poivre, de l'huile, du café, du thé et du liquide vaisselle." },
      { q: "Quelle est l'épicerie la plus proche ?", a: "Un Carrefour Express se trouve à moins de 300m de la résidence, dans la zone comemrcial Le Samba. Vous y retrouverez également une boulangerie." },
      { q: "Avez-vous des recommandations de restaurants / bars / activités à proximité ?", a: "Bien sûr ! Retrouvez notre sélection de restaurants, bars et activités sur la page Découvrir (menu en bas de l'écran)." },
    ]
  },

  // Page Infos
  infos: {
    heroImg: "https://www.camping-air-marin.fr/wp-content/uploads/sites/3/2025/02/camping-proche-de-grau-du-roi.jpg",
    title: "Informations utiles",
    subtitle: "Retrouvez les informations importantes concernant le logement ainsi que sur le fonctionnement des appareils.",
    appareils: [
      { icon: "fa-tv", name: "TV connectée", text: "Allumez la TV avec la télécommande. Utilisez le bouton \"Home\" pour accéder à Netflix / YouTube.", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1170&auto=format&fit=crop" },
      { icon: "fa-bed", name: "Lit canapé", text: "Tirez sur la sangle et attrapez la barre horizontale pour déplier le lit. Pour le replier, soulevez le lit en attrapant la barre horizontale (voir schéma).", img: "https://i.ibb.co/5hZsqngd/lit-canape.png" },
      { icon: "fa-fan", name: "Ventilateur de plafond", text: "Commande via la télécommande murale. Trois vitesses disponibles.", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1170&auto=format&fit=crop" },
      { icon: "fa-fire-burner", name: "Plaque de cuisson", text: "Appuyez longuement sur ON, puis sélectionnez la zone de cuisson.", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1170&auto=format&fit=crop" },
      { icon: "fa-mug-hot", name: "Machine à café", text: "Remplir le réservoir, insérer une capsule et appuyer sur le bouton central.", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1170&auto=format&fit=crop" },
      { icon: "fa-microchip", name: "Micro-ondes", text: "Sélectionnez le temps puis appuyez sur Start.", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1170&auto=format&fit=crop" }
    ]
  },

  // Page Découvrir (Anciennement Carte)
  discover: {
    restaurants: [
      { name: "L'Assiette Amoureuse", description: "Poissons / fruits de mer aux saveurs internationales.", walk: 15, drive: 1.3, coords: [43.5357, 4.1372], address: "11 Rue Victor Granier" },
      { name: "La Barque Bleue", description: "Fruits de mer / produits iodés et dégustation de plateaux sur mesure.", walk: 15, drive: 1.3, coords: [43.5359, 4.1376], address: "20 Rue de la Poissonnerie" },
      { name: "L@ Guadeloupéenne", description: "Spécialités antillaises fait maison.", walk: 15, drive: 1.3, coords: [43.5362428180896, 4.1372306824503395], address: "2 Place de la République" },
      { name: "L'Estuaire", description: "Cuisine gastronomique raffinée à savourer directement sur les quais.", walk: 5, drive: 2, coords: [43.5300, 4.1400], address: "Quai" },
      { name: "Chez Fifi", description: "Spécialités locales et ambiance chaleureuse garantie.", walk: 1, drive: 1, coords: [43.5275, 4.1430], address: "Rue voisine" },
      { name: "Le Poisson Rouge", description: "Savourez des poissons frais et tapas au bord du port.", walk: 6, drive: 2, coords: [43.5315, 4.1385], address: "Le Port" },
      { name: "Crêperie Bretonne", description: "De délicieuses crêpes et galettes authentiques.", walk: 3, drive: 1, coords: [43.5260, 4.1425], address: "Centre" },
      { name: "Grillades & Co", description: "Spécialités de viandes grillées servies généreusement.", walk: 5, drive: 2, coords: [43.5240, 4.1460], address: "Boulevard" },
      { name: "Le Récif", description: "Plats méditerranéens typiques dans un cadre reposant.", walk: 7, drive: 3, coords: [43.5320, 4.1380], address: "Quai" },
      { name: "Sushi Plage", description: "Cuisine japonaise fraîche pour les amateurs de sushis.", walk: 4, drive: 1, coords: [43.5290, 4.1440], address: "Plage" }
      // Vous pourrez ajouter vos autres restaurants ici très facilement
    ],
    bars: [
      { name: "Lounge Bar Mer", description: "Un bar cosy idéal pour se détendre face à l'horizon.", walk: 2, drive: 1, coords: [43.5282, 4.1422], address: "Plage" },
      { name: "Le Sunset", description: "Cocktails créatifs avec une superbe vue sur la mer.", walk: 4, drive: 1, coords: [43.5292, 4.1435], address: "Promenade" },
      { name: "Havana Café", description: "Ambiance latino rythmée et soirées festives.", walk: 5, drive: 2, coords: [43.5302, 4.1395], address: "Port" },
      { name: "Le QG", description: "Le point de rendez-vous animé avec une bonne sélection musicale.", walk: 3, drive: 1, coords: [43.5262, 4.1420], address: "Centre" },
      { name: "Bar de la Plage", description: "Cadre décontracté pour boire un verre les pieds dans le sable.", walk: 1, drive: 1, coords: [43.5275, 4.1435], address: "Plage" },
      { name: "Le Mojito", description: "Spécialiste des cocktails rafraîchissants.", walk: 4, drive: 1, coords: [43.5258, 4.1448], address: "Centre" },
      { name: "Pub des Navigateurs", description: "Pub de marins traditionnel avec un beau choix de bières.", walk: 6, drive: 2, coords: [43.5312, 4.1388], address: "Port" },
      { name: "Le Corsaire", description: "Une rhumerie réputée pour ses breuvages corsés.", walk: 7, drive: 2, coords: [43.5322, 4.1378], address: "Quai" },
      { name: "Bodega del Mar", description: "Dégustez de délicieux tapas accompagnés de bons vins.", walk: 5, drive: 2, coords: [43.5305, 4.1402], address: "Port" },
      { name: "Tiki Bar", description: "Voyagez sous les tropiques grâce à leurs cocktails exotiques.", walk: 8, drive: 3, coords: [43.5332, 4.1368], address: "Canal" }
      // Ajoutez vos autres bars ici
    ],
    activites: [
      { name: "Seaquarium", description: "Découvrez le monde marin lors d'une visite en famille inoubliable.", walk: 5, drive: 2, coords: [43.5265, 4.1455], address: "Palais de la Mer" },
      { name: "Plage Sud", description: "Une superbe plage idéale pour la baignade et la détente.", walk: 2, drive: 1, coords: [43.5280, 4.1435], address: "Plage" },
      { name: "Location Jet Ski", description: "Faites le plein de sensations avec les sports nautiques.", walk: 6, drive: 2, coords: [43.5310, 4.1390], address: "Port" },
      { name: "Mini-Golf du Grau", description: "Parcours de mini-golf amusant pour petits et grands.", walk: 4, drive: 1, coords: [43.5250, 4.1440], address: "Avenue" },
      { name: "Location Vélos 'Cyclo Sud'", description: "Louez un vélo et explorez facilement les environs.", walk: 3, drive: 1, coords: [43.5260, 4.1425], address: "Centre" },
      { name: "Babyland", description: "Parc d'attractions pensé spécialement pour les enfants.", walk: 5, drive: 2, coords: [43.5270, 4.1460], address: "Parc" },
      { name: "Pédalos Plage Sud", description: "Balade relaxante en pédalo le long de la côte.", walk: 2, drive: 1, coords: [43.5285, 4.1430], address: "Plage" },
      { name: "Kitesurf School", description: "Apprenez le kitesurf avec des moniteurs passionnés.", walk: 8, drive: 3, coords: [43.5200, 4.1500], address: "Plage" },
      { name: "Promenade en Catamaran", description: "Une paisible excursion en mer pour s'évader.", walk: 9, drive: 3, coords: [43.5350, 4.1350], address: "Quai" },
      { name: "Paddle Board Location", description: "Location de paddles pour une session sportive au grand air.", walk: 3, drive: 1, coords: [43.5290, 4.1420], address: "Plage" }
      // Ajoutez vos autres activités ici
    ]
  }
};