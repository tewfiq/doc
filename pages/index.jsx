import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);
const LanguageContext = createContext(null);

const sections = [
  { id: 'overview', label: { EN: 'Overview', FR: 'Aperçu' }, slug: { EN: 'overview', FR: 'apercu' } },
  { id: 'why-documentation', label: { EN: 'Why Documentation', FR: 'Pourquoi la documentation' }, slug: { EN: 'why-documentation', FR: 'pourquoi-la-documentation' } },
  { id: 'track-record', label: { EN: 'Track Record', FR: 'Pratique' }, slug: { EN: 'track-record', FR: 'pratique' } },
  { id: 'knowledge', label: { EN: 'Living Knowledge System', FR: 'Système de connaissances vivant' }, slug: { EN: 'living-knowledge-system', FR: 'systeme-de-connaissances' } },
  { id: 'experience', label: { EN: 'Selected Experience', FR: 'Expérience sélectionnée' }, slug: { EN: 'selected-experience', FR: 'experience-selectionnee' } },
  { id: 'teaching', label: { EN: 'Teaching', FR: 'Transmission' }, slug: { EN: 'teaching', FR: 'transmission' } },
  { id: 'principles', label: { EN: 'Documentation Principles', FR: 'Principes de documentation' }, slug: { EN: 'documentation-principles', FR: 'principes-de-documentation' } },
];

const translations = {
  EN: {
    book: 'Book a call',
    resume: 'Download Resume',
    role: 'Product Designer — Documentation',
    docTitle: 'Candidate Documentation v1.0',
    onThisPage: 'On this page',
    navigation: 'Navigation',
    mainNavigation: 'Main navigation',
    sectionNavigation: 'Section navigation',
    languageControl: 'Language',
    themeControl: 'Theme',
    previous: 'Previous',
    next: 'Next',
  },
  FR: {
    book: 'Réserver un échange',
    resume: 'Télécharger le CV',
    role: 'Designer Produit — Documentation',
    docTitle: 'Documentation de candidature v1.0',
    onThisPage: 'Sur cette page',
    navigation: 'Navigation',
    mainNavigation: 'Navigation principale',
    sectionNavigation: 'Navigation de section',
    languageControl: 'Langue',
    themeControl: 'Thème',
    previous: 'Précédent',
    next: 'Suivant',
    proof: 'Preuve',
    footerRole: 'Designer Produit — Documentation',
    builtWithFooter: 'Créé avec Mistral Vibe, Next.js et Tailwind',
  },
};

const themeLabels = {
  EN: { light: 'Light', system: 'System', dark: 'Dark' },
  FR: { light: 'Clair', system: 'Système', dark: 'Sombre' },
};

const languageLabels = {
  EN: { EN: 'EN', FR: 'FR' },
  FR: { EN: 'Anglais', FR: 'Français' },
};

