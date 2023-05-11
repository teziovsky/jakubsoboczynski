import "assets/styles/main.css";
import Footer from "components/footer";
import Header from "components/header";
import SocialLinks from "components/social-links";
import { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-inter" });

const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" });

export const metadata: Metadata = {
  viewport: "width=device-width,initial-scale=1",
  keywords: "Jakub Soboczyński, Portfolio, Front-End Developer,Frontend Developer, Front-End, Frontend, Developer",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl-PL">
      <head>
        <meta charSet="utf-8" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.variable} ${spaceMono.variable} font-primary`}>
        <Header />
        <SocialLinks />
        {children}
        <Footer className="pt-12 mb-8 lg:pt-0" />
        <SocialLinks className="flex items-center justify-center pb-12 gap-x-8 lg:hidden" />
      </body>
    </html>
  );
}
