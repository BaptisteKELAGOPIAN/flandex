import type { FlanLocation } from '../types';

export const MOCK_FLANS: FlanLocation[] = [
  // --- TOP CHAMPIONS OFFICIELS ---
  {
    id: '1',
    name: 'Flan Vanille',
    bakery: 'La Pompadour',
    description: '1er Prix du Meilleur Flan de Paris 2024. Le vainqueur absolu par Clément Buisson, salué pour son équilibre parfait entre onctuosité et croustillant.',
    lat: 48.8625,
    lng: 2.2764,
    rating: 5.0,
    postalCode: '75116',
    city: 'Paris'
  },
  {
    id: '2',
    name: 'Flan Franco-Coréen',
    bakery: 'Mille & Un',
    description: '1er Prix 2023 et N°1 du classement Le Parisien. Texture hybride incroyable, également disponible au sésame noir.',
    lat: 48.8504,
    lng: 2.3245,
    rating: 5.0,
    postalCode: '75006',
    city: 'Paris'
  },
  {
    id: '3',
    name: 'Le Flan de Champion 2025',
    bakery: 'À Deux Mains',
    description: 'Vainqueur du Meilleur Flan d\'Île-de-France 2025 par Elio Chaaya et Franck Harcaut. La nouvelle référence.',
    lat: 48.8715,
    lng: 2.2224,
    rating: 5.0,
    postalCode: '92150',
    city: 'Suresnes'
  },
  {
    id: '4',
    name: 'Le Flan de la Croix Nivert',
    bakery: 'Le Moulin de la Croix Nivert',
    description: '3ème Prix Paris 2024 par Jean-Yves Boullier. Une valeur sûre et régulière de la Rive Gauche.',
    lat: 48.8478,
    lng: 2.2982,
    rating: 4.9,
    postalCode: '75015',
    city: 'Paris'
  },
  {
    id: '5',
    name: 'Flan Traditionnel',
    bakery: 'Maison Bergeron',
    description: '8ème Prix Paris 2024. Une institution classique et parfaitement exécutée.',
    lat: 48.8584,
    lng: 2.3061,
    rating: 4.8,
    postalCode: '75007',
    city: 'Paris'
  },

  // --- HAUTE PÂTISSERIE & PALACES ---
  {
    id: '6',
    name: 'Flan Japonais',
    bakery: 'Mori Yoshida',
    description: 'Souvent cité comme le flan ultime par François Blanc. Épure, pâte brisée épaisse, très peu sucré.',
    lat: 48.8512,
    lng: 2.3123,
    rating: 4.9,
    postalCode: '75007',
    city: 'Paris'
  },
  {
    id: '7',
    name: 'Flan Vanille & Confiture de Lait',
    bakery: 'Cheval Blanc Paris (Maxime Frédéric)',
    description: 'L\'un des flans de palace les plus raffinés au monde. Légèreté absolue.',
    lat: 48.8589,
    lng: 2.3418,
    rating: 4.9,
    postalCode: '75001',
    city: 'Paris'
  },
  {
    id: '8',
    name: 'Le Flan de Palace',
    bakery: 'Royal Monceau (Quentin Lechat)',
    description: 'Un flan ultra-luxueux, saturé de vanille, avec une croûte noire signature.',
    lat: 48.8764,
    lng: 2.2988,
    rating: 4.9,
    postalCode: '75008',
    city: 'Paris'
  },
  {
    id: '9',
    name: 'Flan Chocolat',
    bakery: 'Le Bristol (Yu Tanaka)',
    description: 'La référence absolue pour le flan au chocolat dans le monde des palaces.',
    lat: 48.8718,
    lng: 2.3142,
    rating: 4.9,
    postalCode: '75008',
    city: 'Paris'
  },
  {
    id: '10',
    name: 'Flan Entremets',
    bakery: 'Jacques Genin',
    description: 'Uniquement sur commande. La perfection technique d\'un fondeur en chocolat.',
    lat: 48.8643,
    lng: 2.3644,
    rating: 4.9,
    postalCode: '75003',
    city: 'Paris'
  },

  // --- COUPS DE CŒUR DES CRITIQUES ---
  {
    id: '11',
    name: 'Flan Panettone / Levain',
    bakery: 'Christophe Louie',
    description: 'Classé N°2 par Le Parisien. Un flan généreux en vanille sur une base travaillée au levain.',
    lat: 48.8601,
    lng: 2.3592,
    rating: 4.8,
    postalCode: '75003',
    city: 'Paris'
  },
  {
    id: '12',
    name: 'Flan Charbon Végétal / Sésame',
    bakery: 'Boulangerie Utopie',
    description: 'Incontournable des classements Fou de Pâtisserie. Parfait équilibre et versions originales.',
    lat: 48.8655,
    lng: 2.3681,
    rating: 4.8,
    postalCode: '75011',
    city: 'Paris'
  },
  {
    id: '13',
    name: 'Flan Brut',
    bakery: 'Tapisserie',
    description: 'La boulangerie de l\'équipe du Septime. Recommandé par Vogue pour son côté rustique et sourcé.',
    lat: 48.8514,
    lng: 2.3789,
    rating: 4.8,
    postalCode: '75011',
    city: 'Paris'
  },
  {
    id: '14',
    name: 'Flan Mélilot',
    bakery: 'Pâtisserie Mélilot',
    description: 'La révélation de l\'année. Sans vanille, utilisant le mélilot pour des notes herbacées de tonka.',
    lat: 48.8572,
    lng: 2.3965,
    rating: 4.8,
    postalCode: '75020',
    city: 'Paris'
  },
  {
    id: '15',
    name: 'Flan à l\'Ancienne',
    bakery: 'The French Bastards',
    description: 'Très bien cuit, pâte feuilletée ultra-travaillée et crème tremblotante.',
    lat: 48.8621,
    lng: 2.3712,
    rating: 4.8,
    postalCode: '75011',
    city: 'Paris'
  },

  // --- LES VALEURS SÛRES & RÉSEAUX SOCIAUX ---
  {
    id: '16',
    name: 'Flan de Quartier',
    bakery: 'Mamiche',
    description: 'Un classique généreux, épais et sans chichis. Chouchou d\'Instagram.',
    lat: 48.8805,
    lng: 2.3354,
    rating: 4.7,
    postalCode: '75009',
    city: 'Paris'
  },
  {
    id: '17',
    name: 'Flan Régressif',
    bakery: 'Benoît Castel',
    description: 'Cité par Vogue. Un flan dense et crémeux, au goût d\'enfance.',
    lat: 48.8623,
    lng: 2.3912,
    rating: 4.7,
    postalCode: '75020',
    city: 'Paris'
  },
  {
    id: '18',
    name: 'Bar à Flans',
    bakery: 'Paris & Co',
    description: 'Un choix immense le dimanche : taro, pistache, fleur d\'oranger.',
    lat: 48.8465,
    lng: 2.2882,
    rating: 4.6,
    postalCode: '75015',
    city: 'Paris'
  },
  {
    id: '19',
    name: 'Flan Grand Cru',
    bakery: 'Yann Couvreur',
    description: 'Une croûte caramélisée puissante et une crème infusée de plusieurs vanilles.',
    lat: 48.8598,
    lng: 2.3575,
    rating: 4.7,
    postalCode: '75004',
    city: 'Paris'
  },
  {
    id: '20',
    name: 'Flangipane',
    bakery: 'Neulo',
    description: 'Création virale de Pierre-Jean Quinonero. Un hybride très réussi.',
    lat: 48.8582,
    lng: 2.3561,
    rating: 4.7,
    postalCode: '75004',
    city: 'Paris'
  },

  // --- LE RESTE DU CLASSEMENT ---
  {
    id: '21',
    name: 'Flan Sablé',
    bakery: 'Bontemps',
    description: 'La pâte feuilletée laisse place à leur fameux biscuit sablé.',
    lat: 48.8624,
    lng: 2.3612,
    rating: 4.7,
    postalCode: '75003',
    city: 'Paris'
  },
  {
    id: '22',
    name: 'Flan Marbré',
    bakery: 'Nuance (Nuoao)',
    description: 'Très esthétique, mélange subtil de vanille et chocolat.',
    lat: 48.8654,
    lng: 2.3412,
    rating: 4.6,
    postalCode: '75001',
    city: 'Paris'
  },
  {
    id: '23',
    name: 'Flan Bio',
    bakery: 'Arlette & Colette',
    description: 'Rapport qualité/prix exceptionnel, ingrédients bio.',
    lat: 48.8912,
    lng: 2.3214,
    rating: 4.6,
    postalCode: '75017',
    city: 'Paris'
  },
  {
    id: '24',
    name: 'Le Flan Bo&Mie',
    bakery: 'BO&MIE',
    description: 'Une croûte bien foncée et une belle déclinaison chocolat.',
    lat: 48.8651,
    lng: 2.3482,
    rating: 4.5,
    postalCode: '75002',
    city: 'Paris'
  },
  {
    id: '25',
    name: 'Flan Historique',
    bakery: 'Stohrer',
    description: 'La recette intemporelle de la plus vieille pâtisserie de Paris.',
    lat: 48.8642,
    lng: 2.3478,
    rating: 4.6,
    postalCode: '75002',
    city: 'Paris'
  },
  {
    id: '26',
    name: 'Flan Haute Couture',
    bakery: 'Cédric Grolet Opéra',
    description: 'Visuellement parfait, onctueux mais clivant.',
    lat: 48.8694,
    lng: 2.3342,
    rating: 4.5,
    postalCode: '75002',
    city: 'Paris'
  },
  {
    id: '27',
    name: 'Flan François Perret',
    bakery: 'Ritz Paris Le Comptoir',
    description: 'Dense, vanillé et luxueux.',
    lat: 48.8682,
    lng: 2.3284,
    rating: 4.8,
    postalCode: '75001',
    city: 'Paris'
  },
  {
    id: '28',
    name: 'Flan Sans Œuf',
    bakery: 'Cyril Lignac',
    description: 'Technique impressionnante pour une texture malgré tout très crémeuse.',
    lat: 48.8532,
    lng: 2.3921,
    rating: 4.6,
    postalCode: '75011',
    city: 'Paris'
  },
  {
    id: '29',
    name: 'Flan Infiniment Vanille',
    bakery: 'Pierre Hermé',
    description: 'L\'intensité aromatique signature de Pierre Hermé.',
    lat: 48.8512,
    lng: 2.3321,
    rating: 4.7,
    postalCode: '75006',
    city: 'Paris'
  },
  {
    id: '30',
    name: 'Flan Brut',
    bakery: 'Fadoli',
    description: 'Crème très blanche, aucun artifice.',
    lat: 48.8562,
    lng: 2.4214,
    rating: 4.6,
    postalCode: '93100',
    city: 'Montreuil'
  },
  {
    id: '31',
    name: 'Flan Vanille',
    bakery: 'KL Pâtisserie',
    description: 'Kévin Lacote propose un appareil soyeux et très peu sucré.',
    lat: 48.8824,
    lng: 2.3012,
    rating: 4.7,
    postalCode: '75017',
    city: 'Paris'
  },
  {
    id: '32',
    name: 'Flan Rustique',
    bakery: 'Sain Boulangerie',
    description: 'Le goût des céréales anciennes s\'invite dans le flan.',
    lat: 48.8724,
    lng: 2.3621,
    rating: 4.6,
    postalCode: '75010',
    city: 'Paris'
  },
  {
    id: '33',
    name: 'Flan Artisanal',
    bakery: 'L\'Artisan des Gourmands',
    description: 'Classé 9ème au concours du Grand Paris 2024.',
    lat: 48.8351,
    lng: 2.2894,
    rating: 4.7,
    postalCode: '75015',
    city: 'Paris'
  },
  {
    id: '34',
    name: 'Flan Vanille',
    bakery: 'Aux Délices de Glacière',
    description: 'Classé 10ème au concours du Grand Paris 2024.',
    lat: 48.8315,
    lng: 2.3456,
    rating: 4.7,
    postalCode: '75013',
    city: 'Paris'
  },
  {
    id: '35',
    name: 'Flan Matcha',
    bakery: 'Jugetsudo',
    description: 'Recommandé par Sortir à Paris. Le meilleur flan au matcha.',
    lat: 48.8502,
    lng: 2.3312,
    rating: 4.7,
    postalCode: '75006',
    city: 'Paris'
  },
  {
    id: '36',
    name: 'Flan Pistache',
    bakery: 'Babka Zana',
    description: 'Une pâte feuilletée dense et une forte note de pistache.',
    lat: 48.8778,
    lng: 2.3392,
    rating: 4.5,
    postalCode: '75009',
    city: 'Paris'
  },
  {
    id: '37',
    name: 'Flan Café',
    bakery: 'Ten Belles',
    description: 'L\'esprit coffee shop dans un flan bien structuré.',
    lat: 48.8732,
    lng: 2.3621,
    rating: 4.5,
    postalCode: '75010',
    city: 'Paris'
  },
  {
    id: '38',
    name: 'Flan Artisanal',
    bakery: 'Boulangerie au 140',
    description: 'Classé 7ème au concours du Grand Paris 2024.',
    lat: 48.8752,
    lng: 2.3921,
    rating: 4.7,
    postalCode: '75020',
    city: 'Paris'
  },
  {
    id: '39',
    name: 'Flan Boulanger',
    bakery: 'Poilâne',
    description: 'La rusticité assumée.',
    lat: 48.8504,
    lng: 2.3278,
    rating: 4.4,
    postalCode: '75006',
    city: 'Paris'
  },
  {
    id: '40',
    name: 'Flan Classique',
    bakery: 'Maison Landemaine',
    description: 'Un bon rapport qualité/prix accessible partout.',
    lat: 48.8612,
    lng: 2.3642,
    rating: 4.3,
    postalCode: '75011',
    city: 'Paris'
  },
  {
    id: '41',
    name: 'Flan Maison',
    bakery: 'Maison Thévenin',
    description: 'Présent dans les mentions honorables 2024.',
    lat: 48.8501,
    lng: 2.3212,
    rating: 4.5,
    postalCode: '75006',
    city: 'Paris'
  },
  {
    id: '42',
    name: 'Flan Artisanal',
    bakery: 'Au Paradis du Gourmand',
    description: 'Une adresse discrète mais très solide du 14ème.',
    lat: 48.8312,
    lng: 2.3245,
    rating: 4.6,
    postalCode: '75014',
    city: 'Paris'
  },
  {
    id: '43',
    name: 'Le Flan de la Pointe',
    bakery: 'Boulangerie de la Pointe',
    description: 'Classé 6ème au concours du Grand Paris 2024 (Chaville).',
    lat: 48.8052,
    lng: 2.1892,
    rating: 4.8,
    postalCode: '92370',
    city: 'Chaville'
  },
  {
    id: '44',
    name: 'Flan Francilien',
    bakery: 'Boulangerie Chelles Gambetta',
    description: '2ème Prix au concours du Grand Paris 2024 par Frédéric Antunes.',
    lat: 48.8781,
    lng: 2.5891,
    rating: 4.9,
    postalCode: '77500',
    city: 'Chelles'
  },
  {
    id: '45',
    name: 'Flan de Banlieue',
    bakery: 'Bloom Café',
    description: '5ème Prix au concours du Grand Paris 2024 par Dounia Moumni.',
    lat: 48.9214,
    lng: 2.2541,
    rating: 4.8,
    postalCode: '92700',
    city: 'Colombes'
  },
  {
    id: '46',
    name: 'Flan de Chef',
    bakery: 'Fou de Pâtisserie',
    description: 'La boutique qui sélectionne les meilleurs flans des grands chefs.',
    lat: 48.8658,
    lng: 2.3472,
    rating: 4.8,
    postalCode: '75002',
    city: 'Paris'
  }
];
