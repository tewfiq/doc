export const defaultLanguage = 'FR';

export const languages = ['FR', 'EN'];

export const labels = {
  FR: {
    book: 'Réserver un échange',
    exploreDocs: 'Explorer la documentation',
    search: 'Rechercher',
    searchPlaceholder: 'Rechercher DINUM, documentation, IA, enseignement…',
    noResults: 'Aucun résultat',
    close: 'Fermer',
    navigation: 'Navigation principale',
    sidebarTitle: 'Knowledge Engineering',
    sidebarSubtitle: 'by Tewfiq Ferahi',
    onThisPage: 'Sur cette page',
    previous: 'Précédent',
    next: 'Suivant',
    quickLinks: 'Pour commencer',
    selectedExperience: 'Expériences sélectionnées',
    related: 'Pages liées',
    metadata: 'À propos de cette documentation',
    light: 'Clair',
    system: 'Système',
    dark: 'Sombre',
    language: 'Langue',
    theme: 'Thème',
    openSearch: 'Ouvrir la recherche',
    footerRole: 'Documentation by Tewfiq Ferahi',
    email: 'E-mail',
    pageNotFound: 'Page introuvable',
    startHere: 'Démarrer',
  },
  EN: {
    book: 'Book a call',
    exploreDocs: 'Explore the documentation',
    search: 'Search',
    searchPlaceholder: 'Search DINUM, documentation, AI, teaching…',
    noResults: 'No results',
    close: 'Close',
    navigation: 'Main navigation',
    sidebarTitle: 'Knowledge Engineering',
    sidebarSubtitle: 'by Tewfiq Ferahi',
    onThisPage: 'On this page',
    previous: 'Previous',
    next: 'Next',
    quickLinks: 'Start here',
    selectedExperience: 'Selected experience',
    related: 'Related pages',
    metadata: 'About this documentation',
    light: 'Light',
    system: 'System',
    dark: 'Dark',
    language: 'Language',
    theme: 'Theme',
    openSearch: 'Open search',
    footerRole: 'Documentation by Tewfiq Ferahi',
    email: 'Email',
    pageNotFound: 'Page not found',
    startHere: 'Getting Started',
  },
};

export const shared = {
  ctaUrl: 'https://cal.com/TEWFIQ',
  mistralVibe: {
    FR: 'Créé avec Mistral Vibe',
    EN: 'Built with Mistral Vibe',
  },
  footerSentence: {
    FR: 'Systèmes de connaissance, documentation et IA. Construit avec Mistral Vibe.',
    EN: 'Knowledge systems, documentation and AI. Built with Mistral Vibe.',
  },
  metadata: {
    FR: [
      ['Auteur', 'Tewfiq Ferahi'],
      ['Discipline', 'Product Design · Documentation · IA'],
      ['Positionnement', 'Design Engineer orienté systèmes de connaissance'],
      ['Statut', 'Disponible'],
      ['Lieu', 'Paris'],
      ['Créé avec', 'Mistral Vibe'],
      ['Mise à jour', 'Juin 2026'],
      ['Temps de lecture', '8 min'],
    ],
    EN: [
      ['Author', 'Tewfiq Ferahi'],
      ['Discipline', 'Product Design · Documentation · AI'],
      ['Positioning', 'Design Engineer focused on knowledge systems'],
      ['Status', 'Available'],
      ['Location', 'Paris'],
      ['Built with', 'Mistral Vibe'],
      ['Updated', 'June 2026'],
      ['Reading time', '8 min'],
    ],
  },
};

export const routes = [
  { path: '/', key: 'home', name: { FR: 'Bienvenue', EN: 'Welcome' } },
  { path: '/getting-started', key: 'gettingStarted', name: { FR: 'Démarrer', EN: 'Getting Started' } },
  { path: '/philosophy', key: 'philosophy', name: { FR: 'Philosophie', EN: 'Philosophy' } },
  { path: '/documentation-principles', key: 'principles', name: { FR: 'Principes', EN: 'Principles' } },
  { path: '/foundations', key: 'foundations', name: { FR: 'Fondations', EN: 'Foundations' } },
  { path: '/tokens', key: 'tokens', name: { FR: 'Tokens', EN: 'Tokens' } },
  { path: '/do-dont', key: 'doDont', name: { FR: "Do & Don’t", EN: "Do & Don’t" } },
  { path: '/patterns', key: 'patterns', name: { FR: 'Patterns', EN: 'Patterns' } },
  { path: '/knowledge-system', key: 'knowledgeSystem', name: { FR: 'Knowledge Studio', EN: 'Knowledge Studio' } },
  { path: '/primitives', key: 'primitives', name: { FR: 'Primitives', EN: 'Primitives' } },
  { path: '/track-record', key: 'trackRecord', name: { FR: 'Pratique', EN: 'Track Record' } },
  { path: '/experience', key: 'experience', name: { FR: 'Expérience', EN: 'Experience' } },
  { path: '/experience/dinum', key: 'dinum', name: { FR: 'DINUM', EN: 'DINUM' } },
  { path: '/experience/bnp-paribas', key: 'bnp', name: { FR: 'BNP Paribas', EN: 'BNP Paribas' } },
  { path: '/experience/education', key: 'education', name: { FR: 'Éducation', EN: 'Education' } },
  { path: '/resume', key: 'resume', name: { FR: 'CV', EN: 'Resume' } },
  { path: '/contact', key: 'contact', name: { FR: 'Contact', EN: 'Contact' } },
];

