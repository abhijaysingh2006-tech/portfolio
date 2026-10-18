import type { Metadata } from 'next';
import './globals.css';
import { DEFAULT_PROFILE } from '@/data/default-profile';

export const metadata: Metadata = {
  title: `${DEFAULT_PROFILE.name} — Systems Portfolio`,
  description: `${DEFAULT_PROFILE.bio} Distributed systems, low-latency architectures, and reactive engineering.`,
  metadataBase: new URL('https://systems-portfolio.dev'),
  openGraph: {
    title: `${DEFAULT_PROFILE.name} — Systems Portfolio`,
    description: 'Award-grade systems portfolio featuring distributed engines, Raft consensus, and interactive 3D telemetry.',
    url: 'https://systems-portfolio.dev',
    siteName: `${DEFAULT_PROFILE.name} Portfolio`,
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: `${DEFAULT_PROFILE.name} — Systems Portfolio Preview`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${DEFAULT_PROFILE.name} — Systems Portfolio`,
    description: 'Distributed systems, low-latency concurrency, and interactive 3D architecture diagrams.',
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Person Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: DEFAULT_PROFILE.name,
    jobTitle: DEFAULT_PROFILE.role,
    url: 'https://systems-portfolio.dev',
    sameAs: [
      `https://github.com/${DEFAULT_PROFILE.username}`,
      DEFAULT_PROFILE.linkedin,
      DEFAULT_PROFILE.twitter,
    ].filter(Boolean),
    knowsAbout: [
      'Distributed Systems',
      'Raft Consensus',
      'Rust',
      'Go',
      'eBPF',
      'ClickHouse',
      'Next.js',
      'Three.js',
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="editorial-grid min-h-screen relative antialiased selection:bg-electric-blue selection:text-white">
        {children}
      </body>
    </html>
  );
}
