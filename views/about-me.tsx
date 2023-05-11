"use client";

import aboutMe from "content/about-me.json";
import { cn } from "helpers";
import { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function AboutMe() {
  const [selectedDescription, setSelectedDescription] = useState({ ...aboutMe[0] });

  return (
    <section id="o_mnie" className="py-24">
      <h2 className="section-header">O mnie</h2>
      <div className="block mx-auto mb-8 max-w-about-me-image image-overlay">
        <img src="/images/profile.webp" width={300} height={300} loading="lazy" alt="Moje zdjęcie profilowe" />
      </div>
      <div className="flex-col flex-wrap mb-5 flex-center lg:flex-row gap-x-4 gap-y-3 md:gap-y-7">
        {aboutMe.map((category) => (
          <button
            key={category.id}
            aria-label={`Wyświetl treść kategorii - ${category.title}`}
            className={cn(
              "relative font-secondary text-sm md:text-lg capitalize py-3 px-3 md:py-3 md:px-6 text-font-dark dark:text-font-light hover:text-accent-light hover:dark:text-accent-dark hover:shadow-button hover:shadow-accent-light/50 hover:dark:shadow-accent-dark/50 transition after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:bg-accent-light after:dark:bg-accent-dark after:opacity-0 after:transition after:-translate-x-1/2 after:h-px after:w-1/2",
              { "after:opacity-100": selectedDescription.id === category.id }
            )}
            onClick={() => setSelectedDescription(category)}>
            {category.title}
          </button>
        ))}
      </div>
      <SwitchTransition>
        <CSSTransition
          key={selectedDescription.description}
          classNames="shrink"
          addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}>
          <p
            key={selectedDescription.description}
            className="max-w-[700px] text-center lg:text-justify mx-auto text-sm md:text-lg font-light">
            {selectedDescription.description}
          </p>
        </CSSTransition>
      </SwitchTransition>
    </section>
  );
}
