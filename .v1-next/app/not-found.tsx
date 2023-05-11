import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen lg:min-h-inner-screen-lg">
      <div className="absolute z-0 flex flex-col items-center justify-center gap-4 -translate-x-1/2 -translate-y-1/2 left-1/2 top-error lg:top-error-lg">
        <h1 className="text-4xl font-secondary">404</h1>
        <p className="text-center tet-2xl">Strona nie istnieje ¯\_(ツ)_/¯</p>
        <Link href="/" className="button w-max">
          Zabierz mnie stąd!
        </Link>
      </div>
    </section>
  );
}
