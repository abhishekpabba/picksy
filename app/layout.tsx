import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Poll Maker & Image Voting Tool | Picksy',
  description: 'Create free online polls in seconds with Picksy. Compare images, rank ideas, choose dates, plan potlucks, collect feedback and share voting polls by link or QR code.',
  keywords: ['free online poll maker','image poll','image voting tool','online voting tool','poll creator','quick poll','ranking poll','date poll','potluck poll','feedback poll','AI image comparison'],
  alternates: { canonical: 'https://picksy-topaz.vercel.app/' },
  openGraph: {
    type: 'website',
    title: 'Picksy — Free Online Poll Maker & Image Voting Tool',
    description: "Can't decide? Ask your people. Create image polls, voting polls, rankings, date polls and more in seconds.",
    url: 'https://picksy-topaz.vercel.app/',
    siteName: 'Picksy'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Picksy — Free Online Poll Maker',
    description: 'Create and share quick polls, image comparisons, rankings, date polls and group decisions.'
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
  description: 'Free online poll maker for image voting, multiple choice polls, rankings, ratings, date polls, potlucks and feedback.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['Image polls','Multiple choice polls','Ranking polls','Star ratings','Date polls','Potluck planning','Feedback polls','Yes or no polls','QR sharing','Live result charts']
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#6d5dfc" />
        <link rel="stylesheet" href="/styles.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