const content = {
  EN: {
    heroTitle: <>I design documentation<br />as a product.</>,
    heroSubtitle: 'I build knowledge systems, documentation and learning experiences that help people understand, adopt and scale AI products.',
    heroBadges: ['Built with Mistral Vibe', 'Paris', 'Available', 'Version 1.0'],
    proof: ['10+ years Product Design', '1,500+ students', '1,128 AI solutions documented', '4,655+ GitHub contributions'],
    metadataTitle: 'Candidate Documentation',
    metadata: [
      ['Author', 'Tewfiq Ferahi'],
      ['Role', 'Product Designer — Documentation'],
      ['Status', 'Available'],
      ['Location', 'Paris'],
      ['Updated', 'June 2026'],
      ['Built with', 'Mistral Vibe'],
      ['Reading time', '8 min'],
    ],
    infoCallout: 'This website is intentionally designed as a documentation product rather than a traditional portfolio. It demonstrates how I approach information architecture, learning experiences and product adoption.',
    whyItems: [
      ['Information', 'Documentation is Product', 'Documentation is not just content. It has users, journeys, friction points, metrics and outcomes.'],
      ['Tip', 'Documentation scales adoption', 'Good documentation helps users move from understanding to action without waiting for support.'],
      ['Best Practice', 'Reduce cognitive load', 'A documentation system should make complex concepts easier to scan, compare and reuse.'],
      ['Principle', 'Create shared understanding', 'Great documentation aligns product, engineering, support, customers and partners around the same mental model.'],
    ],
    trackIntro: 'These numbers are not achievements. They are traces of daily practice across LLMs, prototypes, deployments, documentation and code.',
    trackGroups: [
      ['Generative AI', ['39,057 Claude conversations', '3.5M Claude tokens', '1,430 ChatGPT days']],
      ['Knowledge', ['1,128 AI solutions indexed', '1,000+ structured notes', 'Daily technology watch']],
      ['Engineering', ['4,655+ GitHub contributions', '279 deployed projects', 'AI-assisted development']],
      ['Teaching', ['1,500+ students trained', 'Bachelor, Master, MBA', 'AI Product Building workshops']],
    ],
    heatmapTitle: 'Daily practice map',
    heatmapCaption: 'Static contribution-style trace',
    heatmapAria: 'Static GitHub-style activity heatmap',
    knowledgeIntro: 'Since 2023, I maintain a structured knowledge base of AI tools, models, workflows and product patterns. It feeds my teaching, consulting, prototyping and documentation work.',
    workflowTitle: 'Workflow',
    workflow: ['Research', 'Classify', 'Compare', 'Document', 'Teach', 'Prototype', 'Improve'],
    knowledgeCards: ['AI Watch', 'Taxonomy', 'Tool Evaluation', 'Documentation Workflow', 'Teaching Material', 'Product Decisions'],
    knowledgeCardBody: 'A reusable layer in the knowledge system for research, comparison, learning and product decisions.',
    experienceFields: [['problem', 'Problem'], ['role', 'Role'], ['impact', 'Impact'], ['lesson', 'Lesson learned']],
    experiences: [
      {
        company: 'DINUM',
        scope: 'Public sector design systems',
        problem: 'Multiple teams and vendors working on complex public digital services.',
        role: 'Product design, UX governance, DSFR alignment, accessibility and DesignOps.',
        impact: 'More consistent user journeys, clearer design decisions, better shared practices.',
        lesson: 'Documentation only works when governance, accessibility and delivery constraints are designed together.',
      },
      {
        company: 'BNP Paribas',
        scope: 'UX Center & Design Sprints',
        problem: 'Large organization, slow decision cycles, many stakeholders.',
        role: 'Co-led UX Center PACE, trained executives, facilitated Design Sprints.',
        impact: 'Faster alignment, better product framing, stronger UX culture.',
        lesson: 'The best workshops leave behind reusable language, decision records and shared product frames.',
      },
      {
        company: 'EDF / ENEDIS',
        scope: 'Selfcare & service journeys',
        problem: 'Complex user journeys across support, selfcare and operational services.',
        role: 'UX leadership, workshops, user journeys, product/tech collaboration.',
        impact: 'Clearer flows, better prioritization, smoother handoff to delivery teams.',
        lesson: 'Journey documentation is most useful when it turns ambiguity into delivery-ready decisions.',
      },
      {
        company: 'Teaching',
        scope: 'AI Product Building',
        problem: 'Students and professionals need to understand how to build with AI, not just use tools.',
        role: 'Designed and taught courses/workshops in GenAI, Product Design and AI Product Building.',
        impact: '1,500+ students trained across Bachelor, Master and MBA programs.',
        lesson: 'Teaching reveals where concepts are unclear, too abstract or missing an example.',
      },
    ],
    teachingTitle: 'Teaching forces clarity.',
    teachingIntro: 'Teaching AI product design requires turning complex concepts into progressive learning paths. This is the same skill needed to design world-class documentation.',
    teachingBullets: ['ECV Paris', 'EDC Paris Business School', 'Digital College', 'Ascencia Business School', 'École CONTE', 'Workshops in French and English', 'Bachelor, Master and MBA audiences'],
    principlesLabels: ['Definition', 'Why it matters'],
    principles: [
      ['Documentation First', 'Treat docs as part of the product experience, not a release afterthought.', 'It makes adoption, onboarding and support measurable design problems.'],
      ['Information Architecture', 'Organize concepts, pathways and references around user intent.', 'It helps readers find the right level of detail without getting lost.'],
      ['Progressive Disclosure', 'Reveal complexity in layers, from quick understanding to advanced implementation.', 'It supports beginners and experts in the same system.'],
      ['Learning by Doing', 'Use examples, workflows and decisions that turn reading into action.', 'It shortens the path from concept to product usage.'],
      ['Accessibility', 'Design documentation for different abilities, contexts, devices and reading modes.', 'It expands who can successfully adopt the product.'],
      ['Design Systems', 'Use reusable patterns for structure, navigation, states, examples and calls to action.', 'It keeps documentation coherent as the product scales.'],
      ['Knowledge Graphs', 'Connect tools, concepts, decisions and examples into a living system.', 'It turns documentation into product memory, not static pages.'],
    ],
    footerAria: 'Footer',
    email: 'Email',
  },
  FR: {
    heroTitle: <>Je conçois la documentation<br />comme un produit.</>,
    heroSubtitle: 'Je construis des systèmes de connaissances, de la documentation et des expériences d’apprentissage qui aident à comprendre, adopter et déployer les produits d’IA à grande échelle.',
    heroBadges: ['Créé avec Mistral Vibe', 'Paris', 'Disponible', 'Version 1.0'],
    proof: ['10+ ans de design produit', '1 500+ étudiants formés', '1 128 solutions d’IA documentées', '4 655+ contributions GitHub'],
    metadataTitle: 'Documentation de candidature',
    metadata: [
      ['Auteur', 'Tewfiq Ferahi'],
      ['Rôle', 'Designer Produit — Documentation'],
      ['Statut', 'Disponible'],
      ['Lieu', 'Paris'],
      ['Mise à jour', 'Juin 2026'],
      ['Créé avec', 'Mistral Vibe'],
      ['Temps de lecture', '8 min'],
    ],
    infoCallout: 'Ce site est volontairement conçu comme un produit de documentation plutôt qu’un portfolio traditionnel. Il montre mon approche de l’architecture de l’information, des expériences d’apprentissage et de l’adoption produit.',
    whyItems: [
      ['Information', 'La documentation est un produit', 'La documentation n’est pas seulement du contenu. Elle a des utilisateurs, des parcours, des points de friction, des métriques et des résultats.'],
      ['Conseil', 'La documentation accélère l’adoption', 'Une bonne documentation aide les utilisateurs à passer de la compréhension à l’action sans attendre l’assistance.'],
      ['Bonne pratique', 'Réduire la charge cognitive', 'Un système de documentation doit rendre les concepts complexes plus faciles à parcourir, comparer et réutiliser.'],
      ['Principe', 'Créer une compréhension partagée', 'Une excellente documentation aligne produit, ingénierie, assistance, clients et partenaires autour du même modèle mental.'],
    ],
    trackIntro: 'Ces chiffres ne sont pas des trophées. Ce sont les traces d’une pratique quotidienne à travers les modèles de langage, les prototypes, les déploiements, la documentation et le code.',
    trackGroups: [
      ['IA générative', ['39 057 conversations Claude', '3,5 M de tokens Claude', '1 430 jours ChatGPT']],
      ['Connaissance', ['1 128 solutions d’IA indexées', '1 000+ notes structurées', 'Veille technologique quotidienne']],
      ['Ingénierie', ['4 655+ contributions GitHub', '279 projets déployés', 'Développement assisté par IA']],
      ['Transmission', ['1 500+ étudiants formés', 'Licence, Master, MBA', 'Ateliers de construction de produits IA']],
    ],
    heatmapTitle: 'Carte de pratique quotidienne',
    heatmapCaption: 'Trace statique de contributions',
    heatmapAria: 'Carte d’activité statique de type GitHub',
    knowledgeIntro: 'Depuis 2023, je maintiens une base de connaissances structurée sur les outils, modèles, processus et modèles produit liés à l’IA. Elle nourrit mon enseignement, mon conseil, mes prototypes et mon travail de documentation.',
    workflowTitle: 'Processus',
    workflow: ['Rechercher', 'Classer', 'Comparer', 'Documenter', 'Transmettre', 'Prototyper', 'Améliorer'],
    knowledgeCards: ['Veille IA', 'Taxonomie', 'Évaluation d’outils', 'Processus de documentation', 'Supports pédagogiques', 'Décisions produit'],
    knowledgeCardBody: 'Une couche réutilisable du système de connaissances pour rechercher, comparer, apprendre et prendre des décisions produit.',
    experienceFields: [['problem', 'Problème'], ['role', 'Rôle'], ['impact', 'Impact'], ['lesson', 'Leçon apprise']],
    experiences: [
      {
        company: 'DINUM',
        scope: 'Systèmes de design du secteur public',
        problem: 'Plusieurs équipes et prestataires travaillent sur des services publics numériques complexes.',
        role: 'Design produit, gouvernance UX, alignement DSFR, accessibilité et opérations design.',
        impact: 'Parcours utilisateurs plus cohérents, décisions de design plus claires, meilleures pratiques partagées.',
        lesson: 'La documentation fonctionne lorsque gouvernance, accessibilité et contraintes de livraison sont conçues ensemble.',
      },
      {
        company: 'BNP Paribas',
        scope: 'Centre UX et sprints de design',
        problem: 'Grande organisation, cycles de décision lents, nombreuses parties prenantes.',
        role: 'Co-animation du Centre UX PACE, formation d’exécutifs, facilitation de sprints de design.',
        impact: 'Alignement plus rapide, meilleur cadrage produit, culture UX renforcée.',
        lesson: 'Les meilleurs ateliers laissent derrière eux un langage réutilisable, des traces de décision et des cadres produit partagés.',
      },
      {
        company: 'EDF / ENEDIS',
        scope: 'Autonomie utilisateur et parcours de service',
        problem: 'Parcours utilisateurs complexes entre assistance, autonomie utilisateur et services opérationnels.',
        role: 'Pilotage UX, ateliers, parcours utilisateurs, collaboration produit et technique.',
        impact: 'Flux plus clairs, priorisation plus nette, passage à la livraison plus fluide.',
        lesson: 'La documentation de parcours est utile lorsqu’elle transforme l’ambiguïté en décisions prêtes à livrer.',
      },
      {
        company: 'Transmission',
        scope: 'Construction de produits IA',
        problem: 'Étudiants et professionnels doivent comprendre comment construire avec l’IA, pas seulement utiliser des outils.',
        role: 'Conception et animation de cours et d’ateliers en IA générative, design produit et construction de produits IA.',
        impact: '1 500+ étudiants formés en Licence, Master et MBA.',
        lesson: 'Enseigner révèle où les concepts sont flous, trop abstraits ou privés d’exemples.',
      },
    ],
    teachingTitle: 'Enseigner force la clarté.',
    teachingIntro: 'Enseigner le design de produits IA demande de transformer des concepts complexes en parcours d’apprentissage progressifs. C’est la même compétence que celle nécessaire pour concevoir une documentation de niveau mondial.',
    teachingBullets: ['ECV Paris', 'EDC Paris Business School', 'Digital College', 'Ascencia Business School', 'École CONTE', 'Ateliers en français et en anglais', 'Publics Licence, Master et MBA'],
    principlesLabels: ['Définition', 'Pourquoi c’est important'],
    principles: [
      ['Documentation d’abord', 'Traiter la documentation comme une partie de l’expérience produit, pas comme une tâche après la sortie.', 'Cela transforme l’adoption, l’intégration et l’assistance en problèmes de design mesurables.'],
      ['Architecture de l’information', 'Organiser les concepts, parcours et références autour de l’intention utilisateur.', 'Cela aide les lecteurs à trouver le bon niveau de détail sans se perdre.'],
      ['Divulgation progressive', 'Révéler la complexité par couches, de la compréhension rapide à l’usage avancé.', 'Cela sert les débutants et les experts dans le même système.'],
      ['Apprendre en faisant', 'Utiliser des exemples, processus et décisions qui transforment la lecture en action.', 'Cela raccourcit le chemin entre le concept et l’usage produit.'],
      ['Accessibilité', 'Concevoir la documentation pour différentes capacités, contextes, appareils et modes de lecture.', 'Cela élargit le nombre de personnes capables d’adopter le produit avec succès.'],
      ['Systèmes de design', 'Utiliser des modèles réutilisables pour la structure, la navigation, les états, les exemples et les appels à l’action.', 'Cela garde la documentation cohérente lorsque le produit grandit.'],
      ['Graphes de connaissances', 'Relier outils, concepts, décisions et exemples dans un système vivant.', 'Cela transforme la documentation en mémoire produit, pas en pages statiques.'],
    ],
    footerAria: 'Pied de page',
    email: 'E-mail',
  },
};

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const root = window.document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('EN');
  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

