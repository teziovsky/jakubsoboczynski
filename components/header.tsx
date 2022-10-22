import cx from "classnames";
import { BREAKPOINTS, isMobile } from "helpers";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useBreakpoint from "use-breakpoint";

const Header = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [opened, setOpened] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    const body = document.querySelector("body");
    if (body && opened) body.classList.add("overflow-hidden", "touch-none");
    if (body && !opened) body.classList.remove("overflow-hidden", "touch-none");
    if (!isMobile(breakpoint)) setOpened(false);
  }, [breakpoint, opened]);

  return (
    <header className="absolute z-10 top-0 inset-x-0">
      {pathname !== "/404" && (
        <nav className="flex justify-between items-center py-8 px-5 lg:px-12">
          <button
            aria-label="Pokaż/Ukryj nawigację serwisu"
            className="relative z-50 w-12 h-9 py-px px-[7px] lg:hidden group"
            onClick={() => setOpened((prevState) => !prevState)}>
            <span
              className={cx(
                "relative w-full h-[3px] block text-center bg-font-dark dark:bg-font-light rounded-sm my-0 mx-auto transition-all duration-1000 before:content-[''] after:content-[''] before:absolute after:absolute before:left-0 after:left-0 before:w-full after:w-full before:h-[3px] after:h-[3px] before:bg-font-dark after:bg-font-dark dark:before:bg-font-light dark:after:bg-font-light before:rounded-sm after:rounded-sm before:transition-all after:transition-all before:duration-1000 after:duration-1000 after:-bottom-[10px] group-hover:bg-accent-light dark:group-hover:bg-accent-dark group-hover:before:bg-accent-light dark:group-hover:before:bg-accent-dark group-hover:after:bg-accent-light dark:group-hover:after:bg-accent-dark",
                {
                  "bg-font-dark/0 dark:bg-font-light/0 group-hover:bg-font-dark/0 group-hover:dark:bg-font-light/0 before:top-0 before:rotate-[135deg] after:top-0 after:rotate-[225deg]":
                    opened,
                  "before:-top-[10px]": !opened,
                }
              )}></span>
          </button>
          <div
            className={cx(
              "flex-center text-base gap-x-4 invisible -translate-x-full lg:visible lg:-translate-x-0 fixed lg:static flex-col lg:flex-row bg-secondary-light dark:bg-secondary-dark lg:bg-transparent lg:dark:bg-transparent transition-all duration-700 lg:transition-none h-full lg:h-auto gap-y-7 lg:gap-y-0 px-5 pt-28 pb-20 lg:px-0 lg:pt-0 lg:pb-0 z-40 lg:z-0 top-0 left-0 right-0 text-2xl lg:text-base",
              {
                "!visible !translate-x-0": opened,
              }
            )}>
            <a
              aria-label="Przejdź do sekcji o mnie"
              className="font-secondary py-2 px-4 after:bottom-1 w-2/5 link text-center"
              href="#o_mnie"
              onClick={() => setOpened(false)}>
              o mnie
            </a>
            <a
              aria-label="Przejdź do sekcji projekty"
              className="font-secondary py-2 px-4 after:bottom-1 w-2/5 link text-center"
              href="#projekty"
              onClick={() => setOpened(false)}>
              projekty
            </a>
            <a
              aria-label="Przejdź do sekcji kontakt"
              className="font-secondary py-2 px-4 after:bottom-1 w-2/5 link text-center"
              href="#kontakt"
              onClick={() => setOpened(false)}>
              kontakt
            </a>
          </div>
        </nav>
      )}
      <svg
        className="absolute z-30 left-1/2 -translate-x-1/2 origin-top w-logo top-logo"
        fill="none"
        height="113"
        viewBox="0 0 93 113"
        width="93"
        xmlns="http://www.w3.org/2000/svg">
        <title>Logo serwisu jakubsoboczynski.pl</title>
        <path
          className="stroke-font-dark dark:stroke-font-light transition-colors"
          d="M46.7376 104.089V112M46.7376 112H38.0787L24.3421 91.3683L2 73.516L10.6055 56.5724M46.7376 112H55.2896L69.0262 91.3683L91.3683 73.516L82.7629 56.5724M10.6055 56.5724L8.89505 2L10.6055 2.05345L38.0787 30.0078M10.6055 56.5724L38.0787 30.0078M10.6055 56.5724L46.7376 78.1127M82.7629 56.5724L46.7376 78.1127M82.7629 56.5724L84.4733 2.00001H82.7629L55.2896 30.0078M82.7629 56.5724L55.2896 30.0078M38.0787 30.0078H46.7376M46.7376 78.1127L55.436 51.9757M46.7376 78.1127L38.0569 52.0292M46.7376 30.0078L35.5666 44.5462L38.0569 52.0292M46.7376 30.0078L57.9086 44.5462L55.436 51.9757M46.7376 30.0078H55.2896M55.436 51.9757L46.7376 40.6978L38.0569 52.0292M66.1399 66.4072H74.0505L67.5296 72.1263L54.274 73.8902L65.1778 67.1555M27.5491 66.4072H19.6385L26.1594 72.1263L39.415 73.8902L28.5112 67.1555L27.5491 66.4072Z"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </header>
  );
};

export default Header;
