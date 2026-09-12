import { PinItem } from '../types';

export const INITIAL_PINS: PinItem[] = [
  {
    id: 'pin-1',
    title: 'Salon scandinave minimaliste & bois clair',
    category: 'déco scandinave',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80',
    height: 480,
    author: {
      name: 'Camille Leroux',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      handle: '@atelier_scandi',
      verified: true
    },
    likes: 428,
    saves: 1890,
    commentsCount: 34,
    description: 'Une harmonie parfaite entre bois de bouleau blond, textiles en lin écru et suspensions lumineuses au design épuré.',
    tags: ['déco', 'scandinave', 'intérieur', 'nordic', 'lumineux'],
    link: 'https://mirest.fr/ideas/scandi-living',
    accent: 'cyan'
  },
  {
    id: 'pin-2',
    title: 'Recette gourmande : Velouté de potimarron & éclats de noisettes',
    category: 'recette d’automne',
    type: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    duration: '0:48',
    height: 380,
    author: {
      name: 'Chef Alexandre B.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      handle: '@saveurs_automne',
      verified: true
    },
    likes: 852,
    saves: 3410,
    commentsCount: 92,
    description: 'La recette réconfortante par excellence. Cuisson lente avec thym frais, crème d’avoine et graines de courge torréfiées.',
    tags: ['cuisine', 'automne', 'potimarron', 'recette-facile', 'soupe'],
    accent: 'amber'
  },
  {
    id: 'pin-3',
    title: 'Mode minimaliste & manteau trench intemporel',
    category: 'mode minimaliste',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80',
    height: 520,
    author: {
      name: 'Léa Deschamp',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      handle: '@lea_minimal',
      verified: false
    },
    likes: 614,
    saves: 2120,
    commentsCount: 18,
    description: 'Une garde-robe capsule bien pensée : tons sable, coupes structurées et matières naturelles nobles.',
    tags: ['mode', 'streetwear', 'capsule-wardrobe', 'trench', 'élégance'],
    accent: 'pink'
  },
  {
    id: 'pin-4',
    title: 'Jardin urbain sur terrasse & plantes dépolluantes',
    category: 'jardin urbain',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=700&q=80',
    height: 360,
    author: {
      name: 'Benoît Végétal',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      handle: '@urban_oasis',
      verified: true
    },
    likes: 310,
    saves: 1450,
    commentsCount: 22,
    description: 'Comment transformer un balcon de 4m² en un véritable havre de fraîcheur luxuriant.',
    tags: ['jardin', 'plantes', 'balcon', 'greenery', 'urban-jungle'],
    accent: 'emerald'
  },
  {
    id: 'pin-5',
    title: 'Escapade au Portugal : Ruelles dorées d’Alfama à Lisbonne',
    category: 'voyage Portugal',
    type: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    duration: '0:52',
    height: 440,
    author: {
      name: 'Voyageurs Nomades',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      handle: '@wander_portugal',
      verified: true
    },
    likes: 1240,
    saves: 4890,
    commentsCount: 110,
    description: 'Les meilleurs spots secrets pour admirer le coucher du soleil au miradouro de Santa Luzia.',
    tags: ['voyage', 'portugal', 'lisbonne', 'sunset', 'travel-guide'],
    accent: 'cyan'
  },
  {
    id: 'pin-6',
    title: 'Tutoriel DIY : Étagère suspendue en chêne massif et cuir',
    category: 'DIY bois',
    type: 'diy',
    mediaUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=700&q=80',
    height: 400,
    author: {
      name: 'Théo Fabrique',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
      handle: '@woodwork_craft',
      verified: false
    },
    likes: 470,
    saves: 2790,
    commentsCount: 45,
    description: 'Fabriquez vous-même cette étagère tendance en moins de deux heures avec des outils basiques.',
    tags: ['diy', 'bois', 'fait-main', 'bricolage', 'upcycling'],
    accent: 'amber'
  },
  {
    id: 'pin-7',
    title: 'Inspiration coiffure tressée bohème chic',
    category: 'coiffure tressée',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
    height: 460,
    author: {
      name: 'Émilie Coiffure',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      handle: '@braids_and_blooms',
      verified: true
    },
    likes: 720,
    saves: 3100,
    commentsCount: 29,
    description: 'Idéal pour un mariage ou une journée printanière. Tresse épi détendue avec micro-fleurs séchées.',
    tags: ['coiffure', 'tresses', 'beauté', 'mariage', 'bohème'],
    accent: 'pink'
  },
  {
    id: 'pin-8',
    title: 'Architecture intérieure : Verrière d’atelier et lumière zénithale',
    category: 'architecture intérieure',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80',
    height: 500,
    author: {
      name: 'Studio Arch&Lines',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
      handle: '@arch_lines',
      verified: true
    },
    likes: 1390,
    saves: 6200,
    commentsCount: 78,
    description: 'Rénovation d’un ancien atelier d’artiste à Montmartre avec sol en béton ciré et verrière acier noir.',
    tags: ['architecture', 'loft', 'verrière', 'design', 'maison'],
    accent: 'cyan'
  },
  {
    id: 'pin-9',
    title: 'Maîtriser le café Latte Art : Cygne délicat',
    category: 'café latte art',
    type: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4',
    duration: '0:35',
    height: 370,
    author: {
      name: 'Matthieu Barista',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      handle: '@barista_matthieu',
      verified: true
    },
    likes: 890,
    saves: 4120,
    commentsCount: 63,
    description: 'La technique pas à pas pour texturer le lait et réussir le geste du cygne dans une tasse cappuccino.',
    tags: ['café', 'latte-art', 'espresso', 'barista', 'coffee-lover'],
    accent: 'amber'
  },
  {
    id: 'pin-10',
    title: 'Peinture aquarelle : Ciel brumeux & pins de montagne',
    category: 'peinture aquarelle',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80',
    height: 410,
    author: {
      name: 'Sophie Aquarelles',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
      handle: '@sophie_art',
      verified: false
    },
    likes: 540,
    saves: 2310,
    commentsCount: 31,
    description: 'Technique humide sur humide avec pigments bleu indigo, vert mousse et rehauts d’or liquide.',
    tags: ['art', 'aquarelle', 'peinture', 'créatif', 'paysage'],
    accent: 'emerald'
  },
  {
    id: 'pin-11',
    title: 'Look streetwear automnal & baskets rétro',
    category: 'look streetwear',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80',
    height: 490,
    author: {
      name: 'Noah K.',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
      handle: '@noah_street',
      verified: true
    },
    likes: 670,
    saves: 1980,
    commentsCount: 24,
    description: 'Combinaison hoodie surdimensionné beige, pantalon cargo vert olive et baskets rétro 90s.',
    tags: ['streetwear', 'fashion', 'sneakers', 'outfit', 'urban'],
    accent: 'pink'
  },
  {
    id: 'pin-12',
    title: 'Balcon fleuri & guirlandes lumineuses tamisées',
    category: 'balcon fleuri',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80',
    height: 350,
    author: {
      name: 'Juliette Maison',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      handle: '@juliette_deco',
      verified: false
    },
    likes: 410,
    saves: 1650,
    commentsCount: 15,
    description: 'Une ambiance féerique pour les soirées douces avec géraniums lierres, lavande et lanternes solaires.',
    tags: ['balcon', 'fleurs', 'guirlande', 'soirée', 'cozy'],
    accent: 'cyan'
  },
  {
    id: 'pin-13',
    title: 'Création céramique fait main : Tasses émaillées pastel',
    category: 'DIY bois',
    type: 'diy',
    mediaUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=700&q=80',
    height: 420,
    author: {
      name: 'Atelier Terre & Feu',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      handle: '@terre_et_feu',
      verified: true
    },
    likes: 580,
    saves: 2840,
    commentsCount: 38,
    description: 'Tournage au tour de potier et émaillage bi-goût avec dégradé bleu ciel et argile naturelle.',
    tags: ['céramique', 'poterie', 'faitmain', 'artisanat', 'pastel'],
    accent: 'cyan'
  },
  {
    id: 'pin-14',
    title: 'Guide photo : Coucher de soleil néon à Tokyo',
    category: 'voyage Portugal',
    type: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    duration: '0:45',
    height: 470,
    author: {
      name: 'Kenji Visuals',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      handle: '@kenji_tokyo',
      verified: true
    },
    likes: 2190,
    saves: 8400,
    commentsCount: 142,
    description: 'L’explosion des néons sous la pluie de Shinjuku : réglages d’exposition et gestion des reflets.',
    tags: ['néon', 'tokyo', 'cyberpunk', 'photographie', 'nuit'],
    accent: 'pink'
  }
];
