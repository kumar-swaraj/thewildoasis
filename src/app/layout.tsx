import Header from '@/components/Header';
import { ReservationProvider } from '@/contexts/ReservationContext';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import { twJoin } from 'tailwind-merge';

const josefin_sans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s / The Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
  description:
    'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forest.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={twJoin(
          josefin_sans.className,
          'flex min-h-screen flex-col bg-primary-950 text-primary-100 antialiased'
        )}>
        <Header />
        <div className="grid flex-1 px-8 py-12">
          <main className="mx-auto w-full max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
