import Link from 'next/link';
import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  buildSearchIndex,
  defaultLanguage,
  experienceCards,
  getPrevNext,
  getRouteByKey,
  interventionImages,
  knowledgeCards,
  labels,
  languages,
  metrics,
  navGroups,
  pages,
  principles,
  proofBadges,
  routes,
  shared,
  trackRecordScreenshots,
  workflowSteps,
} from '../lib/docsContent';

const LanguageContext = createContext(null);
const ThemeContext = createContext(null);

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function useLanguage() {
  return useContext(LanguageContext);
}

function useTheme() {
  return useContext(ThemeContext);
}

const homeSlides = [
  {
    id: 'knowledge',
    src: '/images/asset 2.webp',
    alt: 'Base de connaissances sur les solutions IA',
    caption: {
      FR: 'Knowledge Studio \u00b7 1 128 solutions IA class\u00e9es, \u00e9valu\u00e9es et document\u00e9es.',
      EN: 'Knowledge Studio \u00b7 1,128 AI solutions classified, evaluated and documented.',
    },
  },
  {
    id: 'teaching',
    src: '/images/education/MBA Gen AI.webp',
    alt: 'Atelier de formation IA produit',
    caption: {
      FR: 'Transmission \u00b7 transformer des concepts IA en parcours d\u2019apprentissage.',
      EN: 'Teaching \u00b7 turning AI concepts into learning paths.',
    },
  },
  {
    id: 'dinum',
    src: '/images/dimum/La Dinum.webp',
    alt: 'Contexte DINUM',
    caption: {
      FR: 'Service public \u00b7 gouvernance UX, DSFR et accessibilit\u00e9 \u00e0 l\u2019\u00e9chelle.',
      EN: 'Public sector \u00b7 UX governance, DSFR and accessibility at scale.',
    },
  },
  {
    id: 'bnp',
    src: '/images/bnpp/BNP Paribas Design Sprint 2.0.webp',
    alt: 'Design Sprint BNP Paribas',
    caption: {
      FR: 'Enterprise \u00b7 Design Sprints, UX Center et d\u00e9cision produit.',
      EN: 'Enterprise \u00b7 Design Sprints, UX Center and product decisions.',
    },
  },
  {
    id: 'github',
    src: '/images/asset 3.webp',
    alt: 'Activit\u00e9 de pratique et de documentation',
    caption: {
      FR: 'Ing\u00e9nierie \u00b7 4 655+ contributions, prototypes et d\u00e9ploiements.',
      EN: 'Engineering \u00b7 4,655+ contributions, prototypes and deployments.',
    },
  },
];

const experienceCoverMap = {
  '/experience/dinum': '/images/dimum/La Dinum.webp',
  '/experience/bnp-paribas': '/images/bnpp/BNP Paribas Design Sprint 2.0.webp',
  '/experience/education': '/images/education/MBA Gen AI.webp',
};

const gradientCoverMap = {
  editorial: '/gradients/ffflux.svg',
  'knowledge-graph': '/gradients/ffflux (1).svg',
  'public-sector': '/gradients/ffflux (2).svg',
  'orange-grid': '/gradients/ffflux (3).svg',
  'dark-code': '/gradients/ffflux (3).svg',
};

const pageCoverMap = {
  '/getting-started': { image: '/covers/cover-02.webp' },
  '/philosophy': { image: '/covers/cover-01.webp' },
  '/documentation-principles': { image: '/covers/cover-07.webp' },
  '/foundations': { image: '/covers/cover-05.webp' },
  '/tokens': { image: '/covers/cover-08.webp' },
  '/do-dont': { image: '/covers/cover-03.webp' },
  '/patterns': { image: '/covers/cover-03.webp' },
  '/track-record': { image: '/covers/cover-06.webp' },
  '/knowledge-system': { image: '/covers/cover-07.webp' },
  '/primitives': { image: '/covers/cover-08.webp' },
  '/experience': { image: '/covers/cover-06.webp' },
  '/resume': { image: '/covers/cover-04.webp' },
  '/contact': { image: '/covers/cover-02.webp' },
  '/experience/dinum': { image: experienceCoverMap['/experience/dinum'] },
  '/experience/bnp-paribas': { image: experienceCoverMap['/experience/bnp-paribas'] },
  '/experience/education': { image: experienceCoverMap['/experience/education'] },
};

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const media = typeof window !== 'undefined' && typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const applyTheme = () => {
      const resolved = theme === 'system' ? (media?.matches ? 'dark' : 'light') : theme;
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(resolved);
      document.documentElement.style.colorScheme = resolved;
    };

    const onChange = () => applyTheme();
    applyTheme();
    media?.addEventListener?.('change', onChange);
    media?.addListener?.(onChange);
    return () => {
      media?.removeEventListener?.('change', onChange);
      media?.removeListener?.(onChange);
    };
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(defaultLanguage);
  const value = useMemo(() => ({ language, setLanguage, t: labels[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export default function DocsPage({ pageKey }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppShell pageKey={pageKey} />
      </LanguageProvider>
    </ThemeProvider>
  );
}

function AppShell({ pageKey }) {
  const { language } = useLanguage();
  const page = pages[pageKey] || pages.home;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [panelsOpen, setPanelsOpen] = useState(true);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === 'Escape') {
        setMobileNavOpen(false);
        setSearchOpen(false);
        setPanelsOpen(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header
        onMenu={() => setMobileNavOpen((value) => !value)}
        onSearch={() => setSearchOpen(true)}
      />
      <div
        className={cn(
          'mx-auto w-full max-w-[1440px] xl:grid xl:gap-x-8',
          panelsOpen ? 'xl:grid-cols-[260px_minmax(0,900px)_220px]' : 'xl:grid-cols-[0px_minmax(0,1fr)_0px]'
        )}
      >
        {mobileNavOpen ? <button type="button" aria-label="Close navigation" className="fixed inset-0 z-30 bg-black/25 lg:hidden" onClick={() => setMobileNavOpen(false)} /> : null}
        <Sidebar currentKey={pageKey} mobileOpen={mobileNavOpen} panelsOpen={panelsOpen} onNavigate={() => setMobileNavOpen(false)} onTogglePanels={() => setPanelsOpen((value) => !value)} />
        <main className={cn('min-w-0 px-4 py-14 sm:px-6 lg:px-8 xl:py-14', panelsOpen ? 'xl:pl-10 xl:pr-8' : 'xl:pl-12 xl:pr-12')}>
          <div className="mx-auto max-w-[900px]">
            <Breadcrumbs pageKey={pageKey} />
            <PageRenderer pageKey={pageKey} page={page} />
            <PreviousNext pageKey={pageKey} />
          </div>
        </main>
        <RightToc sections={page.sections || []} panelsOpen={panelsOpen} />
      </div>
      {!panelsOpen && (
        <button
          type="button"
          onClick={() => setPanelsOpen(true)}
          className="fixed bottom-6 left-6 z-50 hidden rounded-full border border-[var(--border)] bg-[var(--surface)] p-2.5 text-[var(--muted)] shadow-lg transition hover:border-[var(--accent-border)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] xl:grid xl:place-items-center"
          aria-label={language === 'FR' ? 'Ouvrir les panneaux' : 'Expand panels'}
        >
          <SidebarExpandIcon />
        </button>
      )}
      <Footer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} language={language} />
    </div>
  );
}

function Header({ onMenu, onSearch }) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2.5">
          <button
            type="button"
            onClick={onMenu}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] lg:hidden"
            aria-label={t.navigation}
          >
            <MenuIcon />
          </button>
          <Link href="/" className="flex min-w-0 items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[10px] font-semibold text-[var(--accent)]">
              TF
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-sm font-semibold leading-5 text-[var(--text)]">Knowledge Engineering</span>
            </span>
          </Link>
        </div>

        <div className="mx-auto w-full max-w-[340px]">
          <button
            type="button"
            onClick={onSearch}
            className="inline-flex w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--muted)] transition hover:border-[var(--accent-border)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            aria-label={t.openSearch}
          >
            <SearchIcon />
            <span className="flex-1 truncate text-left text-xs">{language === 'FR' ? 'Rechercher…' : 'Search…'}</span>
            <kbd className="hidden rounded border border-[var(--border)] bg-[var(--bg)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--muted)] sm:inline">⌘K</kbd>
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <a
            href={shared.ctaUrl}
            className="hidden shrink-0 whitespace-nowrap rounded-md bg-[var(--accent)] px-2.5 py-1.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:inline-flex"
          >
            {t.book}
          </a>
        </div>
      </div>
    </header>
  );
}

