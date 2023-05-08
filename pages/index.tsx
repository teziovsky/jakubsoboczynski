import Meta from "components/seo-meta";
import Layout from "layouts/layout";
import AboutMe from "../views/about-me";
import Contact from "../views/contact";
import Hero from "../views/hero";
import Projects from "../views/projects";

export default function Home() {
  return (
    <>
      <Meta title="Hello!" description="My own page." />
      <Layout>
        <Hero />
        <AboutMe />
        <Projects />
        <Contact />
      </Layout>
    </>
  );
}
