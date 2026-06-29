import Link from 'next/link';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
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

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const resolved = theme === 'system' ? (media.matches ? 'dark' : 'light') : theme;
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(resolved);
      document.documentElement.style.colorScheme = resolved;
    };

    applyTheme();
    media.addEventListener('change', applyTheme);
    return () => media.removeEventListener('change', applyTheme);
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

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header onMenu={() => setMobileNavOpen((value) => !value)} onSearch={() => setSearchOpen(true)} />
      <div className="mx-auto flex max-w-[1280px]">
        <Sidebar currentKey={pageKey} mobileOpen={mobileNavOpen} onNavigate={() => setMobileNavOpen(false)} />
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[860px]">
            <Breadcrumbs pageKey={pageKey} />
            <PageRenderer pageKey={pageKey} page={page} />
            <PreviousNext pageKey={pageKey} />
          </div>
        </main>
        <RightToc sections={page.sections || []} />
      </div>
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
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenu}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-sm text-[var(--muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] lg:hidden"
            aria-label={t.navigation}
          >
            Menu
          </button>
          <Link href="/" className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-[var(--accent-border)] bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)]">TF</span>
            <span className="hidden truncate text-sm font-medium text-[var(--text)] sm:block">{labels[language].sidebarTitle} v1.0</span>
          </Link>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={onSearch}
            className="flex min-w-0 items-center justify-between gap-3 rounded-md border border-[var(--accent-border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:w-52 md:w-64"
            aria-label={t.openSearch}
          >
            <span className="hidden truncate text-left sm:inline">{t.search}</span>
            <kbd className="rounded border border-[var(--accent-border)] bg-[var(--accent-soft)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--accent)]">⌘K</kbd>
          </button>
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <a href={shared.ctaUrl} className="rounded-md bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
            {t.book}
          </a>
        </div>
      </div>
    </header>
  );
}

function LanguageToggle({ language, setLanguage }) {
  const { t } = useLanguage();
  const names = {
    FR: { FR: 'Français', EN: 'Anglais' },
    EN: { FR: 'FR', EN: 'EN' },
  };

  return (
    <div className="hidden rounded-md border border-[var(--border)] bg-[var(--surface)] p-0.5 sm:flex" aria-label={t.language}>
      {languages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          className={cn(
            'rounded px-2 py-1 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
            language === item ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--text)]'
          )}
        >
          {names[language][item]}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle({ theme, setTheme }) {
  const { t } = useLanguage();
  const order = ['light', 'system', 'dark'];
  const nextTheme = order[(order.indexOf(theme) + 1) % order.length];
  const labelByTheme = {
    light: t.light,
    system: t.system,
    dark: t.dark,
  };

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="hidden h-7 w-7 place-items-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] md:grid"
      aria-label={`${t.theme}: ${labelByTheme[theme]}`}
      title={labelByTheme[theme]}
    >
      <span key={theme} className="inline-flex animate-[theme-pop_180ms_ease-out]">
        <ThemeIcon theme={theme} />
      </span>
    </button>
  );
}

