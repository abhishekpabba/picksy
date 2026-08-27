import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Giveaway Winner Picker – Random Contest Picker | Picksy',
  description: 'Pick fair giveaway winners from a pasted entrant list. Automatically remove duplicate entries, draw multiple winners and share a verifiable result link.',
  keywords: ['giveaway winner picker','random winner picker','contest winner picker','raffle picker','Instagram giveaway picker','random giveaway picker','draw winners'],
  alternates: { canonical: 'https://picksy-topaz.vercel.app/giveaway' },
  openGraph: {
    title: 'Free Giveaway Winner Picker | Picksy',
    description: 'Remove duplicate entrants, draw random winners and share the result. Free and no login required.',
    url: 'https://picksy-topaz.vercel.app/giveaway',
    type: 'website',
    siteName: 'Picksy'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Giveaway Winner Picker | Picksy',
    description: 'Remove duplicates, draw random giveaway winners and share the result.'
  }
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Picksy Giveaway Winner Picker',
  url: 'https://picksy-topaz.vercel.app/giveaway',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  description: 'Free random giveaway and contest winner picker with duplicate removal, multiple winners and shareable draw records.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['Random winner picker','Duplicate entrant removal','Multiple winners','Shareable draw record','No entrant account required']
};

export default function GiveawayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></>;
}
