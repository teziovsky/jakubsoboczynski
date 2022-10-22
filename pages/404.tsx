import Link from "next/link";
import React from "react";
import Layout from "../layouts/layout";

const Error404 = () => {
  return (
    <Layout className="min-h-inner-screen lg:min-h-inner-screen-lg relative">
      <section className="absolute z-0 left-1/2 flex flex-col gap-4 items-center justify-center top-error lg:top-error-lg -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-secondary text-4xl">404</h1>
        <p className="tet-2xl text-center">Strona nie istnieje ¯\_(ツ)_/¯</p>
        <Link href="/">
          <a className="button w-max">Zabierz mnie stąd!</a>
        </Link>
      </section>
    </Layout>
  );
};

export default Error404;
