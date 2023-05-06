import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter, Space_Mono } from "next/font/google";
import "assets/styles/main.css";

const inter = Inter({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-inter" });

const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" });

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
      <div className={`${inter.variable} ${spaceMono.variable} font-primary container px-4 lg:px-20`}>
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default MyApp;