function useLanguage() {
  return useContext(LanguageContext);
}

function useTheme() {
  return useContext(ThemeContext);
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const themes = ['light', 'system', 'dark'];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#overview" className="group flex min-w-0 items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
          <span className="grid h-7 w-7 place-items-center rounded-md border border-[var(--border-strong)] bg-[var(--surface)] text-xs font-bold text-[var(--text)]">
            TF
          </span>
          <span className="hidden truncate text-sm font-medium text-[var(--text)] sm:block">
            {t.docTitle}
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex rounded-md border border-[var(--border)] bg-[var(--surface)] p-0.5" aria-label={t.languageControl}>
            {['EN', 'FR'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLanguage(item)}
                className={cn(
                  'rounded px-2 py-1 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
                  language === item ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--text)]'
                )}
              >
                {languageLabels[language][item]}
              </button>
            ))}
          </div>

          <div className="hidden rounded-md border border-[var(--border)] bg-[var(--surface)] p-0.5 sm:flex" aria-label={t.themeControl}>
            {themes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTheme(item)}
                className={cn(
                  'rounded px-2 py-1 text-xs font-medium capitalize transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
                  theme === item ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--text)]'
                )}
              >
                {themeLabels[language][item]}
              </button>
            ))}
          </div>

          <a href="https://cal.com/TEWFIQ" className="rounded-md bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:px-4">
            {t.book}
          </a>
        </div>
      </div>
    </header>
  );
}

