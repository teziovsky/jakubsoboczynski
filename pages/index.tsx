import Meta from "components/seo-meta";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Meta title="Hello!" description="My own page." />
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </>
  );
};

export default Home;