export const routeOrder = routes.map((route) => route.key);

export const navGroups = [
  {
    title: { FR: 'Intro', EN: 'Intro' },
    items: ['home', 'gettingStarted', 'philosophy'],
  },
  {
    title: { FR: 'Système', EN: 'System' },
    items: ['knowledgeSystem', 'primitives', 'trackRecord'],
  },
  {
    title: { FR: 'Terrain', EN: 'Field' },
    items: ['dinum', 'bnp', 'education'],
  },
  {
    title: { FR: 'Ressources', EN: 'Resources' },
    items: ['resume', 'contact'],
  },
];

export const metrics = {
  FR: [
    { title: 'IA générative', items: ['39 057 conversations Claude', '3,5 M tokens Claude', '1 430 jours ChatGPT'] },
    { title: 'Connaissance', items: ['1 128 solutions d’IA indexées', '1 000+ notes structurées', 'Veille technologique quotidienne'] },
    { title: 'Ingénierie', items: ['4 655+ contributions GitHub', '279 projets déployés', 'Développement assisté par IA'] },
    { title: 'Transmission', items: ['1 500+ étudiants formés', 'Licence, Master, MBA', 'Ateliers de construction de produits IA'] },
  ],
  EN: [
    { title: 'Generative AI', items: ['39,057 Claude conversations', '3.5M Claude tokens', '1,430 ChatGPT days'] },
    { title: 'Knowledge', items: ['1,128 AI solutions indexed', '1,000+ structured notes', 'Daily technology watch'] },
    { title: 'Engineering', items: ['4,655+ GitHub contributions', '279 deployed projects', 'AI-assisted development'] },
    { title: 'Teaching', items: ['1,500+ students trained', 'Bachelor, Master, MBA', 'AI Product Building workshops'] },
  ],
};

export const workflowSteps = {
  FR: ['Rechercher', 'Classer', 'Comparer', 'Documenter', 'Transmettre', 'Prototyper'],
  EN: ['Research', 'Classify', 'Compare', 'Document', 'Teach', 'Prototype'],
};

export const proofBadges = {
  FR: [
    { label: 'Claude', value: '39 057' },
    { label: 'OpenAI', value: '1 430 jours' },
    { label: 'GitHub', value: '4 655+' },
    { label: 'Notion', value: '1 128' },
  ],
  EN: [
    { label: 'Claude', value: '39,057' },
    { label: 'OpenAI', value: '1,430 days' },
    { label: 'GitHub', value: '4,655+' },
    { label: 'Notion', value: '1,128' },
  ],
};

export const knowledgeCards = {
  FR: ['Veille IA', 'Taxonomie', 'Évaluation d’outils', 'Processus de documentation', 'Supports pédagogiques', 'Décisions produit'],
  EN: ['AI Watch', 'Taxonomy', 'Tool Evaluation', 'Documentation Workflow', 'Teaching Material', 'Product Decisions'],
};

export const experienceCards = {
  FR: [
    {
      route: '/experience/dinum',
      title: 'DINUM',
      role: 'Responsable UX / Design Ops',
      updated: 'Juin 2026',
      description: 'Gouvernance UX pour écosystèmes complexes.',
      label: 'Service public',
      headline: 'Cohérence UX, DSFR et accessibilité.',
    },
    {
      route: '/experience/bnp-paribas',
      title: 'BNP Paribas',
      role: 'Lead UX Designer',
      updated: 'Juin 2026',
      description: 'UX Center, design sprints et alignement produit.',
      label: 'Enterprise',
      headline: 'UX Center, Design Sprints et décision.',
    },
    {
      route: '/experience/education',
      title: 'Éducation',
      role: 'Enseignant / Facilitateur',
      updated: 'Juin 2026',
      description: 'IA produit, UX Design et transmission.',
      label: 'Transmission',
      headline: 'IA produit, UX Design et apprentissage.',
    },
  ],
  EN: [
    {
      route: '/experience/dinum',
      title: 'DINUM',
      role: 'UX Lead / Design Ops',
      updated: 'June 2026',
      description: 'UX governance for complex ecosystems.',
      label: 'Public sector',
      headline: 'UX consistency, DSFR and accessibility.',
    },
    {
      route: '/experience/bnp-paribas',
      title: 'BNP Paribas',
      role: 'Lead UX Designer',
      updated: 'June 2026',
      description: 'UX Center, design sprints and product alignment.',
      label: 'Enterprise',
      headline: 'UX Center, Design Sprints and decisions.',
    },
    {
      route: '/experience/education',
      title: 'Education',
      role: 'Teacher / Facilitator',
      updated: 'June 2026',
      description: 'AI product, UX Design and teaching.',
      label: 'Teaching',
      headline: 'AI product, UX Design and learning.',
    },
  ],
};

