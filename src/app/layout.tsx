import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monica Fiocco | Counselor & Psicopedagogista",
  description: "Monica Fiocco - Counselor ad approccio integrato, psicopedagogista e formatrice. Ti accompagno in percorsi di crescita, costellazioni familiari e pedagogia transgenerazionale.",
  keywords: ["counselor napoli", "psicopedagogista", "costellazioni familiari", "crescita personale", "pedagogia transgenerazionale", "monica fiocco"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  verification: {
    google: "aMX-uQBUJ8Fv2gUxOM7S4ShUzTAAFmjmAaxeIUarGCA",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full">
      <body className={`${inter.variable} ${outfit.variable} min-h-full flex flex-col antialiased bg-white text-slate-900`}>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QSDWEL3LY8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QSDWEL3LY8');
          `}
        </Script>

        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
