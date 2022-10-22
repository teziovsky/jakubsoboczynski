import Meta from "components/seo-meta";
import Layout from "layouts/layout";
import type { NextPage } from "next";
import AboutMe from "../views/about-me";
import Contact from "../views/contact";
import Hero from "../views/hero";
import Projects from "../views/projects";

const Home: NextPage = () => {
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
};

export default Home;