export const interventionImages = {
  FR: [
    { src: '/images/asset 0.webp', alt: 'Intervention en entreprise', caption: 'Intervention en entreprise' },
    { src: '/images/asset 1.webp', alt: 'Session de travail avec une équipe produit', caption: 'Session de travail avec une équipe produit' },
    { src: '/images/asset 2.webp', alt: 'Masterclass sur l’IA produit', caption: 'Masterclass IA produit' },
    { src: '/images/asset 3.webp', alt: 'Atelier pédagogique en classe', caption: 'Atelier pédagogique' },
    { src: '/images/asset 4.webp', alt: 'Présentation devant une audience professionnelle', caption: 'Présentation professionnelle' },
    { src: '/images/asset 5.webp', alt: 'Intervention avec participants', caption: 'Transmission et pratique' },
    { src: '/images/asset 6.webp', alt: 'Session de formation avec supports projetés', caption: 'Formation et acculturation' },
    { src: '/images/asset 7.webp', alt: 'Animation d’un atelier collectif', caption: 'Atelier collectif' },
    { src: '/images/asset 8.webp', alt: 'Intervention sur scène', caption: 'Conférence et partage d’expérience' },
    { src: '/images/asset 9.webp', alt: 'Échange avec une audience', caption: 'Questions, cadrage et pédagogie' },
    { src: '/images/asset 10.webp', alt: 'Masterclass avec participants', caption: 'Masterclass et pratique guidée' },
  ],
  EN: [
    { src: '/images/asset 0.webp', alt: 'Company talk', caption: 'Company talk' },
    { src: '/images/asset 1.webp', alt: 'Product team work session', caption: 'Product team work session' },
    { src: '/images/asset 2.webp', alt: 'AI product masterclass', caption: 'AI product masterclass' },
    { src: '/images/asset 3.webp', alt: 'Classroom workshop', caption: 'Classroom workshop' },
    { src: '/images/asset 4.webp', alt: 'Professional presentation', caption: 'Professional presentation' },
    { src: '/images/asset 5.webp', alt: 'Workshop with participants', caption: 'Teaching and practice' },
    { src: '/images/asset 6.webp', alt: 'Training session with projected material', caption: 'Training and adoption' },
    { src: '/images/asset 7.webp', alt: 'Group workshop facilitation', caption: 'Group workshop' },
    { src: '/images/asset 8.webp', alt: 'On-stage talk', caption: 'Conference and field experience' },
    { src: '/images/asset 9.webp', alt: 'Audience discussion', caption: 'Questions, framing and pedagogy' },
    { src: '/images/asset 10.webp', alt: 'Masterclass with participants', caption: 'Masterclass and guided practice' },
  ],
};

export const trackRecordScreenshots = {
  FR: [
    { src: '/trackrecord_screenshots/claude.png', alt: 'Statistiques d’usage Claude', caption: 'Claude — conversations et usage' },
    { src: '/trackrecord_screenshots/chatgpt.png', alt: 'Statistiques d’usage ChatGPT', caption: 'ChatGPT — historique d’usage' },
    { src: '/trackrecord_screenshots/aigooglestudio.png', alt: 'Base de solutions IA et outils numériques', caption: 'Solutions IA et outils numériques indexés' },
    { src: '/trackrecord_screenshots/v0.png', alt: 'Statistiques v0', caption: 'v0 — prototypes et générations' },
    { src: '/trackrecord_screenshots/netilfy.png', alt: 'Statistiques Netlify', caption: 'Netlify — déploiements' },
    { src: '/trackrecord_screenshots/git1.png', alt: 'Statistiques GitHub première vue', caption: 'GitHub — contributions' },
    { src: '/trackrecord_screenshots/git2.png', alt: 'Statistiques GitHub deuxième vue', caption: 'GitHub — activité détaillée' },
  ],
  EN: [
    { src: '/trackrecord_screenshots/claude.png', alt: 'Claude usage statistics', caption: 'Claude — conversations and usage' },
    { src: '/trackrecord_screenshots/chatgpt.png', alt: 'ChatGPT usage statistics', caption: 'ChatGPT — usage history' },
    { src: '/trackrecord_screenshots/aigooglestudio.png', alt: 'AI solutions and digital tools database', caption: 'Indexed AI solutions and digital tools' },
    { src: '/trackrecord_screenshots/v0.png', alt: 'v0 statistics', caption: 'v0 — prototypes and generations' },
    { src: '/trackrecord_screenshots/netilfy.png', alt: 'Netlify statistics', caption: 'Netlify — deployments' },
    { src: '/trackrecord_screenshots/git1.png', alt: 'GitHub statistics first view', caption: 'GitHub — contributions' },
    { src: '/trackrecord_screenshots/git2.png', alt: 'GitHub statistics second view', caption: 'GitHub — detailed activity' },
  ],
};

export const principles = {
  FR: [
    ['Documentation as Product', 'Penser la documentation comme un produit avec ses usages, ses parcours et ses effets.', 'Cela aligne la structure sur la compréhension réelle.'],
    ['Documentation is UX', 'Le contenu n’est pas séparé de l’expérience.', 'La lisibilité et le parcours font partie du produit.'],
    ['Documentation is onboarding', 'Les bons contenus réduisent le temps d’appropriation.', 'Les utilisateurs avancent plus vite et avec moins de friction.'],
    ['Documentation is adoption', 'Une documentation utile crée de la confiance et de l’usage.', 'La qualité se mesure dans la circulation réelle.'],
    ['Documentation is architecture', 'La structure clarifie le système et les dépendances.', 'Un bon plan vaut autant qu’un bon texte.'],
    ['Documentation is learning', 'La connaissance devient partageable et réutilisable.', 'Cela transforme l’expertise en capacité collective.'],
  ],
  EN: [
    ['Documentation as Product', 'Treat documentation as a product with users, journeys and outcomes.', 'It aligns structure with real comprehension.'],
    ['Documentation is UX', 'Content is not separate from the experience.', 'Readability and flow are part of the product.'],
    ['Documentation is onboarding', 'The right content shortens time to understanding.', 'People move faster with less friction.'],
    ['Documentation is adoption', 'Useful documentation builds trust and usage.', 'Quality shows up in real circulation.'],
    ['Documentation is architecture', 'Structure clarifies the system and its dependencies.', 'A strong outline matters as much as strong prose.'],
    ['Documentation is learning', 'Knowledge becomes shareable and reusable.', 'Expertise turns into collective capability.'],
  ],
};

