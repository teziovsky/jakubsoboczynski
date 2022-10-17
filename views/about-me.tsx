import cx from "classnames";
import aboutMe from "content/about-me.json";
import Image from "next/image";
import React, { useState } from "react";

const AboutMe = () => {
  const [selectedDescription, setSelectedDescription] = useState({ ...aboutMe[0] });

  return (
    <section id="o_mnie" className="py-24">
      <h2 className="section-header">O mnie</h2>
      <div className="mx-auto block max-w-about-me-image image-overlay mb-8">
        <Image src="/images/profile.webp" width={300} height={300} layout="responsive" alt="Moje zdjęcie profilowe" />
      </div>
      <div className="flex-center flex-wrap mb-5 flex-col md:flex-row gap-x-4 gap-y-7">
        {aboutMe.map((category) => (
          <button
            key={category.id}
            aria-label={`Wyświetl treść kategorii - ${category.title}`}
            className={cx(
              "relative font-secondary text-lg capitalize py-3 px-6 text-font-dark dark:text-font-light hover:text-accent-light hover:dark:text-accent-dark hover:shadow-button hover:shadow-accent-light/50 hover:dark:shadow-accent-dark/50 transition after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:bg-accent-light after:dark:bg-accent-dark after:opacity-0 after:transition after:-translate-x-1/2 after:h-px after:w-1/2",
              { "after:opacity-100": selectedDescription.id === category.id }
            )}
            onClick={() => setSelectedDescription(category)}>
            {category.title}
          </button>
        ))}
      </div>
      <p className="max-w-[700px] text-center md:text-justify mx-auto text-lg font-light">
        {selectedDescription.description}
      </p>
    </section>
  );
};

export default AboutMe;
