import React, { useEffect } from "react";

function hideMenu() {
  const wrapper = document.querySelector(".nav__wrapper");
  if (wrapper) wrapper.classList.remove("opened");
  const burger = document.querySelector(".nav__burger");
  if (burger) burger.classList.remove("opened");
  const body = document.querySelector("body");
  if (body) body.removeAttribute("class");
}

function detectMobile() {
  const width = window.innerWidth > 0 ? window.innerWidth : document.documentElement.clientWidth;
  const nav = document.querySelector(".nav__wrapper");
  if (width > 768) {
    if (nav) nav.classList.remove("mobile");
    hideMenu();
  } else if (nav) nav.classList.add("mobile");
}

function toggleMenu() {
  const wrapper = document.querySelector(".nav__wrapper");
  if (wrapper) wrapper.classList.toggle("opened");
  const burger = document.querySelector(".nav__burger");
  if (burger) burger.classList.toggle("opened");
  const body = document.querySelector("body");
  if (body) body.classList.toggle("opened");
}

const Header = () => {
  useEffect(() => {
    detectMobile();
    window.addEventListener("resize", detectMobile);
  }, []);

  return (
    <header>
      <nav>
        <button aria-label="Pokaż/Ukryj nawigację serwisu" className="nav__burger" onClick={() => toggleMenu()}>
          <span></span>
        </button>
        <div className="nav__wrapper">
          <a aria-label="Przejdź do sekcji o mnie" className="nav__link link" href="#o_mnie" onClick={() => hideMenu()}>
            o mnie
          </a>
          <a
            aria-label="Przejdź do sekcji projekty"
            className="nav__link link"
            href="#projekty"
            onClick={() => hideMenu()}>
            projekty
          </a>
          <a
            aria-label="Przejdź do sekcji kontakt"
            className="nav__link link"
            href="#kontakt"
            onClick={() => hideMenu()}>
            kontakt
          </a>
        </div>
      </nav>
      <svg
        className="header__logo"
        fill="none"
        height="113"
        viewBox="0 0 93 113"
        width="93"
        xmlns="http://www.w3.org/2000/svg">
        <title>Logo serwisu jakubsoboczynski.pl</title>
        <path
          d="M46.7376 104.089V112M46.7376 112H38.0787L24.3421 91.3683L2 73.516L10.6055 56.5724M46.7376 112H55.2896L69.0262 91.3683L91.3683 73.516L82.7629 56.5724M10.6055 56.5724L8.89505 2L10.6055 2.05345L38.0787 30.0078M10.6055 56.5724L38.0787 30.0078M10.6055 56.5724L46.7376 78.1127M82.7629 56.5724L46.7376 78.1127M82.7629 56.5724L84.4733 2.00001H82.7629L55.2896 30.0078M82.7629 56.5724L55.2896 30.0078M38.0787 30.0078H46.7376M46.7376 78.1127L55.436 51.9757M46.7376 78.1127L38.0569 52.0292M46.7376 30.0078L35.5666 44.5462L38.0569 52.0292M46.7376 30.0078L57.9086 44.5462L55.436 51.9757M46.7376 30.0078H55.2896M55.436 51.9757L46.7376 40.6978L38.0569 52.0292M66.1399 66.4072H74.0505L67.5296 72.1263L54.274 73.8902L65.1778 67.1555M27.5491 66.4072H19.6385L26.1594 72.1263L39.415 73.8902L28.5112 67.1555L27.5491 66.4072Z"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </header>
  );
};

export default Header;