function LanguageToggle({ language, setLanguage }) {
  const { t } = useLanguage();
  const next = language === 'FR' ? 'EN' : 'FR';
  return (
    <button
      type="button"
      onClick={() => setLanguage(next)}
      className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[11px] font-semibold text-[var(--muted)] transition hover:border-[var(--accent-border)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      aria-label={`${t.language}: ${next}`}
    >
      {language}
    </button>
  );
}

function ThemeToggle({ theme, setTheme }) {
  const { t } = useLanguage();
  const cycle = { light: 'dark', dark: 'system', system: 'light' };
  const next = cycle[theme] || 'light';
  const icons = {
    light: <SunIcon />,
    dark: <MoonIcon />,
    system: <MonitorIcon />,
  };
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition hover:border-[var(--accent-border)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      aria-label={`${t.theme}: ${t[theme]}`}
    >
      {icons[theme]}
    </button>
  );
}

function Sidebar({ currentKey, mobileOpen, panelsOpen, onNavigate, onTogglePanels }) {
  const { language, t } = useLanguage();
  return (
    <aside
      className={cn(
        'fixed inset-y-14 left-0 z-40 w-[260px] overflow-y-auto border-r border-[var(--border)] bg-[var(--bg)] px-4 py-5 transition-[transform,opacity] duration-200 lg:sticky lg:block lg:h-[calc(100dvh-3.5rem)] lg:px-5 xl:top-14 xl:w-[260px]',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        panelsOpen ? 'xl:translate-x-0 xl:opacity-100 xl:pointer-events-auto' : 'xl:-translate-x-full xl:opacity-0 xl:pointer-events-none'
      )}
    >
      <div className="mb-5 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-[var(--text)]">{labels[language].sidebarTitle}</p>
          <p className="text-sm text-[var(--muted)]">{labels[language].sidebarSubtitle}</p>
        </div>
        <button
          type="button"
          onClick={onTogglePanels}
          className="hidden shrink-0 rounded-md p-1.5 text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] xl:grid xl:place-items-center"
          aria-label={language === 'FR' ? 'Rétracter les panneaux' : 'Collapse panels'}
        >
          <SidebarCollapseIcon />
        </button>
      </div>
      <nav className="space-y-6" aria-label={t.navigation}>
        {navGroups.map((group) => (
          <div key={group.title[language]}>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{group.title[language]}</p>
            <div className="space-y-0.5">
              {group.items.map((key) => {
                const route = getRouteByKey(key);
                if (!route) return null;
                const active = key === currentKey;
                return (
                  <Link
                    key={key}
                    href={route.path}
                    onClick={onNavigate}
                    className={cn(
                      'group flex items-center gap-2 rounded-md px-3 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
                      active ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]'
                    )}
                  >
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-full transition',
                        active ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)] group-hover:bg-[var(--accent)]'
                      )}
                    />
                    {route.name[language]}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function RightToc({ sections, panelsOpen }) {
  const { language, t } = useLanguage();
  const activeId = useActiveSection(sections.map((section) => section.id));

  return (
    <aside
      className={cn(
        'hidden shrink-0 transition-[transform,opacity] duration-200 xl:block xl:w-[220px]',
        panelsOpen ? 'xl:translate-x-0 xl:opacity-100 xl:pointer-events-auto' : 'xl:translate-x-full xl:opacity-0 xl:pointer-events-none'
      )}
    >
      <div className="sticky top-14 px-5 py-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{t.onThisPage}</p>
        <nav className="space-y-0.5 border-l border-[var(--border)] pl-3" aria-label={t.onThisPage}>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                'block rounded px-2 py-1.5 text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
                activeId === section.id ? 'text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--text)]'
              )}
            >
              {section.title[language]}
            </a>
          ))}
        </nav>
        <RotatingQuote language={language} />
      </div>
    </aside>
  );
}

const QUOTES = [
  { FR: 'La documentation n\u2019est que l\u2019interface. Le vrai produit, c\u2019est la compr\u00e9hension.', EN: 'Documentation is only the interface. The real product is understanding.', author: 'Tewfiq Ferahi' },
  { FR: 'La simplicit\u00e9 est la sophistication supr\u00eame.', EN: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { FR: 'Ce qui ne peut \u00eatre mesur\u00e9 ne peut \u00eatre am\u00e9lior\u00e9.', EN: 'What gets measured gets managed.', author: 'Peter Drucker' },
  { FR: 'Le design n\u2019est pas ce \u00e0 quoi \u00e7a ressemble. C\u2019est comment \u00e7a marche.', EN: 'Design is not what it looks like. It\u2019s how it works.', author: 'Steve Jobs' },
  { FR: 'Les d\u00e9tails ne sont pas des d\u00e9tails. Ils font le design.', EN: 'The details are not the details. They make the design.', author: 'Charles Eames' },
  { FR: 'La perfection est atteinte non quand il n\u2019y a plus rien \u00e0 ajouter, mais quand il n\u2019y a plus rien \u00e0 retrancher.', EN: 'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.', author: 'Antoine de Saint-Exup\u00e9ry' },
  { FR: '\u00c9crire, c\u2019est penser avec clart\u00e9.', EN: 'Writing is thinking with clarity.', author: 'Tewfiq Ferahi' },
];

function RotatingQuote({ language }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % QUOTES.length);
        setVisible(true);
      }, 400);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const quote = QUOTES[index];

  return (
    <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{language === 'FR' ? 'Citation' : 'Quote'}</p>
      <div className={cn('transition-opacity duration-400', visible ? 'opacity-100' : 'opacity-0')}>
        <p className="mt-2 text-sm leading-6 text-[var(--text)]">{quote[language]}</p>
        <p className="mt-3 text-xs text-[var(--muted)]">{quote.author}</p>
      </div>
    </div>
  );
}

