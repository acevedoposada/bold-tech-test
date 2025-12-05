import { Montserrat } from 'next/font/google';
import type { Metadata } from 'next';

import Header from '@/shared/components/header';

import '@/assets/fonts/custom-icons/style.css';
import './globals.css';
import SplashScreen from '@/shared/components/splash-screen';
import InitializeServices from '@/shared/components/initialize-services';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bold | Tus movimientos',
  description:
    'Esta aplicación esta hecha con el objetivo de desarrollar la prueba técnica para aplicar a la vacante de Frontend Engineer de Bold.co',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-svh">
      <body
        className={`${montserrat.variable} antialiased h-full`}
        suppressHydrationWarning
      >
        <Header />
        <main className="h-[calc(100%-7rem)] px-4 lg:px-8">{children}</main>
        <SplashScreen />
        <InitializeServices />
      </body>
    </html>
  );
}
