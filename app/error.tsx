"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="absolute z-0 flex flex-col items-center justify-center gap-4 -translate-x-1/2 -translate-y-1/2 left-1/2 top-error lg:top-error-lg">
      <h1 className="text-4xl font-secondary">404</h1>
      <p className="text-center tet-2xl">Strona nie istnieje ¯\_(ツ)_/¯</p>
      <button className="button w-max" onClick={() => reset()}>
        Zabierz mnie stąd!
      </button>
    </section>
  );
}
