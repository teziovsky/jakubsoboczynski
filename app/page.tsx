import { Metadata } from "next";
import AboutMe from "../views/about-me";
import Contact from "../views/contact";
import Hero from "../views/hero";
import Projects from "../views/projects";

export const metadata: Metadata = {
  title: "Hello! | Jakub Soboczyński",
  description: "My own page.",
  openGraph: {
    title: "Hello! | Jakub Soboczyński",
    description: "My own page.",
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