function SidebarNavigation() {
  const { language, t } = useLanguage();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-[var(--border)] lg:block">
      <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto px-5 py-6">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{t.navigation}</p>
        <nav className="space-y-1" aria-label={t.mainNavigation}>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block rounded-md px-3 py-2 text-sm text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {section.label[language]}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function OnThisPageRail() {
  const { language, t } = useLanguage();

  return (
    <aside className="hidden w-60 shrink-0 xl:block">
      <div className="sticky top-14 px-6 py-6">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{t.onThisPage}</p>
        <nav className="space-y-1 border-l border-[var(--border)] pl-3" aria-label={t.onThisPage}>
          {sections.slice(1).map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block truncate rounded px-2 py-1.5 text-xs text-[var(--muted)] transition hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {section.label[language]}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function SectionShell({ id, title, intro, children, tone = 'default' }) {
  const { language } = useLanguage();
  const section = sections.find((item) => item.id === id);

  return (
    <section id={id} className={cn('scroll-mt-20 border-t border-[var(--border)] py-12 lg:py-16', tone === 'muted' && 'bg-[var(--surface-subtle)]')}>
      <div className="max-w-[860px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">/{section?.slug[language] || id}</p>
          <h2 className="text-2xl font-semibold tracking-normal text-[var(--text)] sm:text-3xl">{title}</h2>
          {intro ? <p className="mt-4 max-w-[720px] text-base leading-7 text-[var(--muted)]">{intro}</p> : null}
        </div>
        {children}
        <SectionPager currentId={id} />
      </div>
    </section>
  );
}

function SectionPager({ currentId }) {
  const { language, t } = useLanguage();
  const index = sections.findIndex((section) => section.id === currentId);
  const previous = sections[index - 1];
  const next = sections[index + 1];

  if (!previous && !next) return null;

  return (
    <nav className="mt-10 grid gap-3 border-t border-[var(--border)] pt-5 sm:grid-cols-2" aria-label={t.sectionNavigation}>
      <div>
        {previous ? (
          <a href={`#${previous.id}`} className="group block rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{t.previous}</span>
            <span className="mt-1 block text-sm font-medium text-[var(--text)] group-hover:text-[var(--accent)]">{previous.label[language]}</span>
          </a>
        ) : null}
      </div>
      <div>
        {next ? (
          <a href={`#${next.id}`} className="group block rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:text-right">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{t.next}</span>
            <span className="mt-1 block text-sm font-medium text-[var(--text)] group-hover:text-[var(--accent)]">{next.label[language]}</span>
          </a>
        ) : null}
      </div>
    </nav>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]">
      {children}
    </span>
  );
}

function ButtonLink({ href, children, variant = 'primary' }) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
        variant === 'primary'
          ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]'
          : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]'
      )}
    >
      {children}
    </a>
  );
}

