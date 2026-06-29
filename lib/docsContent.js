export const defaultLanguage = 'FR';

export const languages = ['FR', 'EN'];

export const labels = {
  FR: {
    book: 'Réserver un échange',
    downloadResume: 'Télécharger le CV',
    search: 'Rechercher',
    searchPlaceholder: 'Rechercher une page ou une section',
    searchHelp: 'Rechercher dans la documentation',
    noResults: 'Aucun résultat',
    close: 'Fermer',
    navigation: 'Navigation principale',
    sidebarTitle: 'Documentation de candidature',
    onThisPage: 'Sur cette page',
    previous: 'Précédent',
    next: 'Suivant',
    quickLinks: 'Accès rapides',
    selectedExperience: 'Expériences sélectionnées',
    related: 'Pages liées',
    metadata: 'Métadonnées',
    light: 'Clair',
    system: 'Système',
    dark: 'Sombre',
    language: 'Langue',
    theme: 'Thème',
    command: 'Commande',
    openSearch: 'Ouvrir la recherche',
    footerRole: 'Designer Produit — Documentation',
    footerBuilt: 'Créé avec',
    email: 'E-mail',
    pageNotFound: 'Page introuvable',
  },
  EN: {
    book: 'Book a call',
    downloadResume: 'Download Resume',
    search: 'Search',
    searchPlaceholder: 'Search pages or sections',
    searchHelp: 'Search documentation',
    noResults: 'No results',
    close: 'Close',
    navigation: 'Main navigation',
    sidebarTitle: 'Candidate Documentation',
    onThisPage: 'On this page',
    previous: 'Previous',
    next: 'Next',
    quickLinks: 'Quick links',
    selectedExperience: 'Selected experience',
    related: 'Related pages',
    metadata: 'Metadata',
    light: 'Light',
    system: 'System',
    dark: 'Dark',
    language: 'Language',
    theme: 'Theme',
    command: 'Command',
    openSearch: 'Open search',
    footerRole: 'Product Designer — Documentation',
    footerBuilt: 'Built with',
    email: 'Email',
    pageNotFound: 'Page not found',
  },
};

export const routes = [
  { path: '/', key: 'home', name: { FR: 'Aperçu', EN: 'Overview' } },
  { path: '/track-record', key: 'trackRecord', name: { FR: 'Pratique', EN: 'Track Record' } },
  { path: '/knowledge-system', key: 'knowledgeSystem', name: { FR: 'Système de connaissances', EN: 'Knowledge System' } },
  { path: '/documentation-principles', key: 'principles', name: { FR: 'Principes de documentation', EN: 'Documentation Principles' } },
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
    title: { FR: 'Démarrer', EN: 'Getting Started' },
    items: ['home', 'trackRecord', 'knowledgeSystem', 'principles'],
  },
  {
    title: { FR: 'Expérience', EN: 'Experience' },
    items: ['experience', 'dinum', 'bnp', 'education'],
  },
  {
    title: { FR: 'Ressources', EN: 'Resources' },
    items: ['resume', 'contact'],
  },
];

export const shared = {
  mistralVibe: {
    FR: 'Créé avec Mistral Vibe',
    EN: 'Built with Mistral Vibe',
  },
  ctaUrl: 'https://cal.com/TEWFIQ',
};

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
  FR: ['Rechercher', 'Classer', 'Comparer', 'Documenter', 'Transmettre', 'Prototyper', 'Améliorer'],
  EN: ['Research', 'Classify', 'Compare', 'Document', 'Teach', 'Prototype', 'Improve'],
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
      description: 'Gouvernance UX, DSFR, accessibilité et opérations design pour des services publics numériques.',
    },
    {
      route: '/experience/bnp-paribas',
      title: 'BNP Paribas',
      description: 'Centre UX, sprints de design et acculturation UX auprès de dirigeants.',
    },
    {
      route: '/experience/education',
      title: 'Éducation',
      description: 'IA produit, UX Design et IA générative auprès d’étudiants Licence, Master et MBA.',
    },
  ],
  EN: [
    {
      route: '/experience/dinum',
      title: 'DINUM',
      description: 'UX governance, DSFR, accessibility and DesignOps for public digital services.',
    },
    {
      route: '/experience/bnp-paribas',
      title: 'BNP Paribas',
      description: 'UX Center, Design Sprints and UX training for executives.',
    },
    {
      route: '/experience/education',
      title: 'Education',
      description: 'AI Product Building, UX Design and GenAI for Bachelor, Master and MBA students.',
    },
  ],
};

