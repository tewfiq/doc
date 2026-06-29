// --- Imports ---
import { useState, useEffect, createContext, useContext } from 'react';

// --- Contexts ---
const ThemeContext = createContext();
const LanguageContext = createContext();

// --- Theme Provider ---
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // Default to light
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Set CSS variables directly for reliability
    const bg = theme === 'dark' ? '#111111' : '#ffffff';
    const bgSecondary = theme === 'dark' ? '#171717' : '#f8f9fa';
    const text = theme === 'dark' ? '#ffffff' : '#111827';
    const textSecondary = theme === 'dark' ? '#a0a0a0' : '#6b7280';
    const border = theme === 'dark' ? '#374151' : '#e5e7eb';
    
    root.style.setProperty('--bg', bg);
    root.style.setProperty('--bg-secondary', bgSecondary);
    root.style.setProperty('--text', text);
    root.style.setProperty('--text-secondary', textSecondary);
    root.style.setProperty('--border', border);
    root.style.setProperty('--accent', '#ff6b35');
    root.style.setProperty('--accent-hover', '#e55a2b');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// --- Language Provider ---
function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('EN');
  const toggleLanguage = () => setLanguage(prev => prev === 'EN' ? 'FR' : 'EN');
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// --- Components ---

// Header
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const themeLabel = theme === 'light' ? 'Dark' : 'Light';
  
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-[var(--text)]">TF</span>
          </div>
          <nav className="hidden lg:flex items-center space-x-8">
            {['Overview', 'Track Record', 'Knowledge', 'Experience', 'Teaching', 'Philosophy', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} 
                 className="text-sm text-[var(--text-secondary)] hover:text-[#ff6b35] transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button onClick={toggleLanguage} 
                    className="text-sm text-[var(--text-secondary)] hover:text-[#ff6b35]">
              {language}
            </button>
            <button onClick={toggleTheme} 
                    className="text-sm text-[var(--text-secondary)] hover:text-[#ff6b35]">
              {themeLabel}
            </button>
            <a href="https://cal.com/TEWFIQ" 
               className="px-4 py-2 bg-[#ff6b35] text-white text-sm font-medium rounded-md hover:bg-[#e55a2b] transition-colors">
              {language === 'EN' ? 'Book a call' : 'Réserver un échange'}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

// Sidebar Navigation
function SidebarNavigation() {
  const { language } = useContext(LanguageContext);
  const sections = [
    { id: 'overview', label: { EN: 'Overview', FR: 'Aperçu' } },
    { id: 'why-documentation', label: { EN: 'Why Documentation', FR: 'Pourquoi la documentation' } },
    { id: 'track-record', label: { EN: 'Track Record', FR: 'Une pratique mesurée' } },
    { id: 'knowledge', label: { EN: 'Living Knowledge System', FR: 'Système de connaissances' } },
    { id: 'experience', label: { EN: 'Selected Experience', FR: 'Expériences' } },
    { id: 'principles', label: { EN: 'Documentation Principles', FR: 'Principes' } },
    { id: 'teaching', label: { EN: 'Teaching', FR: 'Transmission' } },
  ];

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-[var(--border)]">
      <div className="p-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <h2 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">
          {language === 'EN' ? 'Navigation' : 'Navigation'}
        </h2>
        <nav className="space-y-2">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} 
               className="block py-2 px-3 text-sm text-[var(--text-secondary)] rounded-md hover:bg-[var(--bg-secondary)] hover:text-[#ff6b35] transition-colors">
              {section.label[language]}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// On This Page Rail
function OnThisPageRail() {
  const { language } = useContext(LanguageContext);
  const sections = [
    { id: 'why-documentation', label: { EN: 'Why Documentation', FR: 'Pourquoi la documentation' } },
    { id: 'track-record', label: { EN: 'Track Record', FR: 'Une pratique mesurée' } },
    { id: 'knowledge', label: { EN: 'Living Knowledge System', FR: 'Système de connaissances' } },
    { id: 'experience', label: { EN: 'Selected Experience', FR: 'Expériences' } },
    { id: 'principles', label: { EN: 'Documentation Principles', FR: 'Principes' } },
    { id: 'teaching', label: { EN: 'Teaching', FR: 'Transmission' } },
  ];

  return (
    <aside className="hidden xl:block w-56 flex-shrink-0">
      <div className="p-6 sticky top-16">
        <h2 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">
          {language === 'EN' ? 'On this page' : 'Sur cette page'}
        </h2>
        <nav className="space-y-2">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} 
               className="block py-1 px-3 text-sm text-[var(--text-secondary)] rounded-md hover:bg-[var(--bg-secondary)] hover:text-[#ff6b35] transition-colors truncate">
              {section.label[language]}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// Hero Section
function HeroSection() {
  const { language } = useContext(LanguageContext);
  return (
    <section id="overview" className="py-16 lg:py-24">
      <div className="max-w-[760px] mx-auto">
        <div className="text-center">
          <p className="text-sm font-medium text-[#ff6b35] mb-6">
            {language === 'EN' ? 'Product Designer — Documentation' : 'Designer Produit — Documentation'}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)] leading-tight mb-6">
            {language === 'EN' ? 'I design documentation as a product.' : 'Je conçois la documentation comme un produit.'}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-8">
            {language === 'EN' ? (
              <>
                Clear.<br />Structured.<br />Searchable.<br />Useful.<br /><br />
                Documentation is one of the most important product experiences.
              </>
            ) : (
              <>
                Claire.<br />Structurée.<br />Actionnable.<br /><br />
                La documentation est une expérience produit à part entière.
              </>
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="https://cal.com/TEWFIQ" 
               className="px-4 py-2 bg-[#ff6b35] text-white text-sm font-medium rounded-md hover:bg-[#e55a2b] transition-colors">
              {language === 'EN' ? 'Book a call' : 'Réserver un échange'}
            </a>
            <a href="#" 
               className="px-4 py-2 border border-[var(--border)] text-[var(--text)] text-sm font-medium rounded-md hover:bg-[var(--bg-secondary)] transition-colors">
              {language === 'EN' ? 'Download Resume' : 'Télécharger le CV'}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {['Built with Mistral Vibe', 'Paris', 'Available', 'Version 1.0'].map((badge, i) => (
              <span key={i} className="px-3 py-1 bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)] rounded-full border border-[var(--border)]">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Why Documentation Section
function WhyDocumentationSection() {
  const { language } = useContext(LanguageContext);
  const points = [
    { title: { EN: 'Documentation is Product', FR: 'La documentation est un produit' }, 
      desc: { EN: 'It is not just content. It is a product with users, goals, and metrics.', 
              FR: 'Ce n’est pas juste du contenu. C’est un produit avec des utilisateurs, des objectifs et des métriques.' } },
    { title: { EN: 'Documentation is Onboarding', FR: 'La documentation est l\'onboarding' }, 
      desc: { EN: 'It is the first experience users have with your system.', 
              FR: 'C’est la première expérience que les utilisateurs ont avec votre système.' } },
    { title: { EN: 'Documentation is Adoption', FR: 'La documentation favorise l\'adoption' }, 
      desc: { EN: 'Clear, accessible docs drive usage and reduce support overhead.', 
              FR: 'Une documentation claire et accessible favorise l’usage et réduit le support.' } },
    { title: { EN: 'Documentation is Shared Understanding', FR: 'La documentation crée une compréhension partagée' }, 
      desc: { EN: 'It aligns teams, stakeholders, and users around a single source of truth.', 
              FR: 'Elle aligne les équipes, les parties prenantes et les utilisateurs autour d’une seule source de vérité.' } },
  ];

  return (
    <section id="why-documentation" className="py-16 lg:py-24">
      <div className="max-w-[760px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-[var(--text)] mb-8">
          {language === 'EN' ? 'Why Documentation' : 'Pourquoi la documentation'}
        </h2>
        <div className="space-y-6">
          {points.map((p, i) => (
            <div key={i} className="p-6 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{p.title[language]}</h3>
              <p className="text-[var(--text-secondary)]">{p.desc[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Track Record Section
function TrackRecordSection() {
  const { language } = useContext(LanguageContext);
  const metrics = [
    { value: '1,128', label: { EN: 'AI solutions indexed', FR: 'Solutions IA indexées' } },
    { value: '39,057', label: { EN: 'Claude conversations', FR: 'Conversations Claude' } },
    { value: '3.5M', label: { EN: 'Claude tokens', FR: 'Tokens Claude' } },
    { value: '1,430', label: { EN: 'ChatGPT days', FR: 'Jours ChatGPT' } },
    { value: '4,655', label: { EN: 'GitHub contributions', FR: 'Contributions GitHub' } },
    { value: '1,500+', label: { EN: 'Students', FR: 'Étudiants' } },
    { value: '279', label: { EN: 'Deployed projects', FR: 'Projets déployés' } },
  ];

  return (
    <section id="track-record" className="py-16 lg:py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-[760px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-[var(--text)] mb-4">
          {language === 'EN' ? 'Track Record' : 'Une pratique mesurée'}
        </h2>
        <p className="text-[var(--text-secondary)] mb-12">
          {language === 'EN' ? 'These metrics represent years of daily practice.' : 'Ces métriques représentent des années de pratique quotidienne.'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="p-6 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
              <div className="text-3xl font-bold text-[#ff6b35] mb-2">{m.value}</div>
              <div className="text-sm text-[var(--text-secondary)]">{m.label[language]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Living Knowledge System Section
function LivingKnowledgeSystemSection() {
  const { language } = useContext(LanguageContext);
  const items = [
    { title: { EN: 'Notion Knowledge Base', FR: 'Base de connaissances Notion' }, 
      desc: { EN: 'Centralized, linked, and always up-to-date.', FR: 'Centralisée, liée et toujours à jour.' } },
    { title: { EN: 'AI Watch', FR: 'Veille IA' }, 
      desc: { EN: 'Curated insights on AI trends and tools.', FR: 'Analyses sélectionnées sur les tendances et outils IA.' } },
    { title: { EN: 'Taxonomy & Tagging', FR: 'Taxonomie et balisage' }, 
      desc: { EN: 'Structured metadata for easy discovery.', FR: 'Métadonnées structurées pour une découverte facile.' } },
    { title: { EN: 'Documentation Workflow', FR: 'Processus de documentation' }, 
      desc: { EN: 'From draft to publish, with reviews and versioning.', FR: 'Du brouillon à la publication, avec révisions et versionnage.' } },
  ];

  return (
    <section id="knowledge" className="py-16 lg:py-24">
      <div className="max-w-[760px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-[var(--text)] mb-8">
          {language === 'EN' ? 'Living Knowledge System' : 'Système de connaissances'}
        </h2>
        <div className="space-y-6">
          {items.map((item, i) => (
            <div key={i} className="p-6 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{item.title[language]}</h3>
              <p className="text-[var(--text-secondary)]">{item.desc[language]}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 p-6 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
          <h3 className="text-lg font-semibold text-[var(--text)] mb-4">
            {language === 'EN' ? 'How This System Feeds My Work' : 'Comment ce système alimente mon travail'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Teaching', 'Consulting', 'Prototypes', 'Documentation'].map((item, i) => (
              <div key={i} className="p-4 bg-[var(--bg)] rounded-md border border-[var(--border)] text-center">
                <span className="text-[var(--text)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Selected Experience Section
function SelectedExperienceSection() {
  const { language } = useContext(LanguageContext);
  const experiences = [
    {
      company: 'DINUM', role: { EN: 'Product Designer', FR: 'Designer Produit' },
      problem: { EN: 'Improving public sector digital services.', FR: 'Amélioration des services numériques du secteur public.' },
      impact: { EN: 'Reduced user friction by 40%.', FR: 'Réduction de 40% des frictions utilisateurs.' },
      lesson: { EN: 'Designing for accessibility is non-negotiable.', FR: 'Concevoir pour l’accessibilité n’est pas négociable.' },
    },
    {
      company: 'BNP Paribas', role: { EN: 'UX Lead', FR: 'Responsable UX' },
      problem: { EN: 'Legacy system modernization.', FR: 'Modernisation d’un système hérité.' },
      impact: { EN: 'Increased adoption by 25%.', FR: 'Augmentation de 25% de l’adoption.' },
      lesson: { EN: 'Change management is as important as the design itself.', FR: 'La gestion du changement est aussi importante que le design lui-même.' },
    },
  ];

  return (
    <section id="experience" className="py-16 lg:py-24">
      <div className="max-w-[760px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-[var(--text)] mb-8">
          {language === 'EN' ? 'Selected Experience' : 'Expériences'}
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <div key={i} className="p-6 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-[var(--text)]">{exp.company}</h3>
                <span className="text-sm text-[var(--text-secondary)]">{exp.role[language]}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-[var(--text-secondary)] mb-1">Problem</p>
                  <p className="text-[var(--text)]">{exp.problem[language]}</p>
                </div>
                <div>
                  <p className="font-medium text-[var(--text-secondary)] mb-1">Impact</p>
                  <p className="text-[var(--text)]">{exp.impact[language]}</p>
                </div>
                <div>
                  <p className="font-medium text-[var(--text-secondary)] mb-1">Lesson</p>
                  <p className="text-[var(--text)]">{exp.lesson[language]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Documentation Principles Section
function DocumentationPrinciplesSection() {
  const { language } = useContext(LanguageContext);
  const principles = [
    { title: { EN: 'Documentation First', FR: 'Documentation d’abord' }, 
      desc: { EN: 'Documentation is not an afterthought. It is the foundation.', 
              FR: 'La documentation n’est pas une réflexion après coup. C’est la base.' } },
    { title: { EN: 'Progressive Disclosure', FR: 'Divulgation progressive' }, 
      desc: { EN: 'Reveal complexity only when needed.', 
              FR: 'Révéler la complexité uniquement quand nécessaire.' } },
    { title: { EN: 'Information Architecture', FR: 'Architecture de l’information' }, 
      desc: { EN: 'Structure information for findability.', 
              FR: 'Structurer l’information pour qu’elle soit trouvable.' } },
    { title: { EN: 'Learning by Doing', FR: 'Apprendre en faisant' }, 
      desc: { EN: 'Interactive examples over static text.', 
              FR: 'Des exemples interactifs plutôt que du texte statique.' } },
  ];

  return (
    <section id="principles" className="py-16 lg:py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-[760px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-[var(--text)] mb-8">
          {language === 'EN' ? 'Documentation Principles' : 'Principes'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {principles.map((p, i) => (
            <div key={i} className="p-6 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{p.title[language]}</h3>
              <p className="text-[var(--text-secondary)]">{p.desc[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Teaching Section
function TeachingSection() {
  const { language } = useContext(LanguageContext);
  const categories = [
    { title: { EN: 'Schools', FR: 'Écoles' }, items: ['Sorbonne', 'HEC', '42'] },
    { title: { EN: 'Workshops', FR: 'Ateliers' }, items: ['AI for Designers', 'Design Systems'] },
    { title: { EN: 'Conferences', FR: 'Conférences' }, items: ['Paris Web', 'DotAI'] },
    { title: { EN: 'MBA', FR: 'MBA' }, items: ['Digital Transformation'] },
  ];

  return (
    <section id="teaching" className="py-16 lg:py-24">
      <div className="max-w-[760px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-[var(--text)] mb-8">
          {language === 'EN' ? 'Teaching' : 'Transmission'}
        </h2>
        <p className="text-[var(--text-secondary)] mb-12">
          {language === 'EN' ? 'Focus on helping people understand AI.' : 'Axé sur l’aide à la compréhension de l’IA.'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="p-6 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--text)] mb-4">{cat.title[language]}</h3>
              <ul className="space-y-2">
                {cat.items.map((item, j) => (
                  <li key={j} className="text-[var(--text-secondary)]">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const { language } = useContext(LanguageContext);
  return (
    <footer className="py-16 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
      <div className="max-w-[760px] mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-[var(--text)] mb-4">
          {language === 'EN' ? 'Let’s build the future of documentation.' : 'Construisons ensemble l’avenir de la documentation.'}
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a href="https://cal.com/TEWFIQ" 
             className="px-4 py-2 bg-[#ff6b35] text-white text-sm font-medium rounded-md hover:bg-[#e55a2b] transition-colors">
            {language === 'EN' ? 'Book a call' : 'Réserver un échange'}
          </a>
          <a href="#" 
             className="px-4 py-2 border border-[var(--border)] text-[var(--text)] text-sm font-medium rounded-md hover:bg-[var(--bg)] transition-colors">
            {language === 'EN' ? 'Download Resume' : 'Télécharger le CV'}
          </a>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-sm text-[var(--text-secondary)]">
          <div className="flex space-x-4">
            <span>Built with Mistral Vibe, Next.js, Tailwind</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#ff6b35]">LinkedIn</a>
            <a href="#" className="hover:text-[#ff6b35]">GitHub</a>
            <a href="#" className="hover:text-[#ff6b35]">Email</a>
          </div>
        </div>
        <div className="mt-8">
          <svg width="100" height="20" viewBox="0 0 100 20" className="mx-auto text-[#ff6b35] opacity-50">
            <rect x="10" y="10" width="80" height="10" fill="currentColor" />
          </svg>
          <p className="text-xs text-[var(--text-secondary)] mt-2">
            {language === 'EN' ? 'A subtle nod to Mistral.' : 'Un clin d’œil subtil à Mistral.'}
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
          <Header />
          <div className="flex">
            <SidebarNavigation />
            <main className="flex-1">
              <HeroSection />
              <WhyDocumentationSection />
              <TrackRecordSection />
              <LivingKnowledgeSystemSection />
              <SelectedExperienceSection />
              <DocumentationPrinciplesSection />
              <TeachingSection />
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