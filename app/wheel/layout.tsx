import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wheel of Names – Free Random Name Picker | Picksy',
  description: 'Spin a free wheel of names to pick a random winner, student, team member, task or choice. No login required and up to 100 entries.',
  keywords: ['wheel of names','random name picker','spin the wheel','random wheel','name spinner','wheel spinner','random picker','student name picker'],
  alternates: { canonical: 'https://picksy-topaz.vercel.app/wheel' },
  openGraph: {
    title: 'Wheel of Names – Free Random Name Picker | Picksy',
    description: 'Paste names, spin the wheel and pick a random winner fairly. Free and no login required.',
    url: 'https://picksy-topaz.vercel.app/wheel',
    type: 'website',
    siteName: 'Picksy'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wheel of Names – Free Random Name Picker | Picksy',
    description: 'Paste names, spin the wheel and pick a random winner fairly.'
  }
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Picksy Wheel of Names',
  url: 'https://picksy-topaz.vercel.app/wheel',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  description: 'Free wheel of names and random name picker for choosing a winner, person, task or option.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['Wheel of names','Random name picker','Up to 100 entries','Shuffle entries','Remove winner','Winner history']
};

export default function WheelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></>;
}