export const pages = {
  home: {
    path: '/',
    crumb: { FR: 'Aperçu', EN: 'Overview' },
    title: {
      FR: 'Je conçois la documentation comme un produit.',
      EN: 'I design documentation as a product.',
    },
    eyebrow: { FR: 'Designer Produit — Documentation', EN: 'Product Designer — Documentation' },
    subtitle: {
      FR: 'Je conçois des systèmes de connaissances, de la documentation et des expériences d’apprentissage qui aident à comprendre, adopter et déployer les produits d’IA à grande échelle.',
      EN: 'I design knowledge systems, documentation and learning experiences that help people understand, adopt and scale AI products.',
    },
    sections: [
      { id: 'metadata', title: { FR: 'Documentation de candidature', EN: 'Candidate Documentation' } },
      { id: 'quick-links', title: { FR: 'Accès rapides', EN: 'Quick links' } },
      { id: 'selected-experience', title: { FR: 'Expériences sélectionnées', EN: 'Selected experience' } },
    ],
  },
  trackRecord: {
    path: '/track-record',
    crumb: { FR: 'Pratique', EN: 'Track Record' },
    title: { FR: 'Une pratique mesurée par l’usage réel.', EN: 'A practice measured by real usage.' },
    subtitle: {
      FR: 'Ces chiffres ne sont pas des trophées. Ce sont les traces d’une pratique quotidienne à travers les modèles de langage, les prototypes, les déploiements, la documentation et le code.',
      EN: 'These numbers are not achievements. They are traces of daily practice across LLMs, prototypes, deployments, documentation and code.',
    },
    sections: [
      { id: 'metrics', title: { FR: 'Groupes de pratique', EN: 'Practice groups' } },
      { id: 'heatmap', title: { FR: 'Carte de pratique quotidienne', EN: 'Daily practice map' } },
      { id: 'related', title: { FR: 'Pages liées', EN: 'Related pages' } },
    ],
  },
  knowledgeSystem: {
    path: '/knowledge-system',
    crumb: { FR: 'Système de connaissances', EN: 'Knowledge System' },
    title: { FR: 'Système de connaissances vivant', EN: 'Living Knowledge System' },
    subtitle: {
      FR: 'Depuis 2023, je maintiens une base de connaissances structurée sur les outils, modèles, processus et modèles produit liés à l’IA. Elle nourrit mon enseignement, mon conseil, mes prototypes et ma documentation.',
      EN: 'Since 2023, I maintain a structured knowledge base of AI tools, models, workflows and product patterns. It feeds my teaching, consulting, prototyping and documentation work.',
    },
    sections: [
      { id: 'workflow', title: { FR: 'Processus', EN: 'Workflow' } },
      { id: 'knowledge-cards', title: { FR: 'Couches du système', EN: 'System layers' } },
      { id: 'placeholder', title: { FR: 'Capture à intégrer', EN: 'Screenshot placeholder' } },
    ],
  },
  principles: {
    path: '/documentation-principles',
    crumb: { FR: 'Principes', EN: 'Principles' },
    title: { FR: 'Principes de documentation', EN: 'Documentation Principles' },
    subtitle: {
      FR: 'Les principes que j’applique pour transformer des systèmes complexes en expériences compréhensibles, utiles et maintenables.',
      EN: 'The principles I use to turn complex systems into understandable, useful and maintainable experiences.',
    },
    sections: [{ id: 'principles', title: { FR: 'Principes', EN: 'Principles' } }],
  },
  experience: {
    path: '/experience',
    crumb: { FR: 'Expérience', EN: 'Experience' },
    title: { FR: 'Expérience sélectionnée', EN: 'Selected Experience' },
    subtitle: {
      FR: 'Trois contextes résument mon approche : structurer des écosystèmes complexes, accélérer l’alignement produit et transmettre des méthodes IA.',
      EN: 'Three contexts summarize my approach: structuring complex ecosystems, accelerating product alignment and teaching AI methods.',
    },
    sections: [{ id: 'experience-cards', title: { FR: 'Études de cas', EN: 'Case studies' } }],
  },
  dinum: {
    path: '/experience/dinum',
    crumb: { FR: 'DINUM', EN: 'DINUM' },
    title: { FR: 'DINUM', EN: 'DINUM' },
    subtitle: { FR: 'Gouvernance UX pour écosystèmes complexes', EN: 'UX governance for complex ecosystems' },
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
        overview: 'Intervention sur La Suite Numérique et des services publics numériques, dans un contexte multi-acteurs avec exigences de cohérence, accessibilité et souveraineté numérique.',
        problem: 'Multiplicité d’acteurs, prestataires et équipes internes. Risque d’hétérogénéité UX et de non-alignement avec le Système de Design de l’État.',
        role: ['Garant de la cohérence UX', 'Alignement DSFR', 'Documentation des décisions', 'Coordination transverse', 'Structuration des opérations design', 'Accessibilité'],
        impact: ['Parcours plus cohérents', 'Décisions design plus lisibles', 'Adoption facilitée par les équipes'],
        lesson: 'La cohérence ne se décrète pas. Elle se structure.',
      },
      EN: {
        overview: 'Work on La Suite Numérique and public digital services in a multi-stakeholder context requiring consistency, accessibility and digital sovereignty.',
        problem: 'Multiple stakeholders, vendors and internal teams. Risk of fragmented UX and misalignment with the French State Design System.',
        role: ['UX consistency ownership', 'DSFR alignment', 'Decision documentation', 'Cross-functional coordination', 'DesignOps structure', 'Accessibility'],
        impact: ['More consistent journeys', 'Clearer design decisions', 'Easier adoption by teams'],
        lesson: 'Coherence is not enforced. It is designed.',
      },
    },
    media: { FR: ['Photo DINUM', 'Photo DesignGouv / accessibilité'], EN: ['DINUM photo', 'DesignGouv / accessibility photo'] },
  },
  bnp: {
    path: '/experience/bnp-paribas',
    crumb: { FR: 'BNP Paribas', EN: 'BNP Paribas' },
    title: { FR: 'BNP Paribas', EN: 'BNP Paribas' },
    subtitle: { FR: 'Centre UX, sprints de design et alignement produit', EN: 'UX Center, Design Sprints and product alignment' },
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
        problem: 'Grande organisation, cycles de décision longs, silos métiers et besoin d’alignement rapide entre produit, métier et technologie.',
        role: ['Co-pilotage de l’UX Center', 'Formation de dirigeants', 'Facilitation de sprints de design', 'Coaching des équipes'],
        impact: ['Meilleur cadrage produit', 'Décisions plus rapides', 'Culture UX renforcée'],
        lesson: 'Le sprint de design transforme des semaines de réunions en quelques jours d’action.',
      },
      EN: {
        problem: 'Large organization, long decision cycles, business silos and need for faster alignment between product, business and technology.',
        role: ['Co-led UX Center', 'Executive training', 'Design Sprint facilitation', 'Team coaching'],
        impact: ['Better product framing', 'Faster decision-making', 'Stronger UX culture'],
        lesson: 'Design Sprints turn weeks of meetings into a few days of action.',
      },
    },
    media: { FR: ['Photo atelier BNP', 'Photo sprint de design'], EN: ['BNP workshop photo', 'Design Sprint photo'] },
  },
  education: {
    path: '/experience/education',
    crumb: { FR: 'Éducation', EN: 'Education' },
    title: { FR: 'Formation & Transmission', EN: 'Teaching & Transmission' },
    subtitle: { FR: 'Préparer les leaders à l’ère de l’IA produit', EN: 'Preparing leaders for the AI product era' },
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
        problem: 'Les futurs designers, managers et responsables produit doivent apprendre à raisonner avec l’IA, pas seulement à utiliser des outils.',
        role: ['Conception de programmes de construction de produits IA', 'Cours et ateliers en français et anglais', 'Mentorat et jurys', 'Vulgarisation de concepts complexes'],
        institutions: ['ECV Paris', 'EDC Paris Business School', 'Digital College', 'Ascencia Business School', 'École CONTE'],
        impact: ['1 500+ étudiants accompagnés', 'Méthodes IA orientées produit', 'Capacité à prototyper et évaluer des produits IA'],
        lesson: 'Enseigner l’IA produit, c’est transformer la complexité en parcours d’apprentissage.',
      },
      EN: {
        problem: 'Future designers, managers and product leaders need to learn how to reason with AI, not just use tools.',
        role: ['AI Product Building curriculum design', 'Courses and workshops in French and English', 'Mentoring and juries', 'Explaining complex concepts clearly'],
        institutions: ['ECV Paris', 'EDC Paris Business School', 'Digital College', 'Ascencia Business School', 'École CONTE'],
        impact: ['1,500+ students supported', 'Product-oriented AI methods', 'Ability to prototype and evaluate AI products'],
        lesson: 'Teaching AI product means turning complexity into learning paths.',
      },
    },
    media: { FR: ['Photo salle de cours', 'Photo atelier MBA'], EN: ['Classroom photo', 'MBA workshop photo'] },
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

