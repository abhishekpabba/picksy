import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify Giveaway Draw | Picksy',
  description: 'View a shared Picksy giveaway draw record.',
  robots: { index: false, follow: false, noarchive: true }
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
