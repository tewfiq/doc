import '../styles/globals.css';
import Head from 'next/head';
import React from 'react';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px', background: 'var(--bg)', color: 'var(--text)' }}>
          <div style={{ maxWidth: '640px', width: '100%', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', background: 'var(--surface)' }}>
            <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              Rendering error
            </p>
            <h1 style={{ margin: '12px 0 0', fontSize: '28px', lineHeight: 1.15 }}>The page failed to render.</h1>
            <p style={{ margin: '12px 0 0', color: 'var(--muted)', lineHeight: 1.6 }}>
              Refresh the page. If this keeps happening, there is still a client-side crash to fix.
            </p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default function App({ Component, pageProps }) {
  return (
    <AppErrorBoundary>
      <Head>
        <title>Knowledge Engineering — Tewfiq Ferahi</title>
        <meta
          name="description"
          content="Knowledge Engineering by Tewfiq Ferahi. Documentation by Tewfiq Ferahi."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://doc.tfq.one/" />
        <meta property="og:title" content="Knowledge Engineering — Tewfiq Ferahi" />
        <meta
          property="og:description"
          content="Knowledge Engineering by Tewfiq Ferahi. Documentation by Tewfiq Ferahi."
        />
        <meta property="og:image" content="https://doc.tfq.one/og-card.png" />
        <meta property="og:image:secure_url" content="https://doc.tfq.one/og-card.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Knowledge Engineering by Tewfiq Ferahi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Knowledge Engineering — Tewfiq Ferahi" />
        <meta
          name="twitter:description"
          content="Knowledge Engineering by Tewfiq Ferahi. Documentation by Tewfiq Ferahi."
        />
        <meta name="twitter:image" content="https://doc.tfq.one/og-card.png" />
      </Head>
      <Component {...pageProps} />
    </AppErrorBoundary>
  );
}
