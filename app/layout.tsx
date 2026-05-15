import type {Metadata} from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Patinhas de Esperança - Vaquinha Solidária',
  description: 'Ajude a transformar a vida de animais esquecidos em situação de rua. Sua doação é um ato de amor e esperança.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased text-[#2D2926] bg-[#F9F7F2]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
