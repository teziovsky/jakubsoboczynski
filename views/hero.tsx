import React from "react";

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero__wrapper">
        <p className="hero__greet">Cześć, jestem</p>
        <h1 className="hero__title">Jakub</h1>
        <p className="hero__subtitle">Frontend developer</p>
      </div>
      <a className="hero__cta" href="#projekty">
        <span>Przejdź do projektów</span>
        <svg
          className="hero__diamant"
          fill="none"
          height="62"
          viewBox="0 0 29 62"
          width="29"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24.2716 27.66L14.5216 57L4.79141 27.72M24.2716 27.66L27.0431 19.32L14.5216 3L2 19.32L4.79141 27.72M24.2716 27.66L14.5216 15L4.79141 27.72"
            stroke="white"
            strokeWidth="3"
          />
        </svg>
      </a>
    </section>
  );
};

export default Hero;