function HeroSection() {
  const { language, t } = useLanguage();
  const page = content[language];

  return (
    <section id="overview" className="scroll-mt-20 py-12 lg:py-16">
      <div className="max-w-[860px] px-4 sm:px-6 lg:px-8">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{t.role}</p>
        <h1 className="max-w-[720px] text-4xl font-semibold leading-[1.05] tracking-normal text-[var(--text)] sm:text-5xl lg:text-6xl">
          {page.heroTitle}
        </h1>
        <p className="mt-6 max-w-[720px] text-lg leading-8 text-[var(--muted)]">
          {page.heroSubtitle}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {page.heroBadges.map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </div>

        <dl className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {page.proof.map((item) => (
            <div key={item} className="border-l border-[var(--border-strong)] pl-3">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{language === 'EN' ? 'Proof' : t.proof}</dt>
              <dd className="mt-1 text-sm font-medium leading-5 text-[var(--text)]">{item}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="https://cal.com/TEWFIQ">{t.book}</ButtonLink>
          <ButtonLink href="#" variant="secondary">{t.resume}</ButtonLink>
        </div>

        <div className="mt-10 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] px-5 py-4">
            <h2 className="text-sm font-semibold text-[var(--text)]">{page.metadataTitle}</h2>
          </div>
          <dl className="grid gap-px bg-[var(--border)] text-sm sm:grid-cols-2">
            {page.metadata.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[120px_1fr] gap-3 bg-[var(--surface)] px-5 py-3">
                <dt className="text-[var(--muted)]">{label}</dt>
                <dd className="font-medium text-[var(--text)]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-5 rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] px-5 py-4">
          <p className="text-sm leading-6 text-[var(--text)]">
            {page.infoCallout}
          </p>
        </div>

        <SectionPager currentId="overview" />
      </div>
    </section>
  );
}

function WhyDocumentationSection() {
  const { language } = useLanguage();
  const page = content[language];

  return (
    <SectionShell id="why-documentation" title={sections[1].label[language]}>
      <div className="space-y-4">
        {page.whyItems.map(([label, title, body]) => (
          <article key={title} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{label}</p>
            <h3 className="mt-2 text-lg font-semibold text-[var(--text)]">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{body}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function TrackRecordSection() {
  const { language } = useLanguage();
  const page = content[language];

  return (
    <SectionShell
      id="track-record"
      title={sections[2].label[language]}
      intro={page.trackIntro}
      tone="muted"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {page.trackGroups.map(([title, items]) => (
          <article key={title} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h3 className="text-sm font-semibold text-[var(--text)]">{title}</h3>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <Heatmap />
    </SectionShell>
  );
}

function Heatmap() {
  const { language } = useLanguage();
  const page = content[language];
  const levels = [0, 1, 2, 3, 2, 1, 0, 3, 4, 2, 1, 0, 2, 3, 1, 4, 2, 0, 1, 3, 2, 4, 1, 0, 2, 3, 2, 1, 4, 3, 0, 2, 1, 3, 4, 2, 0, 1, 3, 2, 4, 3, 1, 0, 2, 3, 4, 1, 2, 0, 3, 2, 4, 3, 1, 2, 0, 3, 4, 1, 2, 3, 0, 4, 2, 1, 3, 4, 2, 0, 1, 3, 2, 4, 1, 0, 3, 2, 4, 3, 1, 2, 0, 4];

  return (
    <div className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-[var(--text)]">{page.heatmapTitle}</h3>
        <p className="text-xs text-[var(--muted)]">{page.heatmapCaption}</p>
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-1" aria-label={page.heatmapAria}>
        {levels.map((level, index) => (
          <span
            key={`${level}-${index}`}
            className={cn(
              'h-3 w-3 rounded-[3px] border border-[var(--border)]',
              level === 0 && 'bg-[var(--surface-subtle)]',
              level === 1 && 'bg-[#fee5d8]',
              level === 2 && 'bg-[#ffba87]',
              level === 3 && 'bg-[#ff7a3d]',
              level === 4 && 'bg-[#bd3f16]'
            )}
          />
        ))}
      </div>
    </div>
  );
}

function LivingKnowledgeSystemSection() {
  const { language } = useLanguage();
  const page = content[language];

  return (
    <SectionShell
      id="knowledge"
      title={sections[3].label[language]}
      intro={page.knowledgeIntro}
    >
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h3 className="mb-5 text-sm font-semibold text-[var(--text)]">{page.workflowTitle}</h3>
        <ol className="grid gap-3 md:grid-cols-7">
          {page.workflow.map((step, index) => (
            <li key={step} className="relative rounded-md border border-[var(--border)] bg-[var(--surface-subtle)] p-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{String(index + 1).padStart(2, '0')}</span>
              <p className="mt-2 text-sm font-medium text-[var(--text)]">{step}</p>
              {index < page.workflow.length - 1 ? <span className="absolute -right-2 top-1/2 hidden text-[var(--muted)] md:block">↓</span> : null}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {page.knowledgeCards.map((card) => (
          <article key={card} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h3 className="text-sm font-semibold text-[var(--text)]">{card}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              {page.knowledgeCardBody}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function SelectedExperienceSection() {
  const { language } = useLanguage();
  const page = content[language];

  return (
    <SectionShell id="experience" title={sections[4].label[language]}>
      <div className="space-y-5">
        {page.experiences.map((experience) => (
          <article key={experience.company} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="flex flex-col gap-1 border-b border-[var(--border)] pb-4 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-semibold text-[var(--text)]">{experience.company}</h3>
              <p className="text-sm text-[var(--muted)]">{experience.scope}</p>
            </div>
            <dl className="mt-5 grid gap-5 md:grid-cols-2">
              {page.experienceFields.map(([key, label]) => (
                <div key={key}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-[var(--muted)]">{experience[key]}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function TeachingSection() {
  const { language } = useLanguage();
  const page = content[language];

  return (
    <SectionShell
      id="teaching"
      title={page.teachingTitle}
      intro={page.teachingIntro}
      tone="muted"
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {page.teachingBullets.map((item) => (
          <li key={item} className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

function DocumentationPrinciplesSection() {
  const { language } = useLanguage();
  const page = content[language];

  return (
    <SectionShell id="principles" title={sections[6].label[language]}>
      <div className="grid gap-4 md:grid-cols-2">
        {page.principles.map(([title, definition, matters]) => (
          <article key={title} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h3 className="text-base font-semibold text-[var(--text)]">{title}</h3>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{page.principlesLabels[0]}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{definition}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{page.principlesLabels[1]}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{matters}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function Footer() {
  const { language, t } = useLanguage();
  const page = content[language];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-[860px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">Tewfiq Ferahi</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{language === 'EN' ? 'Product Designer — Documentation' : t.footerRole}</p>
            <p className="mt-4 text-xs text-[var(--muted)]">{language === 'EN' ? 'Built with Mistral Vibe, Next.js and Tailwind' : t.builtWithFooter}</p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm" aria-label={page.footerAria}>
            <a className="text-[var(--accent)] hover:text-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]" href="https://cal.com/TEWFIQ">{t.book}</a>
            <a className="text-[var(--muted)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]" href="#">LinkedIn</a>
            <a className="text-[var(--muted)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]" href="#">GitHub</a>
            <a className="text-[var(--muted)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]" href="mailto:hello@tewfiq.com">{page.email}</a>
          </nav>
        </div>
      </div>
      <div className="grid h-2 grid-cols-4" aria-hidden="true">
        <span className="bg-[#fff4d6]" />
        <span className="bg-[#ffd45a]" />
        <span className="bg-[#ff8a3d]" />
        <span className="bg-[#c7361d]" />
      </div>
    </footer>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
          <Header />
          <div className="mx-auto flex max-w-[1440px]">
            <SidebarNavigation />
            <main className="min-w-0 flex-1">
              <HeroSection />
              <WhyDocumentationSection />
              <TrackRecordSection />
              <LivingKnowledgeSystemSection />
              <SelectedExperienceSection />
              <TeachingSection />
              <DocumentationPrinciplesSection />
              <Footer />
            </main>
            <OnThisPageRail />
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