function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0] || null);

  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-18% 0px -70% 0px' }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids.join('|')]);

  return activeId;
}

function Breadcrumbs({ pageKey }) {
  const { language } = useLanguage();
  const route = getRouteByKey(pageKey);
  if (!route) return null;
  return (
    <nav className="mb-6 text-xs text-[var(--muted)]" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-[var(--accent)]">
        Knowledge Engineering
      </Link>
      <span className="px-2">/</span>
      <span>{route.name[language]}</span>
    </nav>
  );
}

function PageHeader({ page, children }) {
  const { language } = useLanguage();
  const cover = pageCoverMap[page.path] || { variant: 'editorial' };
  return (
    <header className="mb-8 border-b border-[var(--border)] pb-10">
      <div className="mb-6 overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_14px_36px_rgba(23,19,15,0.08)]">
        <div className="relative isolate h-[180px] sm:h-[220px]">
          {cover.image ? (
            <img src={cover.image} alt="" aria-hidden="true" className="h-full w-full object-cover object-center" />
          ) : (
            <AbstractCover variant={cover.variant || 'editorial'} label={page.crumb[language]} />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
        </div>
      </div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">{page.crumb[language]}</p>
      <h1 className="max-w-[820px] text-3xl font-semibold leading-[1.06] tracking-normal text-[var(--text)] sm:text-[2.65rem]">{page.title[language]}</h1>
      {page.subtitle ? <p className="mt-4 max-w-[760px] text-base leading-7 text-[var(--muted)] sm:text-[1.02rem]">{page.subtitle[language]}</p> : null}
      {children}
    </header>
  );
}

function PageRenderer({ pageKey, page }) {
  if (pageKey === 'home') return <HomePage page={page} />;
  if (pageKey === 'gettingStarted') return <GettingStartedPage page={page} />;
  if (pageKey === 'philosophy' || pageKey === 'principles') return <PhilosophyPage page={page} />;
  if (pageKey === 'foundations') return <FoundationsPage page={page} />;
  if (pageKey === 'tokens') return <TokensPage page={page} />;
  if (pageKey === 'doDont') return <DoDontPage page={page} />;
  if (pageKey === 'patterns') return <PatternsPage page={page} />;
  if (pageKey === 'trackRecord') return <TrackRecordPage page={page} />;
  if (pageKey === 'knowledgeSystem') return <KnowledgeSystemPage page={page} />;
  if (pageKey === 'primitives') return <PrimitivesPage page={page} />;
  if (pageKey === 'experience') return <ExperienceIndexPage page={page} />;
  if (['dinum', 'bnp', 'education'].includes(pageKey)) return <ExperienceDetailPage pageKey={pageKey} page={page} />;
  if (pageKey === 'resume') return <ResumePage page={page} />;
  if (pageKey === 'contact') return <ContactPage page={page} />;
  return <HomePage page={pages.home} />;
}

function HomePage({ page }) {
  const { language, t } = useLanguage();
  const proof = page.proof[language];
  const chips = page.chips[language];
  const primitiveItems = pages.primitives.items[language];
  const badges = proofBadges[language];

  return (
    <>
      <section className="pb-4 xl:flex xl:items-start xl:pb-10 xl:pt-6">
        <div className="w-full xl:pt-4">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">{page.eyebrow[language]}</p>
          <h1 className="mt-2 max-w-[780px] whitespace-pre-line text-4xl font-semibold leading-[1.02] tracking-normal text-[var(--text)] sm:text-5xl lg:text-[3.6rem]">
            {page.title[language]}
          </h1>
          <p className="mt-2 max-w-[760px] text-base leading-7 text-[var(--muted)] sm:text-[1.02rem]">
            {page.subtitle[language]}
          </p>
          <div className="mt-3 inline-flex items-center rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-1">
            <span className="text-xs font-semibold text-[var(--accent)]">{page.punchline[language]}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {chips.slice(0, 5).map((chip) => (
              <Chip key={chip} label={chip} highlight={chip.toLowerCase().includes('mistral')} />
            ))}
          </div>
          <StatRow
            className="mt-4"
            items={proof.map((item) => ({
              value: item.value,
              label: item.label,
            }))}
          />
          <div className="mt-3.5 flex flex-wrap gap-3">
            <Button href={page.ctas.primary.href}>{page.ctas.primary[language]}</Button>
            <Button href={page.ctas.secondary.href} variant="secondary">
              {page.ctas.secondary[language]}
            </Button>
          </div>
        </div>
      </section>

      <HeroSlideshow slides={homeSlides} language={language} />

      <Section id="primitives" title={page.sections[1].title[language]}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {primitiveItems.map((item) => (
            <PrimitiveCard key={item.title} title={item.title} caption={item.caption} />
          ))}
        </div>
      </Section>

      <Section id="proof" title={page.sections[2].title[language]}>
        <ProofStrip badges={badges} language={language} />
      </Section>

      <Section id="knowledge-studio" title={page.sections[3].title[language]}>
        <KnowledgeStudioSection language={language} />
      </Section>

      <Section id="field" title={page.sections[4].title[language]}>
        <div className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {experienceCards[language].map((card) => (
            <ExperienceCoverCard key={card.route} card={card} language={language} />
          ))}
        </div>
      </Section>
    </>
  );
}

function PrimitiveCard({ title, caption }) {
  return (
    <Link
      href="/primitives"
      className="group overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--accent-border)] hover:shadow-[0_14px_34px_rgba(255,107,53,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <div className="h-16 bg-gradient-to-br from-[var(--accent-soft)] to-[var(--surface-subtle)]" />
      <div className="p-4">
        <h3 className="text-sm font-semibold text-[var(--text)]">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{caption}</p>
      </div>
    </Link>
  );
}

function ProofStrip({ badges, language }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {badges.map((badge) => (
          <div key={badge.label} className="rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-center">
            <p className="text-lg font-semibold text-[var(--text)]">{badge.value}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{badge.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <MiniHeatmap />
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]">
        {language === 'FR' ? 'Des traces de pratique, pas des troph\u00e9es.' : 'Traces of practice, not trophies.'}
      </p>
    </div>
  );
}

function MiniHeatmap() {
  const levels = [0, 1, 2, 3, 2, 1, 0, 3, 4, 2, 1, 0, 2, 3, 1, 4, 2, 0, 1, 3, 2, 4, 1, 0, 2, 3, 2, 1, 4, 3, 0, 2, 1, 3, 4, 2, 0, 1, 3, 2, 4, 3, 1, 0, 2, 3, 4, 1, 2, 0, 3, 2, 4, 3, 1, 2];
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto">
      {levels.map((level, index) => (
        <span
          key={`${level}-${index}`}
          className={cn(
            'h-2.5 w-2.5 rounded-[2px] border border-[var(--border)]',
            level === 0 && 'bg-[var(--surface-subtle)]',
            level === 1 && 'bg-[#fee5d8]',
            level === 2 && 'bg-[#ffba87]',
            level === 3 && 'bg-[#ff7a3d]',
            level === 4 && 'bg-[#bd3f16]'
          )}
        />
      ))}
    </div>
  );
}

function KnowledgeStudioSection({ language }) {
  const studioPage = pages.knowledgeSystem;
  const pipeline = studioPage.pipeline[language];
  return (
    <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
      <div className="overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_14px_36px_rgba(23,19,15,0.08)]">
        <img src="/images/asset 2.webp" alt="Knowledge Studio" className="h-full w-full object-cover" />
      </div>
      <div>
        <p className="text-sm leading-7 text-[var(--muted)]">{studioPage.subtitle[language]}</p>
        <ol className="mt-4 space-y-3">
          {pipeline.map((step, index) => (
            <li key={step} className="flex items-start gap-3">
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[11px] font-semibold text-[var(--accent)]">
                {index + 1}
              </span>
              <span className="text-sm font-medium text-[var(--text)]">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-xs leading-5 text-[var(--muted)]">{studioPage.microcopy[language]}</p>
      </div>
    </div>
  );
}

function HeroSlideshow({ slides, language }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    if (paused || slides.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((value) => (value + 1) % slides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  const goTo = (nextIndex) => {
    setActiveIndex((nextIndex + slides.length) % slides.length);
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  return (
    <section className="mb-8">
      <div
        className="group relative overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_20px_60px_rgba(23,19,15,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
        onTouchEnd={(event) => {
          if (touchStart === null) return;
          const touchEnd = event.changedTouches[0]?.clientX ?? touchStart;
          const delta = touchEnd - touchStart;
          if (delta > 40) goTo(activeIndex - 1);
          if (delta < -40) goTo(activeIndex + 1);
          setTouchStart(null);
        }}
      >
        <div className="relative h-[240px] overflow-hidden sm:h-[360px] xl:h-[420px]">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const previous = (activeIndex - 1 + slides.length) % slides.length;
            const direction = index === previous ? -1 : 1;
            return (
              <div
                key={slide.id}
                className={cn(
                  'absolute inset-0 transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                  isActive
                    ? 'translate-x-0 opacity-100'
                    : cn('pointer-events-none opacity-0', index < activeIndex ? '-translate-x-3' : 'translate-x-3')
                )}
                aria-hidden={!isActive}
              >
                <img src={slide.src} alt={slide.alt} className="h-full w-full object-cover object-center" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-4 py-4 sm:px-5 sm:py-5">
                  <p className="max-w-[70%] text-sm leading-6 text-white/92 sm:text-base">
                    {slide.caption[language]}
                  </p>
                  <p className="text-xs font-semibold tracking-[0.18em] text-white/80">
                    {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03),rgba(255,255,255,0)_35%,rgba(255,255,255,0)_65%,rgba(255,255,255,0.03))]" />
          <button
            type="button"
            aria-label={language === 'FR' ? 'Image précédente' : 'Previous slide'}
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/18 bg-black/25 p-2 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            aria-label={language === 'FR' ? 'Image suivante' : 'Next slide'}
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/18 bg-black/25 p-2 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 px-1">
        <p className="min-w-0 truncate text-sm text-[var(--muted)]">{slides[activeIndex].caption[language]}</p>
        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Slide ${index + 1}`}
              aria-pressed={index === activeIndex}
              onClick={() => goTo(index)}
              className={cn(
                'h-2.5 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
                index === activeIndex ? 'w-8 bg-[var(--accent)]' : 'w-2.5 bg-[var(--border-strong)] hover:bg-[var(--accent-border)]'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatRow({ items, className = '' }) {
  return (
    <div className={cn('mt-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]', className)}>
      <div className="grid divide-y divide-[var(--border)] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {items.map((item) => (
          <div key={`${item.value}-${item.label}`} className="px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-[1.85rem] font-semibold leading-none tracking-[-0.04em] text-[var(--text)]">{item.value}</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompactMetadata({ rows, note, language }) {
  const visibleRows = rows.slice(0, 4);
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="divide-y divide-[var(--border)]">
          {visibleRows.map(([label, value]) => (
            <div key={`${label}-${value}`} className="grid grid-cols-[110px_1fr] gap-3 px-4 py-3 text-sm sm:grid-cols-[140px_1fr]">
              <dt className="text-[var(--muted)]">{label}</dt>
              <dd className="font-medium text-[var(--text)]">{value === 'Mistral Vibe' ? <MistralMention><MistralLogo />{value}</MistralMention> : <TextWithMistralLogo text={value} />}</dd>
            </div>
          ))}
        </div>
      </div>
      <details className="group rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3">
        <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--text)]">{language === 'FR' ? 'Pourquoi ce format ?' : 'Why this format?'}</summary>
        <p className="mt-3 max-w-[720px] text-sm leading-6 text-[var(--muted)]">{note}</p>
      </details>
    </div>
  );
}

function CoverCard({ href, title, description, cover, label }) {
  return (
    <Link
      href={href}
      className="group snap-start overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--accent-border)] hover:shadow-[0_16px_40px_rgba(255,107,53,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <div className="relative h-[140px] overflow-hidden">
        <AbstractCover variant={cover} label={label} />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-sm font-semibold text-[var(--text)]">{title}</h3>
          <span className="text-[var(--accent)] transition group-hover:translate-x-1">→</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
      </div>
    </Link>
  );
}

function ExperienceCoverCard({ card, language }) {
  const image = experienceCoverMap[card.route];
  return (
    <Link
      href={card.route}
      className="group relative isolate overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--accent-border)] hover:shadow-[0_18px_50px_rgba(23,19,15,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <div className="relative h-[220px] overflow-hidden">
        {image ? <img src={image} alt={card.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" /> : <AbstractCover variant="public-sector" label={card.title} />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/15 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/25 px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] text-white/90 backdrop-blur">
          {(card.label || card.title).toUpperCase()}
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
          <div className="max-w-[82%]">
            <h3 className="text-lg font-semibold leading-tight">{card.headline || card.description}</h3>
            <p className="mt-2 text-sm leading-6 text-white/78">{card.role}</p>
          </div>
          <span className="rounded-full border border-white/15 bg-white/10 p-2.5 text-white transition group-hover:translate-x-1 group-hover:-translate-y-0.5">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function AbstractCover({ variant, label, compact = false }) {
  const gradientSrc = gradientCoverMap[variant] || gradientCoverMap.editorial;
  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--surface)]">
      <img src={gradientSrc} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center" />
      {compact ? null : <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.08))]" />}
      {compact ? null : (
        <div className="pointer-events-none absolute inset-0 opacity-35">
          <div className="absolute inset-x-0 top-0 h-px bg-white/40" />
          <div className="absolute left-4 top-4 h-20 w-20 rounded-full border border-white/20" />
          <div className="absolute right-6 top-10 h-14 w-14 rounded-[24px] border border-white/20" />
          <div className="absolute bottom-4 left-4 right-4 h-16 rounded-2xl border border-white/18" />
        </div>
      )}
      {compact ? null : (
        <div className="absolute bottom-4 left-4 rounded-full border border-white/18 bg-black/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white/85 backdrop-blur">
          {label}
        </div>
      )}
    </div>
  );
}

function GettingStartedPage({ page }) {
  const { language } = useLanguage();
  const items = [
    { id: 'what', body: page.content.what[language] },
    { id: 'navigate', body: page.content.navigate[language] },
    { id: 'clickable', body: page.content.clickable[language] },
  ];

  return (
    <>
      <PageHeader page={page} />
      <Section id="what" title={page.sections[0].title[language]}>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <DocSurface key={item.id}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{String(index + 1).padStart(2, '0')}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
            </DocSurface>
          ))}
        </div>
      </Section>

      <Section id="navigate" title={page.sections[1].title[language]}>
        <DocSurface>
          <p className="text-sm leading-7 text-[var(--muted)]">{page.content.navigate[language]}</p>
        </DocSurface>
      </Section>

      <Section id="clickable" title={page.sections[2].title[language]}>
        <DocSurface>
          <p className="text-sm leading-7 text-[var(--muted)]">{page.content.clickable[language]}</p>
        </DocSurface>
      </Section>

      <Section id="recommended" title={page.sections[3].title[language]}>
        <div className="grid gap-4 md:grid-cols-2">
          {page.content.recommended.map((entry) => {
            const route = routes.find((routeItem) => routeItem.path === entry.route);
            return (
              <ClickableDocCard
                key={entry.route}
                href={entry.route}
                title={entry.title[language]}
                description={route ? route.name[language] : ''}
                cover={pageCoverMap[entry.route] || { variant: 'editorial' }}
              />
            );
          })}
        </div>
      </Section>
    </>
  );
}

function PhilosophyPage({ page }) {
  const { language } = useLanguage();
  return (
    <>
      <PageHeader page={page} />
      <Section id="principles" title={page.sections[0].title[language]}>
        <div className="grid gap-4 md:grid-cols-2">
          {principles[language].map(([title, definition, why]) => (
            <PrincipleCard key={title} title={title} definition={definition} why={why} />
          ))}
        </div>
      </Section>
    </>
  );
}

function FoundationsPage({ page }) {
  const { language } = useLanguage();
  const content = page.content;
  const order = ['mission', 'vision', 'values', 'writing', 'accessibility', 'learning'];

  return (
    <>
      <PageHeader page={page} />
      {page.sections.map((section, index) => (
        <Section key={section.id} id={section.id} title={section.title[language]}>
          {order[index] === 'values' ? (
            <div className="grid gap-3 md:grid-cols-3">
              {content.values[language].map((value) => (
                <DocSurface key={value}>
                  <p className="text-sm font-medium text-[var(--text)]">{value}</p>
                </DocSurface>
              ))}
            </div>
          ) : (
            <DocSurface>
              <p className="text-sm leading-7 text-[var(--muted)]">{content[order[index]][language]}</p>
            </DocSurface>
          )}
        </Section>
      ))}
    </>
  );
}

function TokensPage({ page }) {
  const { language } = useLanguage();
  const tokenGroups = [
    { id: 'color', data: page.tokens.color },
    { id: 'semantic', data: page.tokens.semantic },
    { id: 'typography', data: page.tokens.typography },
    { id: 'spacing', data: page.tokens.spacing },
    { id: 'radius', data: page.tokens.radius },
    { id: 'borders', data: page.tokens.borders },
    { id: 'surfaces', data: page.tokens.surfaces },
  ];

  return (
    <>
      <PageHeader page={page} />
      {page.sections.map((section, index) => {
        const item = tokenGroups[index];
        return (
          <Section key={section.id} id={section.id} title={section.title[language]}>
            {item.id === 'color' || item.id === 'semantic' ? (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {item.data.map((token) => (
                  <div key={token.name} className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]">
                    <div className="h-16 border-b border-[var(--border)]" style={{ background: token.value }} />
                    <div className="p-3">
                      <p className="text-sm font-medium text-[var(--text)]">{token.name}</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">{token.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {item.data.map((entry) => (
                  <DocSurface key={entry}>
                    <p className="text-sm leading-7 text-[var(--muted)]">{entry}</p>
                  </DocSurface>
                ))}
              </div>
            )}
          </Section>
        );
      })}
    </>
  );
}

function DoDontPage({ page }) {
  const { language } = useLanguage();
  const pairs = [
    { key: 'titles', label: page.sections[0].title[language] },
    { key: 'metrics', label: page.sections[1].title[language] },
    { key: 'caseStudies', label: page.sections[2].title[language] },
  ];

  return (
    <>
      <PageHeader page={page} />
      {pairs.map((entry) => {
        const pair = page.pairs[entry.key];
        return (
          <Section key={entry.key} id={entry.key} title={entry.label}>
            <div className="grid gap-4 md:grid-cols-2">
              <ComparisonCard label="Do" text={pair.do[language]} />
              <ComparisonCard label="Don't" text={pair.dont[language]} negative />
            </div>
          </Section>
        );
      })}
    </>
  );
}

function PatternsPage({ page }) {
  const { language } = useLanguage();
  const patterns = [
    [page.sections[0].title[language], language === 'FR' ? 'Problème → rôle → impact → apprentissage.' : 'Problem → role → impact → learning.'],
    [page.sections[1].title[language], language === 'FR' ? 'Une expérience lisible, avec métadonnées, preuves et liens.' : 'A readable experience with metadata, proof and links.'],
    [page.sections[2].title[language], language === 'FR' ? 'Un bloc réutilisable pour nom, titre et capacité à lire vite.' : 'A reusable block for name, title and fast scanning.'],
    [page.sections[3].title[language], language === 'FR' ? 'Petits groupes de faits vérifiables, jamais de bruit décoratif.' : 'Small groups of verifiable facts, never decorative noise.'],
    [page.sections[4].title[language], language === 'FR' ? "Un point d'attention, un label, puis une explication utile." : 'One point of attention, one label, then a useful explanation.'],
    [page.sections[5].title[language], language === 'FR' ? 'Toujours garder une direction de lecture claire.' : 'Always keep a clear reading direction.'],
    [page.sections[6].title[language], language === 'FR' ? 'Les liens donnent le contexte, le système devient navigable.' : 'Links provide context and make the system navigable.'],
  ];

  return (
    <>
      <PageHeader page={page} />
      <Section id="case-study" title={page.sections[0].title[language]}>
        <div className="grid gap-4 md:grid-cols-2">
          <DocSurface>
            <p className="text-sm leading-7 text-[var(--muted)]">{patterns[0][1]}</p>
          </DocSurface>
          <DocSurface>
            <p className="text-sm leading-7 text-[var(--muted)]">{language === 'FR' ? 'Section structurée par contexte, problème, rôle, impact et leçon.' : 'A section structured by context, problem, role, impact and lesson.'}</p>
          </DocSurface>
        </div>
      </Section>
      {page.sections.slice(1).map((section, index) => (
        <Section key={section.id} id={section.id} title={section.title[language]}>
          <DocSurface>
            <p className="text-sm leading-7 text-[var(--muted)]">{patterns[index + 1][1]}</p>
          </DocSurface>
        </Section>
      ))}
    </>
  );
}

function TrackRecordPage({ page }) {
  const { language, t } = useLanguage();
  return (
    <>
      <PageHeader page={page} />
      <Section id="metrics" title={page.sections[0].title[language]}>
        <div className="grid gap-4 md:grid-cols-2">
          {metrics[language].map((group) => (
            <MetricGroup key={group.title} group={group} />
          ))}
        </div>
      </Section>
      <Section id="heatmap" title={page.sections[1].title[language]}>
        <Heatmap />
      </Section>
      <Section id="screenshots" title={page.sections[2].title[language]}>
        <EvidenceGrid images={trackRecordScreenshots[language]} />
      </Section>
      <RelatedLinks keys={['knowledgeSystem', 'education']} title={t.related} />
    </>
  );
}

function KnowledgeSystemPage({ page }) {
  const { language } = useLanguage();
  const pipeline = page.pipeline[language];
  return (
    <>
      <PageHeader page={page} />
      <Section id="workflow" title={page.sections[0].title[language]}>
        <WorkflowDiagram steps={pipeline} />
      </Section>
      <Section id="knowledge-cards" title={page.sections[1].title[language]}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {knowledgeCards[language].map((title) => (
            <DocSurface key={title}>
              <h3 className="text-sm font-semibold text-[var(--text)]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {language === 'FR'
                  ? 'Une couche r\u00e9utilisable du syst\u00e8me pour rechercher, comparer, apprendre et d\u00e9cider.'
                  : 'A reusable layer in the system for research, comparison, learning and decisions.'}
              </p>
            </DocSurface>
          ))}
        </div>
      </Section>
      <Section id="screenshot" title={page.sections[2].title[language]}>
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_14px_36px_rgba(23,19,15,0.08)]">
            <img src="/images/asset 2.webp" alt="Knowledge Studio workspace" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-sm leading-7 text-[var(--muted)]">{page.subtitle[language]}</p>
            <p className="mt-4 text-xs leading-5 text-[var(--muted)]">{page.microcopy[language]}</p>
          </div>
        </div>
      </Section>
    </>
  );
}

function PrimitivesPage({ page }) {
  const { language } = useLanguage();
  const items = page.items[language];
  return (
    <>
      <PageHeader page={page} />
      <Section id="primitives-list" title={page.sections[0].title[language]}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <DocSurface key={item.title}>
              <h3 className="text-sm font-semibold text-[var(--text)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.caption}</p>
            </DocSurface>
          ))}
        </div>
      </Section>
    </>
  );
}

function ExperienceIndexPage({ page }) {
  const { language } = useLanguage();
  return (
    <>
      <PageHeader page={page} />
      <Section id="experience-cards" title={page.sections[0].title[language]}>
        <div className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {experienceCards[language].map((card) => (
            <ExperienceCoverCard key={card.route} card={card} language={language} />
          ))}
        </div>
      </Section>
    </>
  );
}

function ExperienceDetailPage({ pageKey, page }) {
  const { language } = useLanguage();
  const body = page.body[language];
  return (
    <>
      <PageHeader page={page}>
        <div className="mt-6">
          <MetadataTable rows={page.metadata[language]} />
        </div>
      </PageHeader>
      {page.sections.map((section) => {
        const value = body[section.id];
        return (
          <Section key={section.id} id={section.id} title={section.title[language]}>
            {Array.isArray(value) ? (
              <BulletList items={value} />
            ) : (
              <DocSurface>
                <p className="text-sm leading-7 text-[var(--muted)]">{value}</p>
              </DocSurface>
            )}
          </Section>
        );
      })}
      <Section id="media" title={language === 'FR' ? 'Images de terrain' : 'Field images'}>
        <MediaGrid images={page.media[language]} />
      </Section>
    </>
  );
}

function ResumePage({ page }) {
  const { language } = useLanguage();
  return (
    <>
      <PageHeader page={page} />
      <Section id="resume-summary" title={page.sections[0].title[language]}>
        <MetadataTable
          rows={[
            [language === 'FR' ? 'Nom' : 'Name', 'Tewfiq Ferahi'],
            [language === 'FR' ? 'Rôle cible' : 'Target role', language === 'FR' ? 'Designer Produit — Documentation' : 'Product Designer — Documentation'],
            [language === 'FR' ? 'Domaines' : 'Domains', language === 'FR' ? 'Documentation, IA produit, systèmes de design, transmission' : 'Documentation, AI product, design systems, teaching'],
          ]}
        />
      </Section>
    </>
  );
}

function ContactPage({ page }) {
  const { language, t } = useLanguage();
  return (
    <>
      <PageHeader page={page} />
      <Section id="contact-options" title={page.sections[0].title[language]}>
        <div className="flex flex-wrap gap-3">
          <Button href={shared.ctaUrl}>{t.book}</Button>
          <Button href="mailto:hello@tewfiq.com" variant="secondary">
            {t.email}
          </Button>
        </div>
      </Section>
    </>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--border)] py-12 lg:py-16">
      <h2 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{title}</h2>
      {children}
    </section>
  );
}

function Button({ href, children, variant = 'primary' }) {
  const className = cn(
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
    variant === 'primary'
      ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]'
      : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)]'
  );
  if (typeof href !== 'string') {
    return <span className={className}>{children}</span>;
  }
  return href.startsWith('/') ? <Link href={href} className={className}>{children}</Link> : <a href={href} className={className}>{children}</a>;
}

function Chip({ label, highlight = false }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold',
        highlight ? 'border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--text)]' : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)]'
      )}
    >
      {highlight ? <MistralDot /> : null}
      {label}
    </span>
  );
}

function MistralDot() {
  return <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />;
}

function MistralMention({ children, className = '' }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2.5 py-1 text-current', className)}>
      <MistralDot />
      {children}
    </span>
  );
}

function MistralLogo({ className = 'h-3.5 w-3.5' }) {
  return <img src="/mistral-color.svg" alt="" aria-hidden="true" className={cn('shrink-0', className)} />;
}

function TextWithMistralLogo({ text }) {
  if (!text.includes('Mistral')) return text;
  const parts = text.split(/(Mistral(?: AI| Vibe)?)/g);
  return parts.map((part, index) => {
    if (!part.startsWith('Mistral')) return part;
    return (
      <MistralMention key={`${part}-${index}`}>
        <span className="inline-flex items-baseline gap-1.5 whitespace-nowrap font-medium text-[var(--text)]">
          <MistralLogo className="relative top-0.5 h-3.5 w-3.5" />
          {part}
        </span>
      </MistralMention>
    );
  });
}

function MetadataTable({ rows, stacked = false }) {
  if (!rows?.length) return null;
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <dl className={cn('grid gap-px bg-[var(--border)] text-sm', stacked ? 'grid-cols-1' : 'sm:grid-cols-2')}>
        {rows.map(([label, value]) => (
          <div key={`${label}-${value}`} className="grid grid-cols-[120px_1fr] gap-3 bg-[var(--surface)] px-4 py-3">
            <dt className="text-[var(--muted)]">{label}</dt>
            <dd className="font-medium text-[var(--text)]">{value === 'Mistral Vibe' ? <MistralMention><MistralLogo />{value}</MistralMention> : <TextWithMistralLogo text={value} />}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Callout({ children, variant = 'note' }) {
  return (
    <div className="rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{variant}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--text)]">{children}</p>
    </div>
  );
}

function MetricGroup({ group }) {
  return (
    <DocSurface>
      <h3 className="text-sm font-semibold text-[var(--text)]">{group.title}</h3>
      <ul className="mt-4 space-y-3">
        {group.items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            {item}
          </li>
        ))}
      </ul>
    </DocSurface>
  );
}

function Heatmap() {
  const levels = [0, 1, 2, 3, 2, 1, 0, 3, 4, 2, 1, 0, 2, 3, 1, 4, 2, 0, 1, 3, 2, 4, 1, 0, 2, 3, 2, 1, 4, 3, 0, 2, 1, 3, 4, 2, 0, 1, 3, 2, 4, 3, 1, 0, 2, 3, 4, 1, 2, 0, 3, 2, 4, 3, 1, 2, 0, 3, 4, 1, 2, 3, 0, 4, 2, 1, 3, 4, 2, 0, 1, 3, 2, 4, 1, 0, 3, 2, 4, 3, 1, 2, 0, 4];
  return (
    <DocSurface>
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-1">
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
    </DocSurface>
  );
}

function WorkflowDiagram({ steps }) {
  return (
    <ol className="grid gap-3 md:grid-cols-7">
      {steps.map((step, index) => (
        <li key={step} className="relative rounded-md border border-[var(--accent-border)] bg-[var(--accent-soft)] p-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{String(index + 1).padStart(2, '0')}</span>
          <p className="mt-2 text-sm font-medium text-[var(--text)]">{step}</p>
          {index < steps.length - 1 ? (
            <>
              <span className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[var(--surface)] px-1 text-[var(--muted)] md:hidden">
                ↓
              </span>
              <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-[var(--surface)] px-1 text-[var(--muted)] md:block">
                →
              </span>
            </>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function ClickableDocCard({ href, title, description, cover }) {
  const coverObj = typeof cover === 'string' ? { variant: cover } : (cover || { variant: 'editorial' });
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--accent-border)] hover:shadow-[0_14px_34px_rgba(255,107,53,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      aria-label={title}
    >
      <div className="relative h-24 overflow-hidden">
        {coverObj.image ? (
          <img src={coverObj.image} alt="" aria-hidden="true" className="h-full w-full object-cover object-center" />
        ) : (
          <AbstractCover variant={coverObj.variant || 'editorial'} label={title} />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-sm font-semibold text-[var(--text)]">{title}</h3>
          <span className="text-[var(--accent)] transition group-hover:translate-x-1">→</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
      </div>
    </Link>
  );
}

function ExperienceCard({ card }) {
  return (
    <Link
      href={card.route}
      className="group block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--text)]">{card.title}</h3>
          <p className="mt-1 text-xs text-[var(--muted)]">{card.role}</p>
        </div>
        <span className="text-[var(--accent)] transition group-hover:translate-x-0.5">→</span>
      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{card.updated}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{card.description}</p>
      <p className="mt-4 text-xs text-[var(--muted)]">{card.route}</p>
    </Link>
  );
}

function PrincipleCard({ title, definition, why }) {
  const { language } = useLanguage();
  return (
    <DocSurface>
      <h3 className="text-base font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{language === 'FR' ? 'Définition' : 'Definition'}</p>
      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{definition}</p>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{language === 'FR' ? 'Pourquoi c\u2019est important' : 'Why it matters'}</p>
      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{why}</p>
    </DocSurface>
  );
}

function ComparisonCard({ label, text, negative = false }) {
  return (
    <div className={cn('rounded-[14px] border bg-[var(--surface)] p-5', negative ? 'border-[var(--accent-border)]' : 'border-[var(--border)]')}>
      <div className="flex items-center gap-2">
        <span className={cn('grid h-8 w-8 place-items-center rounded-full', negative ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'bg-[var(--surface-subtle)] text-[var(--muted)]')}>
          {negative ? <XIcon /> : <CheckIcon />}
        </span>
        <p className={cn('text-[11px] font-semibold uppercase tracking-[0.14em]', negative ? 'text-[var(--accent)]' : 'text-[var(--muted)]')}>{label}</p>
      </div>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{text}</p>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function BulletList({ items }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function MediaGrid({ images }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((image) => (
        <figure key={image.src} className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <img src={image.src} alt={image.alt} loading="lazy" className="h-56 w-full object-cover" />
          <figcaption className="border-t border-[var(--border)] px-4 py-3 text-xs font-medium text-[var(--muted)]">{image.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function EvidenceGrid({ images }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {images.map((image) => (
        <a
          key={image.src}
          href={image.src}
          target="_blank"
          rel="noreferrer"
          className="group overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--accent-border)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <span className="block bg-[var(--surface-subtle)]">
            <img src={image.src} alt={image.alt} loading="lazy" className="h-52 w-full object-cover object-top transition duration-200 group-hover:scale-[1.01]" />
          </span>
          <span className="flex items-center justify-between gap-3 border-t border-[var(--border)] px-4 py-3 text-xs font-medium text-[var(--muted)]">
            <span>{image.caption}</span>
            <span className="text-[var(--accent)]">↗</span>
          </span>
        </a>
      ))}
    </div>
  );
}

function DocSurface({ children }) {
  return <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">{children}</div>;
}

function RelatedLinks({ keys, title }) {
  const { language } = useLanguage();
  return (
    <Section id="related" title={title}>
      <div className="grid gap-4 sm:grid-cols-2">
        {keys.map((key) => {
          const route = getRouteByKey(key);
          if (!route) return null;
          return (
            <ClickableDocCard
              key={key}
              href={route.path}
              title={route.name[language]}
              description={pages[key].subtitle?.[language] || route.name[language]}
              cover={pageCoverMap[route.path] || { variant: 'editorial' }}
            />
          );
        })}
      </div>
    </Section>
  );
}

function PreviousNext({ pageKey }) {
  const { language, t } = useLanguage();
  const { previous, next } = getPrevNext(pageKey);
  if (!previous && !next) return null;
  return (
    <nav className="mt-10 grid gap-3 border-t border-[var(--border)] pt-5 sm:grid-cols-2" aria-label={t.navigation}>
      <div>{previous ? <PrevNextLink label={t.previous} route={getRouteByKey(previous)} language={language} /> : null}</div>
      <div>{next ? <PrevNextLink label={t.next} route={getRouteByKey(next)} language={language} alignRight /> : null}</div>
    </nav>
  );
}

function PrevNextLink({ label, route, language, alignRight }) {
  if (!route) return null;
  return (
    <Link
      href={route.path}
      className={cn(
        'group block rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
        alignRight && 'sm:text-right'
      )}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{label}</span>
      <span className="mt-1 block text-sm font-medium text-[var(--text)] group-hover:text-[var(--accent)]">{route.name[language]}</span>
    </Link>
  );
}

function SearchModal({ open, onClose, language }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const listRef = useRef(null);
  const searchIndex = useMemo(() => buildSearchIndex(language), [language]);
  const results = query
    ? searchIndex.filter((item) => `${item.title} ${item.excerpt}`.toLowerCase().includes(query.toLowerCase())).slice(0, 10)
    : [];

  const quickLinks = useMemo(() => [
    ...routes.filter((r) => r.key !== 'home').map((r) => ({ path: r.path, title: r.name[language], excerpt: pages[r.key]?.subtitle?.[language] || '' })),
  ], [language]);

  const displayItems = query ? results : quickLinks;

  useEffect(() => {
    if (!open) { setQuery(''); setSelected(0); }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const navigate = useCallback((path) => {
    onClose();
    const [pagePath, hash] = path.split('#');
    const target = pagePath || '/';
    if (hash && (router.asPath.split('#')[0] === target || (target === '/' && router.asPath.split('#')[0] === '/'))) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `${target}#${hash}`);
        return;
      }
    }
    if (hash) {
      router.push(`${target}#${hash}`).then(() => {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      });
    } else {
      router.push(target);
    }
  }, [onClose, router]);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelected((s) => Math.min(s + 1, displayItems.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (event.key === 'Enter' && displayItems[selected]) {
      event.preventDefault();
      navigate(displayItems[selected].path);
    }
  };

  useEffect(() => {
    if (!listRef.current) return;
    const active = listRef.current.querySelector('[data-active="true"]');
    if (active) active.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/35 p-4" role="dialog" aria-modal="true" aria-label={t.search} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="mx-auto mt-[12vh] max-w-xl overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xl">
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
          <SearchIcon />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
          />
          <kbd className="rounded border border-[var(--border)] bg-[var(--bg)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--muted)] cursor-pointer" onClick={onClose}>
            esc
          </kbd>
        </div>
        <div ref={listRef} className="max-h-[420px] overflow-y-auto p-1.5">
          {!query && (
            <p className="mb-1 px-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{language === 'FR' ? 'Pages' : 'Pages'}</p>
          )}
          {displayItems.length ? (
            displayItems.map((item, i) => (
              <button
                key={`${item.path}-${item.title}`}
                type="button"
                data-active={i === selected}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setSelected(i)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                  i === selected ? 'bg-[var(--accent-soft)]' : 'hover:bg-[var(--accent-soft)]/50'
                )}
              >
                <span className="flex-1 min-w-0">
                  <span className={cn('block text-sm font-medium', i === selected ? 'text-[var(--accent)]' : 'text-[var(--text)]')}>{item.title}</span>
                  {item.excerpt ? <span className="mt-0.5 block truncate text-xs text-[var(--muted)]">{item.excerpt}</span> : null}
                </span>
                {i === selected && <span className="text-xs text-[var(--accent)]">↵</span>}
              </button>
            ))
          ) : query ? (
            <p className="p-6 text-center text-sm text-[var(--muted)]">{t.noResults}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const { language, t } = useLanguage();
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">Tewfiq Ferahi</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Knowledge Engineering</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{t.footerRole}</p>
            <p className="mt-4 inline-flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
              <MistralMention>
                <MistralLogo />
                {shared.mistralVibe[language]}
              </MistralMention>
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm" aria-label="Footer">
            <a className="text-[var(--accent)] hover:text-[var(--accent-hover)]" href={shared.ctaUrl}>
              {t.book}
            </a>
            <a className="text-[var(--muted)] hover:text-[var(--accent)]" href="#">
              LinkedIn
            </a>
            <a className="text-[var(--muted)] hover:text-[var(--accent)]" href="#">
              GitHub
            </a>
            <a className="text-[var(--muted)] hover:text-[var(--accent)]" href="mailto:hello@tewfiq.com">
              {language === 'FR' ? 'E-mail' : 'Email'}
            </a>
          </nav>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">{shared.footerSentence[language]}</p>
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

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function PanelsIcon({ open }) {
  return open ? <PanelsOpenIcon /> : <PanelsClosedIcon />;
}

function PanelsOpenIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="7" height="14" rx="1.5" />
      <rect x="14" y="5" width="7" height="14" rx="1.5" />
      <path d="M11 12h2" />
    </svg>
  );
}

function PanelsClosedIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="5" width="12" height="14" rx="1.5" />
      <path d="M9 12h6" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function SidebarCollapseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="m16 15-3-3 3-3" />
    </svg>
  );
}

function SidebarExpandIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="m14 9 3 3-3 3" />
    </svg>
  );
}
