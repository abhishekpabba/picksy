import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Picksy — Polls, Spin Wheel & Giveaway Winner Picker',
  description: 'Create free polls, compare images, spin a random wheel, deduplicate giveaway entries and pick winners in seconds with Picksy.',
  keywords: ['free online poll maker','spin wheel','wheel of names','random name picker','giveaway winner picker','raffle winner picker','image poll','online voting tool','poll creator'],
  alternates: { canonical: 'https://picksy-topaz.vercel.app/' },
  openGraph: {
    type: 'website',
    title: 'Picksy — Poll it. Spin it. Pick a winner.',
    description: 'Free polls, random spin wheel and giveaway winner picker in one simple tool.',
    url: 'https://picksy-topaz.vercel.app/',
    siteName: 'Picksy'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Picksy — Polls, Spin Wheel & Giveaway Picker',
    description: 'Poll it. Spin it. Pick a winner.'
  },
  robots: { index: true, follow: true }
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Picksy',
  url: 'https://picksy-topaz.vercel.app/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  description: 'Free online polls, random spin wheel and giveaway winner picker.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['Image polls','Multiple choice polls','Ranking polls','Random spin wheel','Wheel of names','Giveaway winner picker','Duplicate entrant removal','Multiple winners','Shareable draw records','QR sharing']
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#6d5dfc" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/tools.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
