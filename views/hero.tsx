import React from "react";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen">
      <div className="absolute w-full flex flex-col items-center left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2">
        <p className="mb-3 font-secondary text-hero-greet">Cześć, jestem</p>
        <h1 className="relative text-hero-title mb-3 pb-6 after:content-[''] after:absolute after:left-1/2 after:w-[40px] after:h-px after:bottom-0 after:bg-font-dark dark:after:bg-font-light after:transition-colors after:-translate-x-1/2">
          Jakub
        </h1>
        <p className="text-hero-subtitle opacity-70 font-secondary">Frontend developer</p>
      </div>
      <a
        className="flex group inset-x-1/3 bottom-28 md:bottom-16 flex-col items-center my-0 mx-auto py-1 px-5 absolute hover:animate-bounce -translate-y-1/4"
        href="#projekty">
        <span className="font-secondary relative group-hover:opacity-100 group-hover:translate-y-0 -translate-y-10 duration-500 opacity-0 text-button-span pointer-events-none transition text-font-dark dark:text-font-light whitespace-nowrap">
          Przejdź do projektów
        </span>
        <svg className="w-5" fill="none" height="62" viewBox="0 0 29 62" width="29" xmlns="http://www.w3.org/2000/svg">
          <path
            className="transition-colors stroke-font-dark dark:stroke-font-light"
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