export const pages = {
  home: {
    path: '/',
    crumb: { FR: 'Bienvenue', EN: 'Welcome' },
    title: {
      FR: 'Je conçois la compréhension.',
      EN: 'I design understanding.',
    },
    eyebrow: { FR: 'DESIGNER PRODUIT · KNOWLEDGE SYSTEMS · IA', EN: 'PRODUCT DESIGNER · KNOWLEDGE SYSTEMS · AI' },
    subtitle: {
      FR: 'Des systèmes de connaissance, de documentation et d\u2019apprentissage pour rendre l\u2019IA plus claire, plus utile et plus adoptable.',
      EN: 'Knowledge, documentation and learning systems that make AI clearer, more useful and easier to adopt.',
    },
    punchline: {
      FR: 'La documentation n\u2019est que l\u2019interface.',
      EN: 'Documentation is only the interface.',
    },
    chips: {
      FR: ['Mistral Vibe', 'Paris', 'Disponible / Available', 'Knowledge Engineering', 'Version 1.0'],
      EN: ['Mistral Vibe', 'Paris', 'Available / Disponible', 'Knowledge Engineering', 'Version 1.0'],
    },
    proof: {
      FR: [
        { value: '10+', label: 'ans de Product Design' },
        { value: '1 500+', label: 'étudiants formés' },
        { value: '1 128', label: 'solutions IA indexées' },
        { value: '4 655+', label: 'contributions GitHub' },
      ],
      EN: [
        { value: '10+', label: 'years Product Design' },
        { value: '1,500+', label: 'students trained' },
        { value: '1,128', label: 'AI solutions indexed' },
        { value: '4,655+', label: 'GitHub contributions' },
      ],
    },
    ctas: {
      primary: { FR: 'Réserver un échange', EN: 'Book a call', href: shared.ctaUrl },
      secondary: { FR: 'Explorer le système', EN: 'Explore the system', href: '/knowledge-system' },
    },
    sections: [
      { id: 'hero-slideshow', title: { FR: 'Galerie', EN: 'Gallery' } },
      { id: 'primitives', title: { FR: 'Primitives', EN: 'Primitives' } },
      { id: 'proof', title: { FR: 'Preuves d\u2019usage', EN: 'Proof of practice' } },
      { id: 'knowledge-studio', title: { FR: 'Knowledge Studio', EN: 'Knowledge Studio' } },
      { id: 'field', title: { FR: 'Terrain', EN: 'Field' } },
    ],
  },
  gettingStarted: {
    path: '/getting-started',
    crumb: { FR: 'Démarrer', EN: 'Getting Started' },
    title: { FR: 'Démarrer', EN: 'Getting Started' },
    subtitle: {
      FR: 'Lire vite, cliquer juste, commencer par l’essentiel.',
      EN: 'Read fast, click clearly, start with the essentials.',
    },
    sections: [
      { id: 'what', title: { FR: 'Ce que vous trouverez ici', EN: 'What you’ll find here' } },
      { id: 'navigate', title: { FR: 'Comment naviguer', EN: 'How to navigate' } },
      { id: 'clickable', title: { FR: 'Ce qui est cliquable', EN: 'What is clickable' } },
      { id: 'recommended', title: { FR: 'Pages recommandées', EN: 'Recommended pages' } },
    ],
    content: {
      what: {
        FR: 'Principes, preuves, systèmes et cas concrets.',
        EN: 'Principles, proof, systems and real cases.',
      },
      navigate: {
        FR: 'Sidebar pour naviguer, recherche pour tout ouvrir.',
        EN: 'Use the sidebar, or search everything instantly.',
      },
      clickable: {
        FR: 'Cartes, images et flèches ouvrent d’autres pages.',
        EN: 'Cards, images and arrows open the other pages.',
      },
      recommended: [
        { route: '/philosophy', title: { FR: 'Philosophie', EN: 'Philosophy' } },
        { route: '/track-record', title: { FR: 'Pratique', EN: 'Track Record' } },
        { route: '/knowledge-system', title: { FR: 'Système de connaissances', EN: 'Knowledge System' } },
        { route: '/experience/dinum', title: { FR: 'DINUM', EN: 'DINUM' } },
      ],
    },
  },
  philosophy: {
    path: '/philosophy',
    crumb: { FR: 'Philosophie', EN: 'Philosophy' },
    title: { FR: 'Documentation as Product', EN: 'Documentation as Product' },
    subtitle: {
      FR: 'Une doc est un produit, pas une annexe.',
      EN: 'Documentation is a product, not an appendix.',
    },
    principles: [
      'Documentation is UX',
      'Documentation is onboarding',
      'Documentation is adoption',
      'Documentation is architecture',
      'Documentation is learning',
      'Documentation is trust',
    ],
    sections: [{ id: 'principles', title: { FR: 'Principes', EN: 'Principles' } }],
  },
  principles: {
    path: '/documentation-principles',
    crumb: { FR: 'Principes', EN: 'Principles' },
    title: { FR: 'Principes de documentation', EN: 'Documentation Principles' },
    subtitle: {
      FR: 'Principes pour rendre les systèmes lisibles.',
      EN: 'Principles for making systems readable.',
    },
    sections: [{ id: 'principles', title: { FR: 'Principes', EN: 'Principles' } }],
  },
  foundations: {
    path: '/foundations',
    crumb: { FR: 'Fondations', EN: 'Foundations' },
    title: { FR: 'Fondations', EN: 'Foundations' },
    subtitle: {
      FR: 'Mission, vision, valeurs et écriture.',
      EN: 'Mission, vision, values and writing.',
    },
    sections: [
      { id: 'mission', title: { FR: 'Mission', EN: 'Mission' } },
      { id: 'vision', title: { FR: 'Vision', EN: 'Vision' } },
      { id: 'values', title: { FR: 'Design Values', EN: 'Design Values' } },
      { id: 'writing', title: { FR: 'Writing Style', EN: 'Writing Style' } },
      { id: 'accessibility', title: { FR: 'Accessibility', EN: 'Accessibility' } },
      { id: 'learning', title: { FR: 'Learning Experience', EN: 'Learning Experience' } },
    ],
    content: {
      mission: {
        FR: 'Rendre la connaissance lisible et réutilisable.',
        EN: 'Make knowledge readable and reusable.',
      },
      vision: {
        FR: 'Aider les équipes à comprendre plus vite.',
        EN: 'Help teams understand faster.',
      },
      values: {
        FR: ['Précision', 'Chaleur humaine', 'Systèmes lisibles', 'Faible ego', 'Rigueur documentaire'],
        EN: ['Precision', 'Human warmth', 'Readable systems', 'Low ego', 'Documentation rigor'],
      },
      writing: {
        FR: 'Phrases courtes, titres explicites.',
        EN: 'Short sentences, explicit headings.',
      },
      accessibility: {
        FR: 'Contraste, clavier, états lisibles.',
        EN: 'Contrast, keyboard, readable states.',
      },
      learning: {
        FR: 'Du sens, puis la preuve, puis le système.',
        EN: 'Meaning, then proof, then system.',
      },
    },
  },
  tokens: {
    path: '/tokens',
    crumb: { FR: 'Tokens', EN: 'Tokens' },
    title: { FR: 'Tokens & primitives', EN: 'Tokens & primitives' },
    subtitle: {
      FR: 'La doc comme système.',
      EN: 'Documentation as a system.',
    },
    sections: [
      { id: 'color', title: { FR: 'Color tokens', EN: 'Color tokens' } },
      { id: 'semantic', title: { FR: 'Semantic colors', EN: 'Semantic colors' } },
      { id: 'typography', title: { FR: 'Typography', EN: 'Typography' } },
      { id: 'spacing', title: { FR: 'Spacing', EN: 'Spacing' } },
      { id: 'radius', title: { FR: 'Radius', EN: 'Radius' } },
      { id: 'borders', title: { FR: 'Borders', EN: 'Borders' } },
      { id: 'surfaces', title: { FR: 'Surfaces', EN: 'Surfaces' } },
    ],
    tokens: {
      color: [
        { name: 'Background', value: '#fffdf8' },
        { name: 'Surface', value: '#ffffff' },
        { name: 'Text', value: '#17130f' },
        { name: 'Muted', value: '#6f6a61' },
      ],
      semantic: [
        { name: 'Accent', value: '#ff6b35' },
        { name: 'Accent soft', value: '#fff0e8' },
        { name: 'Border', value: '#e8e0d3' },
        { name: 'Border strong', value: '#d8cdbd' },
      ],
      typography: ['Inter / ui-sans-serif', 'Semibold headings', 'Measured line-height', 'No viewport scaling'],
      spacing: ['4px increments', 'Compact header', 'Air around sections', 'Stable card padding'],
      radius: ['4px controls', '8px cards', 'full chips'],
      borders: ['Subtle default', 'Orange accent only when meaningful', 'Dashed only for placeholders'],
      surfaces: ['Warm off-white background', 'White content panels', 'Quiet dark mode surfaces'],
    },
  },
  doDont: {
    path: '/do-dont',
    crumb: { FR: "Do & Don’t", EN: "Do & Don’t" },
    title: { FR: "Do & Don’t", EN: "Do & Don’t" },
    subtitle: {
      FR: 'Des repères simples, précis.',
      EN: 'Simple, precise guardrails.',
    },
    sections: [
      { id: 'titles', title: { FR: 'Titres', EN: 'Titles' } },
      { id: 'metrics', title: { FR: 'Métriques', EN: 'Metrics' } },
      { id: 'case-studies', title: { FR: 'Études de cas', EN: 'Case studies' } },
    ],
    pairs: {
      titles: {
        do: { FR: 'Titres orientés compréhension.', EN: 'Understanding-led titles.' },
        dont: { FR: 'Titres vagues ou décoratifs.', EN: 'Vague or decorative titles.' },
      },
      metrics: {
        do: { FR: 'Montrer des traces d’usage.', EN: 'Show traces of usage.' },
        dont: { FR: 'Expertise sans preuve.', EN: 'Expertise without proof.' },
      },
      caseStudies: {
        do: { FR: 'Problème, rôle, impact, apprentissage.', EN: 'Problem, role, impact, learning.' },
        dont: { FR: 'Empiler captures ou logos.', EN: 'Stack only screenshots or logos.' },
      },
    },
  },
  patterns: {
    path: '/patterns',
    crumb: { FR: 'Patterns', EN: 'Patterns' },
    title: { FR: 'Patterns documentaires', EN: 'Documentation Patterns' },
    subtitle: {
      FR: 'Structures réutilisables.',
      EN: 'Reusable page structures.',
    },
    sections: [
      { id: 'case-study', title: { FR: 'Case Study Pattern', EN: 'Case Study Pattern' } },
      { id: 'experience-pattern', title: { FR: 'Experience Pattern', EN: 'Experience Pattern' } },
      { id: 'knowledge-card', title: { FR: 'Knowledge Card', EN: 'Knowledge Card' } },
      { id: 'metric-group', title: { FR: 'Metric Group', EN: 'Metric Group' } },
      { id: 'callout', title: { FR: 'Callout', EN: 'Callout' } },
      { id: 'navigation', title: { FR: 'Previous / Next', EN: 'Previous / Next' } },
      { id: 'related', title: { FR: 'Related Pages', EN: 'Related Pages' } },
    ],
  },
  trackRecord: {
    path: '/track-record',
    crumb: { FR: 'Pratique', EN: 'Track Record' },
    title: { FR: 'Une pratique mesurée par l’usage réel.', EN: 'A practice measured by real usage.' },
    subtitle: {
      FR: 'Des traces de pratique quotidienne.',
      EN: 'Traces of daily practice.',
    },
    sections: [
      { id: 'metrics', title: { FR: 'Groupes de pratique', EN: 'Practice groups' } },
      { id: 'heatmap', title: { FR: 'Carte de pratique quotidienne', EN: 'Daily practice map' } },
      { id: 'screenshots', title: { FR: 'Captures de preuves', EN: 'Evidence screenshots' } },
      { id: 'related', title: { FR: 'Pages liées', EN: 'Related pages' } },
    ],
  },
  knowledgeSystem: {
    path: '/knowledge-system',
    crumb: { FR: 'Knowledge Studio', EN: 'Knowledge Studio' },
    title: { FR: 'Knowledge Studio', EN: 'Knowledge Studio' },
    subtitle: {
      FR: 'Mon espace de travail pour rechercher, classer, comparer, documenter et transmettre.',
      EN: 'My workspace to research, classify, compare, document and teach.',
    },
    microcopy: {
      FR: 'Une base vivante qui nourrit mes cours, mes prototypes et mes décisions produit.',
      EN: 'A living base that feeds my courses, prototypes and product decisions.',
    },
    pipeline: {
      FR: ['Rechercher', 'Classer', 'Comparer', 'Documenter', 'Transmettre', 'Prototyper'],
      EN: ['Research', 'Classify', 'Compare', 'Document', 'Teach', 'Prototype'],
    },
    sections: [
      { id: 'workflow', title: { FR: 'Pipeline', EN: 'Pipeline' } },
      { id: 'knowledge-cards', title: { FR: 'Couches du système', EN: 'System layers' } },
      { id: 'screenshot', title: { FR: 'Espace de travail', EN: 'Workspace' } },
    ],
  },
  primitives: {
    path: '/primitives',
    crumb: { FR: 'Primitives', EN: 'Primitives' },
    title: { FR: 'Primitives', EN: 'Primitives' },
    subtitle: {
      FR: 'Les briques fondamentales du système de connaissance.',
      EN: 'The building blocks of the knowledge system.',
    },
    items: {
      FR: [
        { title: 'Architecture de l\u2019information', caption: 'Structurer pour comprendre, pas pour stocker.' },
        { title: 'Systèmes de connaissance', caption: 'Relier les savoirs en base vivante.' },
        { title: 'Workflows IA', caption: 'Automatiser la recherche et l\u2019évaluation.' },
        { title: 'Design Systems', caption: 'Créer des composants réutilisables et cohérents.' },
        { title: 'Apprentissage', caption: 'Transformer la complexité en parcours.' },
        { title: 'Adoption', caption: 'Rendre l\u2019outil compris, utilisé, intégré.' },
      ],
      EN: [
        { title: 'Information Architecture', caption: 'Structure for understanding, not storage.' },
        { title: 'Knowledge Systems', caption: 'Connect knowledge into a living base.' },
        { title: 'AI Workflows', caption: 'Automate research and evaluation.' },
        { title: 'Design Systems', caption: 'Create reusable, consistent components.' },
        { title: 'Learning', caption: 'Turn complexity into learning paths.' },
        { title: 'Adoption', caption: 'Make the tool understood, used, integrated.' },
      ],
    },
    sections: [
      { id: 'primitives-list', title: { FR: 'Les 6 primitives', EN: 'The 6 primitives' } },
    ],
  },
  experience: {
    path: '/experience',
    crumb: { FR: 'Expérience', EN: 'Experience' },
    title: { FR: 'Expérience', EN: 'Experience' },
    subtitle: {
      FR: 'Trois contextes, une même méthode.',
      EN: 'Three contexts, one method.',
    },
    sections: [{ id: 'experience-cards', title: { FR: 'Études de cas', EN: 'Case studies' } }],
  },
  dinum: {
    path: '/experience/dinum',
    crumb: { FR: 'DINUM', EN: 'DINUM' },
    title: { FR: 'DINUM', EN: 'DINUM' },
    subtitle: { FR: 'Gouvernance UX pour systèmes complexes', EN: 'UX governance for complex systems' },
    metadata: {
      FR: [
        ['Rôle', 'Responsable UX / Designer Produit'],
        ['Périmètre', 'Services publics numériques'],
        ['Focus', 'DSFR, accessibilité, opérations design, documentation'],
        ['Statut', 'Terminé'],
      ],
      EN: [
        ['Role', 'Lead UX / Product Designer'],
        ['Scope', 'Public digital services'],
        ['Focus', 'DSFR, accessibility, DesignOps, documentation'],
        ['Status', 'Completed'],
      ],
    },
    sections: [
      { id: 'overview', title: { FR: 'Contexte', EN: 'Overview' } },
      { id: 'problem', title: { FR: 'Problème', EN: 'Problem' } },
      { id: 'role', title: { FR: 'Rôle', EN: 'Role' } },
      { id: 'impact', title: { FR: 'Impact', EN: 'Impact' } },
      { id: 'lesson', title: { FR: 'Leçon', EN: 'Lesson' } },
    ],
    body: {
      FR: {
        overview: 'La Suite Numérique et des services publics numériques.',
        problem: 'Multi-acteurs, besoin de cohérence et d’accessibilité.',
        role: ['Cohérence UX', 'Alignement DSFR', 'Documentation des décisions', 'Coordination', 'DesignOps', 'Accessibilité'],
        impact: ['Parcours cohérents', 'Décisions lisibles', 'Adoption facilitée'],
        lesson: 'La cohérence se structure.',
      },
      EN: {
        overview: 'Work on La Suite Numérique and public digital services in a multi-stakeholder context requiring consistency, accessibility and digital sovereignty.',
        problem: 'Multiple stakeholders, vendors and internal teams. Risk of fragmented UX and misalignment with the French State Design System.',
        role: ['UX consistency ownership', 'DSFR alignment', 'Decision documentation', 'Cross-functional coordination', 'DesignOps structure', 'Accessibility'],
        impact: ['More consistent journeys', 'Clearer design decisions', 'Easier adoption by teams'],
        lesson: 'Coherence is not enforced. It is designed.',
      },
    },
    media: {
      FR: [
        { src: '/images/dimum/La Dinum.webp', alt: 'Intervention DINUM', caption: 'DINUM — contexte institutionnel' },
        { src: '/images/dimum/Viva Tech.webp', alt: 'Intervention VivaTech avec DINUM', caption: 'Écosystème public numérique et innovation' },
      ],
      EN: [
        { src: '/images/dimum/La Dinum.webp', alt: 'DINUM intervention', caption: 'DINUM — institutional context' },
        { src: '/images/dimum/Viva Tech.webp', alt: 'VivaTech intervention with DINUM', caption: 'Public digital ecosystem and innovation' },
      ],
    },
  },
  bnp: {
    path: '/experience/bnp-paribas',
    crumb: { FR: 'BNP Paribas', EN: 'BNP Paribas' },
    title: { FR: 'BNP Paribas', EN: 'BNP Paribas' },
    subtitle: { FR: 'Centre UX, Design Sprints, alignement produit', EN: 'UX Center, Design Sprints, product alignment' },
    metadata: {
      FR: [
        ['Rôle', 'Lead UX Designer'],
        ['Périmètre', 'Centre UX PACE'],
        ['Focus', 'Sprint de design, formation de dirigeants, culture UX'],
        ['Statut', 'Terminé'],
      ],
      EN: [
        ['Role', 'Lead UX Designer'],
        ['Scope', 'UX Center PACE'],
        ['Focus', 'Design Sprint, executive training, UX culture'],
        ['Status', 'Completed'],
      ],
    },
    sections: [
      { id: 'problem', title: { FR: 'Problème', EN: 'Problem' } },
      { id: 'role', title: { FR: 'Rôle', EN: 'Role' } },
      { id: 'impact', title: { FR: 'Impact', EN: 'Impact' } },
      { id: 'lesson', title: { FR: 'Leçon', EN: 'Lesson' } },
    ],
    body: {
      FR: {
        problem: 'Grande organisation, cycles longs, besoin d’alignement rapide.',
        role: ['UX Center', 'Formation dirigeants', 'Sprint facilitation', 'Coaching'],
        impact: ['Cadrage plus clair', 'Décisions plus rapides', 'Culture UX renforcée'],
        lesson: 'Le sprint transforme des semaines en quelques jours.',
      },
      EN: {
        problem: 'Large organization, long decision cycles, business silos and need for faster alignment between product, business and technology.',
        role: ['Co-led UX Center', 'Executive training', 'Design Sprint facilitation', 'Team coaching'],
        impact: ['Better product framing', 'Faster decision-making', 'Stronger UX culture'],
        lesson: 'Design Sprints turn weeks of meetings into a few days of action.',
      },
    },
    media: {
      FR: [
        { src: '/images/bnpp/BNP Paribas Design Sprint 2.0.webp', alt: 'Design Sprint BNP Paribas', caption: 'BNP Paribas — Design Sprint 2.0' },
        { src: '/images/bnpp/BNL Design bancaire, Rome-1.webp', alt: 'Design bancaire BNL à Rome', caption: 'BNL / BNP Paribas — design bancaire à Rome' },
      ],
      EN: [
        { src: '/images/bnpp/BNP Paribas Design Sprint 2.0.webp', alt: 'BNP Paribas Design Sprint', caption: 'BNP Paribas — Design Sprint 2.0' },
        { src: '/images/bnpp/BNL Design bancaire, Rome-1.webp', alt: 'BNL banking design in Rome', caption: 'BNL / BNP Paribas — banking design in Rome' },
      ],
    },
  },
  education: {
    path: '/experience/education',
    crumb: { FR: 'Éducation', EN: 'Education' },
    title: { FR: 'Formation & Transmission', EN: 'Teaching & Transmission' },
    subtitle: { FR: 'Préparer les leaders à l’IA produit', EN: 'Preparing leaders for the AI product era' },
    metadata: {
      FR: [
        ['Rôle', 'Enseignant, mentor, facilitateur d’ateliers'],
        ['Public', 'Licence, Master, MBA'],
        ['Focus', 'IA générative, design produit, construction de produits IA'],
        ['Étudiants', '1 500+'],
      ],
      EN: [
        ['Role', 'Teacher, mentor, workshop facilitator'],
        ['Audience', 'Bachelor, Master, MBA'],
        ['Focus', 'GenAI, Product Design, AI Product Building'],
        ['Students', '1,500+'],
      ],
    },
    sections: [
      { id: 'problem', title: { FR: 'Problème', EN: 'Problem' } },
      { id: 'role', title: { FR: 'Rôle', EN: 'Role' } },
      { id: 'institutions', title: { FR: 'Écoles', EN: 'Institutions' } },
      { id: 'impact', title: { FR: 'Impact', EN: 'Impact' } },
      { id: 'lesson', title: { FR: 'Leçon', EN: 'Lesson' } },
    ],
    body: {
      FR: {
        problem: 'Apprendre à raisonner avec l’IA, pas seulement l’utiliser.',
        role: ['Programmes IA produit', 'Cours FR/EN', 'Mentorat', 'Vulgarisation'],
        institutions: ['ECV Paris', 'EDC Paris Business School', 'Digital College', 'Ascencia Business School', 'École CONTE'],
        impact: ['1 500+ étudiants', 'Méthodes orientées produit', 'Prototyper et évaluer'],
        lesson: 'Transformer la complexité en parcours.',
      },
      EN: {
        problem: 'Future designers, managers and product leaders need to learn how to reason with AI, not just use tools.',
        role: ['AI Product Building curriculum design', 'Courses and workshops in French and English', 'Mentoring and juries', 'Explaining complex concepts clearly'],
        institutions: ['ECV Paris', 'EDC Paris Business School', 'Digital College', 'Ascencia Business School', 'École CONTE'],
        impact: ['1,500+ students supported', 'Product-oriented AI methods', 'Ability to prototype and evaluate AI products'],
        lesson: 'Teaching AI product means turning complexity into learning paths.',
      },
    },
    media: {
      FR: [
        { src: '/images/education/MBA Gen AI.webp', alt: 'Atelier MBA sur l’IA générative', caption: 'MBA — atelier IA générative' },
        { src: '/images/education/Congrats.webp', alt: 'Moment de félicitations avec des étudiants', caption: 'Éducation — restitution et accompagnement' },
      ],
      EN: [
        { src: '/images/education/MBA Gen AI.webp', alt: 'MBA workshop on generative AI', caption: 'MBA — generative AI workshop' },
        { src: '/images/education/Congrats.webp', alt: 'Congratulations moment with students', caption: 'Education — presentation and mentoring' },
      ],
    },
  },
  resume: {
    path: '/resume',
    crumb: { FR: 'CV', EN: 'Resume' },
    title: { FR: 'CV', EN: 'Resume' },
    subtitle: {
      FR: 'Une version documentée du parcours, structurée pour lire rapidement les rôles, preuves et domaines d’expertise.',
      EN: 'A documented version of the profile, structured to scan roles, proof points and areas of expertise quickly.',
    },
    sections: [{ id: 'resume-summary', title: { FR: 'Résumé', EN: 'Summary' } }],
  },
  contact: {
    path: '/contact',
    crumb: { FR: 'Contact', EN: 'Contact' },
    title: { FR: 'Contact', EN: 'Contact' },
    subtitle: {
      FR: 'Pour discuter documentation produit, systèmes de connaissances, design engineering ou rôle chez Mistral AI.',
      EN: 'For product documentation, knowledge systems, design engineering or the Mistral AI role.',
    },
    sections: [{ id: 'contact-options', title: { FR: 'Options', EN: 'Options' } }],
  },
};

export function getRouteByKey(key) {
  return routes.find((route) => route.key === key);
}

export function getRouteByPath(path) {
  return routes.find((route) => route.path === path);
}

export function getPrevNext(key) {
  const index = routeOrder.indexOf(key);
  return {
    previous: index > 0 ? routeOrder[index - 1] : null,
    next: index >= 0 && index < routeOrder.length - 1 ? routeOrder[index + 1] : null,
  };
}

export function buildSearchIndex(language) {
  return routes.flatMap((route) => {
    const page = pages[route.key];
    const base = [
      {
        path: route.path,
        title: route.name[language],
        excerpt: page?.subtitle?.[language] || '',
      },
    ];
    const sections =
      page?.sections?.map((section) => ({
        path: `${route.path === '/' ? '' : route.path}#${section.id}` || `/#${section.id}`,
        title: section.title[language],
        excerpt: route.name[language],
      })) || [];
    return [...base, ...sections];
  });
}
