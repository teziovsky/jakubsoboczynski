import { Metadata } from "next";
import AboutMe from "components/about-me";
import Contact from "components/contact";
import Hero from "components/hero";
import Projects from "components/projects";

const siteName = "Jakub Soboczyński";
const siteTitle = "Hello!";
const siteDescription = "My own page.";
const siteImage = "/images/profile.webp";

export const metadata: Metadata = {
  title: `${siteTitle} | ${siteName}`,
  description: siteDescription,
  alternates: {
    canonical: process.env.NEXT_PUBLIC_URL,
  },
  authors: {
    name: "Jakub Soboczyński",
    url: "https://twitter.com/teziovsky/",
  },
  generator: "Next.js",
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_URL,
    title: `${siteTitle} | ${siteName}`,
    description: siteDescription,
    siteName: siteName,
    images: siteImage,
    locale: "pl_PL",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteTitle} | ${siteName}`,
    description: siteDescription,
    site: siteName,
    creator: "@teziovsky",
    images: siteImage,
  },
};

export default function Page() {
  return (
    <>
      <Hero />
      <AboutMe />
      <Projects />
      <Contact />
    </>
  );
}