export const principles = {
  FR: [
    ['Documentation First', 'Penser la documentation dès la conception du produit.', 'Cela réduit les zones floues et accélère l’adoption.'],
    ['Architecture de l’information', 'Organiser les contenus selon les modèles mentaux des utilisateurs.', 'Une bonne structure réduit la charge cognitive.'],
    ['Divulgation progressive', 'Montrer le bon niveau de détail au bon moment.', 'Les débutants et experts peuvent avancer sans friction.'],
    ['Apprendre en faisant', 'Transformer la lecture en action.', 'Les guides de démarrage et exemples accélèrent la compréhension.'],
    ['Accessibilité', 'Rendre l’information utilisable par toutes et tous.', 'L’accessibilité est une condition de qualité.'],
    ['Systèmes de design', 'Documenter les composants, modèles et décisions.', 'Cela rend les pratiques réutilisables.'],
    ['Graphes de connaissance', 'Relier les concepts plutôt que les empiler.', 'Les liens créent de la découverte et de la compréhension.'],
  ],
  EN: [
    ['Documentation First', 'Think about documentation from the first product decisions.', 'It reduces ambiguity and accelerates adoption.'],
    ['Information Architecture', 'Organize content around users’ mental models.', 'Good structure reduces cognitive load.'],
    ['Progressive Disclosure', 'Reveal the right level of detail at the right time.', 'Beginners and experts can move forward without friction.'],
    ['Learning by Doing', 'Turn reading into action.', 'Quickstarts and examples accelerate understanding.'],
    ['Accessibility', 'Make information usable by everyone.', 'Accessibility is a condition of quality.'],
    ['Design Systems', 'Document components, patterns and decisions.', 'It makes practices reusable.'],
    ['Knowledge Graphs', 'Connect concepts instead of stacking pages.', 'Links create discovery and understanding.'],
  ],
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
    const base = [{
      path: route.path,
      title: route.name[language],
      excerpt: page?.subtitle?.[language] || '',
    }];
    const sections = page?.sections?.map((section) => ({
      path: `${route.path === '/' ? '' : route.path}#${section.id}` || `/#${section.id}`,
      title: section.title[language],
      excerpt: route.name[language],
    })) || [];
    return [...base, ...sections];
  });
}