function ThemeIcon({ theme }) {
  if (theme === 'dark') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 7 7 0 1 0 20 15.5Z" />
      </svg>
    );
  }

  if (theme === 'system') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="5" width="16" height="11" rx="2" />
        <path d="M8 20h8" />
        <path d="M12 16v4" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function Sidebar({ currentKey, mobileOpen, onNavigate }) {
  const { language, t } = useLanguage();

  return (
    <aside className={cn(
      'fixed inset-x-0 top-14 z-40 border-b border-[var(--border)] bg-[var(--bg)] px-4 py-5 shadow-sm lg:sticky lg:top-14 lg:block lg:h-[calc(100vh-3.5rem)] lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:px-5 lg:shadow-none',
      mobileOpen ? 'block' : 'hidden'
    )}>
      <p className="mb-4 text-sm font-semibold text-[var(--text)]">{t.sidebarTitle}</p>
      <nav className="space-y-6" aria-label={t.navigation}>
        {navGroups.map((group) => (
          <div key={group.title[language]}>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{group.title[language]}</p>
            <div className="space-y-1">
              {group.items.map((key) => {
                const route = getRouteByKey(key);
                const active = key === currentKey;
                return (
                  <Link
                    key={key}
                    href={route.path}
                    onClick={onNavigate}
                    className={cn(
                      'block rounded-md px-3 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
                      active ? 'border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]' : 'text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]'
                    )}
                  >
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

function RightToc({ sections }) {
  const { language, t } = useLanguage();
  const activeId = useActiveSection(sections.map((section) => section.id));

  return (
    <aside className="hidden w-56 shrink-0 xl:block">
      <div className="sticky top-14 px-6 py-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{t.onThisPage}</p>
        <nav className="space-y-1 border-l border-[var(--border)] pl-3" aria-label={t.onThisPage}>
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
      </div>
    </aside>
  );
}

function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    if (!ids.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' }
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
  return (
    <nav className="mb-6 text-xs text-[var(--muted)]" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-[var(--accent)]">Docs</Link>
      <span className="px-2">/</span>
      <span>{route.name[language]}</span>
    </nav>
  );
}

function PageHeader({ page, children }) {
  const { language } = useLanguage();
  return (
    <header className="mb-8 border-b border-[var(--border)] pb-8">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{page.crumb[language]}</p>
      <h1 className="max-w-[760px] text-4xl font-semibold leading-tight tracking-normal text-[var(--text)] sm:text-5xl">{page.title[language]}</h1>
      {page.subtitle ? <p className="mt-5 max-w-[760px] text-base leading-7 text-[var(--muted)] sm:text-lg"><TextWithMistralLogo text={page.subtitle[language]} /></p> : null}
      {children}
    </header>
  );
}

function PageRenderer({ pageKey, page }) {
  if (pageKey === 'home') return <HomePage page={page} />;
  if (pageKey === 'trackRecord') return <TrackRecordPage page={page} />;
  if (pageKey === 'knowledgeSystem') return <KnowledgeSystemPage page={page} />;
  if (pageKey === 'principles') return <PrinciplesPage page={page} />;
  if (pageKey === 'experience') return <ExperienceIndexPage page={page} />;
  if (['dinum', 'bnp', 'education'].includes(pageKey)) return <ExperienceDetailPage pageKey={pageKey} page={page} />;
  if (pageKey === 'resume') return <ResumePage page={page} />;
  if (pageKey === 'contact') return <ContactPage page={page} />;
  return <HomePage page={pages.home} />;
}

function HomePage({ page }) {
  const { language, t } = useLanguage();
  const sectionTitle = (id) => page.sections.find((section) => section.id === id)?.title[language] || id;
  const proof = {
    FR: ['10+ ans de design produit', '1 500+ étudiants formés', '1 128 solutions d’IA documentées', '4 655+ contributions GitHub'],
    EN: ['10+ years Product Design', '1,500+ students trained', '1,128 AI solutions documented', '4,655+ GitHub contributions'],
  };
  const metadata = {
    FR: [
      ['Auteur', 'Tewfiq Ferahi'],
      ['Rôle', 'Designer Produit — Documentation'],
      ['Statut', 'Disponible'],
      ['Lieu', 'Paris'],
      ['Mis à jour', 'Juin 2026'],
      ['Créé avec', 'Mistral Vibe'],
      ['Temps de lecture', '8 min'],
    ],
    EN: [
      ['Author', 'Tewfiq Ferahi'],
      ['Role', 'Product Designer — Documentation'],
      ['Status', 'Available'],
      ['Location', 'Paris'],
      ['Updated', 'June 2026'],
      ['Built with', 'Mistral Vibe'],
      ['Reading time', '8 min'],
    ],
  };

  return (
    <>
      <PageHeader page={page}>
        <div className="mt-6 flex flex-wrap gap-2">
          <MistralVibeChip />
          <Chip>Paris</Chip>
          <Chip>{language === 'FR' ? 'Disponible' : 'Available'}</Chip>
          <Chip>Version 1.0</Chip>
        </div>
        <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proof[language].map((item) => (
            <div key={item} className="rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] p-3">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{language === 'FR' ? 'Preuve' : 'Proof'}</dt>
              <dd className="mt-1 text-sm font-medium leading-5 text-[var(--text)]">{item}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={shared.ctaUrl}>{t.book}</Button>
          <Button href="/resume" variant="secondary">{t.downloadResume}</Button>
        </div>
      </PageHeader>

      <Section id="metadata" title={sectionTitle('metadata')}>
        <MetadataTable rows={metadata[language]} />
        <Callout variant="information">
          {language === 'FR'
            ? 'Ce site est volontairement conçu comme un produit de documentation plutôt qu’un portfolio traditionnel. Il montre mon approche de l’architecture de l’information, des expériences d’apprentissage et de l’adoption produit.'
            : 'This website is intentionally designed as a documentation product rather than a traditional portfolio. It demonstrates how I approach information architecture, learning experiences and product adoption.'}
        </Callout>
      </Section>

      <Section id="interventions" title={sectionTitle('interventions')}>
        <InterventionSlideshow images={interventionImages[language]} />
      </Section>

      <Section id="quick-links" title={t.quickLinks}>
        <div className="grid gap-4 sm:grid-cols-2">
          {['trackRecord', 'knowledgeSystem', 'dinum', 'bnp', 'education'].map((key) => {
            const route = getRouteByKey(key);
            return <ClickableDocCard key={key} href={route.path} title={route.name[language]} description={pages[key].subtitle?.[language] || route.name[language]} />;
          })}
        </div>
      </Section>

      <Section id="selected-experience" title={t.selectedExperience}>
        <div className="grid gap-4 md:grid-cols-3">
          {experienceCards[language].map((card) => <ClickableDocCard key={card.route} href={card.route} title={card.title} description={card.description} />)}
        </div>
      </Section>
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
          {metrics[language].map((group) => <MetricGroup key={group.title} group={group} />)}
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
  return (
    <>
      <PageHeader page={page} />
      <Section id="workflow" title={page.sections[0].title[language]}>
        <WorkflowDiagram steps={workflowSteps[language]} />
      </Section>
      <Section id="knowledge-cards" title={page.sections[1].title[language]}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {knowledgeCards[language].map((title) => (
            <DocSurface key={title}>
              <h3 className="text-sm font-semibold text-[var(--text)]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {language === 'FR'
                  ? 'Une couche réutilisable du système pour rechercher, comparer, apprendre et décider.'
                  : 'A reusable layer in the system for research, comparison, learning and decisions.'}
              </p>
            </DocSurface>
          ))}
        </div>
      </Section>
      <Section id="placeholder" title={page.sections[2].title[language]}>
        <div className="rounded-lg border border-dashed border-[var(--accent-border)] bg-[var(--accent-soft)] p-8 text-sm text-[var(--muted)]">
          {language === 'FR' ? 'Emplacement prévu : capture Notion / base GenAI Solutions.' : 'Planned slot: Notion screenshot / GenAI Solutions database.'}
        </div>
      </Section>
    </>
  );
}

function PrinciplesPage({ page }) {
  const { language } = useLanguage();
  return (
    <>
      <PageHeader page={page} />
      <Section id="principles" title={page.sections[0].title[language]}>
        <div className="grid gap-4 md:grid-cols-2">
          {principles[language].map(([title, definition, why]) => <PrincipleCard key={title} title={title} definition={definition} why={why} />)}
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
        <div className="grid gap-4 md:grid-cols-3">
          {experienceCards[language].map((card) => <ClickableDocCard key={card.route} href={card.route} title={card.title} description={card.description} />)}
        </div>
      </Section>
    </>
  );
}

function ExperienceDetailPage({ page }) {
  const { language } = useLanguage();
  const body = page.body[language];
  return (
    <>
      <PageHeader page={page}>
        <div className="mt-6"><MetadataTable rows={page.metadata[language]} /></div>
      </PageHeader>
      {page.sections.map((section) => {
        const value = body[section.id];
        return (
          <Section key={section.id} id={section.id} title={section.title[language]}>
            {Array.isArray(value) ? <BulletList items={value} /> : <p className="text-sm leading-7 text-[var(--muted)]">{value}</p>}
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
        <MetadataTable rows={[
          [language === 'FR' ? 'Nom' : 'Name', 'Tewfiq Ferahi'],
          [language === 'FR' ? 'Rôle cible' : 'Target role', language === 'FR' ? 'Designer Produit — Documentation' : 'Product Designer — Documentation'],
          [language === 'FR' ? 'Domaines' : 'Domains', language === 'FR' ? 'Documentation, IA produit, systèmes de design, transmission' : 'Documentation, AI product, design systems, teaching'],
        ]} />
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
          <Button href="mailto:hello@tewfiq.com" variant="secondary">{t.email}</Button>
        </div>
      </Section>
    </>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-[var(--border)] py-8">
      <h2 className="mb-5 text-xl font-semibold text-[var(--text)]">{title}</h2>
      {children}
    </section>
  );
}

function Button({ href, children, variant = 'primary' }) {
  const className = cn(
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
    variant === 'primary'
      ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]'
      : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)]'
  );
  return href.startsWith('/') ? <Link href={href} className={className}>{children}</Link> : <a href={href} className={className}>{children}</a>;
}

function Chip({ children }) {
  return <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--text)]">{children}</span>;
}

function MistralLogo({ className = 'h-3.5 w-3.5' }) {
  return <img src="/mistral-color.svg" alt="" aria-hidden="true" className={cn('shrink-0', className)} />;
}

function MistralVibeChip() {
  const { language } = useLanguage();
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--text)]">
      <MistralLogo />
      {shared.mistralVibe[language]}
    </span>
  );
}

function TextWithMistralLogo({ text }) {
  if (!text.includes('Mistral')) return text;

  const parts = text.split(/(Mistral(?: AI| Vibe)?)/g);
  return parts.map((part, index) => {
    if (!part.startsWith('Mistral')) return part;
    return (
      <span key={`${part}-${index}`} className="inline-flex items-baseline gap-1.5 whitespace-nowrap font-medium text-[var(--text)]">
        <MistralLogo className="relative top-0.5 h-3.5 w-3.5" />
        {part}
      </span>
    );
  });
}

function MetadataTable({ rows }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <dl className="grid gap-px bg-[var(--border)] text-sm sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={`${label}-${value}`} className="grid grid-cols-[120px_1fr] gap-3 bg-[var(--surface)] px-4 py-3">
            <dt className="text-[var(--muted)]">{label}</dt>
            <dd className="font-medium text-[var(--text)]">{value === 'Mistral Vibe' ? <MistralVibeChip /> : value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Callout({ children, variant = 'note' }) {
  return (
    <div className="mt-5 rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] p-4">
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
        {group.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--muted)]"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />{item}</li>)}
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
          <span key={`${level}-${index}`} className={cn('h-3 w-3 rounded-[3px] border border-[var(--border)]', level === 0 && 'bg-[var(--surface-subtle)]', level === 1 && 'bg-[#fee5d8]', level === 2 && 'bg-[#ffba87]', level === 3 && 'bg-[#ff7a3d]', level === 4 && 'bg-[#bd3f16]')} />
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
              <span className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[var(--surface)] px-1 text-[var(--muted)] md:hidden">↓</span>
              <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-[var(--surface)] px-1 text-[var(--muted)] md:block">→</span>
            </>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function ClickableDocCard({ href, title, description }) {
  return (
    <Link href={href} className="group block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]" aria-label={title}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold text-[var(--text)]">{title}</h3>
        <span className="text-[var(--accent)] transition group-hover:translate-x-0.5">→</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{description}</p>
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
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{language === 'FR' ? 'Pourquoi c’est important' : 'Why it matters'}</p>
      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{why}</p>
    </DocSurface>
  );
}

function BulletList({ items }) {
  return <ul className="grid gap-3 sm:grid-cols-2">{items.map((item) => <li key={item} className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />{item}</li>)}</ul>;
}

function InterventionSlideshow({ images }) {
  const { language } = useLanguage();
  const [slides, setSlides] = useState(images);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    setSlides(shuffled);
    setActive(0);
    setReady(false);

    const preload = async () => {
      const preview = shuffled.slice(0, 2);
      await Promise.all(
        preview.map(
          (image) =>
            new Promise((resolve) => {
              const loaded = new window.Image();
              loaded.onload = resolve;
              loaded.onerror = resolve;
              loaded.src = image.src;
            })
        )
      );
      window.setTimeout(() => setReady(true), 220);
    };

    const timer = window.setTimeout(preload, 120);
    return () => window.clearTimeout(timer);
  }, [images]);

  useEffect(() => {
    if (!ready || paused || slides.length < 2) return undefined;
    let intervalId = null;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setActive((index) => {
          const next = index + 1;
          if (next >= slides.length) {
            const reshuffled = [...images].sort(() => Math.random() - 0.5);
            setSlides(reshuffled);
            return 0;
          }
          return next;
        });
      }, 4200);
    }, 1400);
    return () => {
      window.clearTimeout(startId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [paused, ready, slides.length, images]);

  const goTo = (index) => setActive((index + slides.length) % slides.length);
  const primarySlide = slides[active] || slides[0];

  if (!primarySlide) return null;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] transition duration-500',
        ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,0.98fr)_minmax(280px,1fr)]">
        <figure className="bg-[var(--surface)]">
          <div className="relative overflow-hidden bg-[var(--surface-subtle)]">
            <img
              src={primarySlide.src}
              alt={primarySlide.alt}
              loading="lazy"
              className={cn(
                'aspect-[3/4] w-full object-cover object-top transition duration-500 ease-out sm:aspect-[4/5] lg:aspect-[3/4]',
                ready ? 'animate-[slideshow-fade_420ms_ease-out]' : ''
              )}
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />
            <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#17130f] shadow-sm">
              {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </div>
          </div>
          <figcaption className="border-t border-[var(--border)] px-4 py-3 text-xs font-medium text-[var(--muted)]">
            {primarySlide.caption}
          </figcaption>
        </figure>
        <div className="flex min-h-[260px] flex-col justify-between border-t border-[var(--border)] p-4 lg:border-l lg:border-t-0">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              {language === 'FR' ? 'Preuve terrain' : 'Field evidence'}
            </p>
            <h3 className="mt-3 text-base font-semibold leading-6 text-[var(--text)]">{primarySlide.caption}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              {language === 'FR'
                ? 'Interventions, ateliers, cours et masterclass documentés comme traces concrètes de transmission.'
                : 'Talks, workshops, courses and masterclasses documented as concrete traces of teaching practice.'}
            </p>
            <div className="mt-5 grid gap-2 text-sm text-[var(--muted)]">
              {slides.slice(0, 3).map((slide) => (
                <div key={slide.src} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span className="truncate">{slide.caption}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="flex gap-1.5">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => goTo(index)}
                  className={cn(
                    'h-1.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
                    active === index ? 'w-6 bg-[var(--accent)]' : 'w-1.5 bg-[var(--border-strong)] hover:bg-[var(--muted)]'
                  )}
                  aria-label={language === 'FR' ? `Afficher l’intervention ${index + 1}` : `Show intervention ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => goTo(active - 1)} className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--muted)] transition hover:border-[var(--accent-border)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]" aria-label={language === 'FR' ? 'Intervention précédente' : 'Previous intervention'}>←</button>
              <button type="button" onClick={() => goTo(active + 1)} className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--muted)] transition hover:border-[var(--accent-border)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]" aria-label={language === 'FR' ? 'Intervention suivante' : 'Next intervention'}>→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MediaGrid({ images }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((image) => (
        <figure key={image.src} className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <img src={image.src} alt={image.alt} loading="lazy" className="h-56 w-full object-cover" />
          <figcaption className="border-t border-[var(--border)] px-4 py-3 text-xs font-medium text-[var(--muted)]">
            {image.caption}
          </figcaption>
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
          return <ClickableDocCard key={key} href={route.path} title={route.name[language]} description={pages[key].subtitle?.[language] || route.name[language]} />;
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
  return (
    <Link href={route.path} className={cn('group block rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]', alignRight && 'sm:text-right')}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{label}</span>
      <span className="mt-1 block text-sm font-medium text-[var(--text)] group-hover:text-[var(--accent)]">{route.name[language]}</span>
    </Link>
  );
}

function SearchModal({ open, onClose, language }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchIndex = useMemo(() => buildSearchIndex(language), [language]);
  const results = searchIndex.filter((item) => `${item.title} ${item.excerpt}`.toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  if (!open) return null;

  const navigate = (path) => {
    onClose();
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/35 p-4" role="dialog" aria-modal="true" aria-label={t.search}>
      <div className="mx-auto mt-20 max-w-xl overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xl">
        <div className="flex items-center gap-3 border-b border-[var(--border)] p-4">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
          />
          <button type="button" onClick={onClose} className="rounded-md px-2 py-1 text-xs text-[var(--muted)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">{t.close}</button>
        </div>
        <div className="max-h-[420px] overflow-y-auto p-2">
          {results.length ? results.map((item) => (
            <button key={`${item.path}-${item.title}`} type="button" onClick={() => navigate(item.path)} className="block w-full rounded-lg p-3 text-left hover:bg-[var(--accent-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
              <span className="block text-sm font-medium text-[var(--text)]">{item.title}</span>
              <span className="mt-1 block text-xs text-[var(--muted)]">{item.excerpt}</span>
            </button>
          )) : <p className="p-6 text-sm text-[var(--muted)]">{t.noResults}</p>}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const { language, t } = useLanguage();
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">Tewfiq Ferahi</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{t.footerRole}</p>
            <p className="mt-4 inline-flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]"><MistralVibeChip /> <span>Next.js, Tailwind, Vercel</span></p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm" aria-label="Footer">
            <a className="text-[var(--accent)] hover:text-[var(--accent-hover)]" href={shared.ctaUrl}>{t.book}</a>
            <a className="text-[var(--muted)] hover:text-[var(--accent)]" href="#">LinkedIn</a>
            <a className="text-[var(--muted)] hover:text-[var(--accent)]" href="#">GitHub</a>
            <a className="text-[var(--muted)] hover:text-[var(--accent)]" href="mailto:hello@tewfiq.com">{language === 'FR' ? 'E-mail' : 'Email'}</a>
          </nav>
        </div>
      </div>
      <div className="grid h-2 grid-cols-4" aria-hidden="true"><span className="bg-[#fff4d6]" /><span className="bg-[#ffd45a]" /><span className="bg-[#ff8a3d]" /><span className="bg-[#c7361d]" /></div>
    </footer>
  );
}
