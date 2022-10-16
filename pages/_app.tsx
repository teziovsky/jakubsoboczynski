import type { AppProps } from "next/app";
import Head from "next/head";
import "assets/styles/main.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="keywords"
          content="Jakub Soboczyński, Portfolio, Front-End Developer,Frontend Developer, Front-End, Frontend, Developer"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
