import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Documentation de candidature — Tewfiq Ferahi</title>
        <meta
          name="description"
          content="Designer Produit — Documentation. Un site candidat conçu comme un produit de documentation pour Mistral AI."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://doc.tfq.one/" />
        <meta property="og:title" content="Documentation de candidature — Tewfiq Ferahi" />
        <meta
          property="og:description"
          content="Je conçois la documentation comme un produit : systèmes de connaissances, documentation et expériences d’apprentissage pour les produits d’IA."
        />
        <meta property="og:image" content="https://doc.tfq.one/og-card.png" />
        <meta property="og:image:secure_url" content="https://doc.tfq.one/og-card.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Documentation de candidature de Tewfiq Ferahi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Documentation de candidature — Tewfiq Ferahi" />
        <meta
          name="twitter:description"
          content="Designer Produit — Documentation. Un site candidat conçu comme un produit de documentation."
        />
        <meta name="twitter:image" content="https://doc.tfq.one/og-card.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
