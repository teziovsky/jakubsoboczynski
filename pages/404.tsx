import Link from "next/link";
import Layout from "../layouts/layout";

const Error404 = () => {
  return (
    <Layout className="relative min-h-inner-screen lg:min-h-inner-screen-lg">
      <section className="absolute z-0 flex flex-col items-center justify-center gap-4 -translate-x-1/2 -translate-y-1/2 left-1/2 top-error lg:top-error-lg">
        <h1 className="text-4xl font-secondary">404</h1>
        <p className="text-center tet-2xl">Strona nie istnieje ¯\_(ツ)_/¯</p>
        <Link href="/">
          <a className="button w-max">Zabierz mnie stąd!</a>
        </Link>
      </section>
    </Layout>
  );
};

export default Error404;
