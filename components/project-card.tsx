import Image from "next/image";
import React from "react";
import { imageLoader } from "../helpers";

type Props = {
  id: number;
  title: string;
  description: string;
  technologies: string;
  source: string;
  demo: string;
  image: string;
};

const ProjectCard = ({ title, description, technologies, source, demo, image }: Props) => {
  return (
    <div className="mx-auto mt-0 mb-16 pb-10 relative max-w-[550px]">
      <h3 className="mb-8 text-lg font-normal text-center font-secondary md:text-2xl">{title}</h3>
      <div className="image-overlay">
        <Image
          alt={`Zrzut ekranu aplikacji - ${title}`}
          src={image}
          loader={imageLoader}
          loading="lazy"
          className="block w-full"
          height={309.38}
          width={550}
        />
      </div>
      <a
        aria-label={`Przejdź do plików źródłowych projektu - ${title}`}
        href={source}
        className="absolute bottom-0 left-0 p-1 transition-transform w-7 h-7 lg:w-8 lg:h-8 flex-center hover:scale-110 hover:translate-y-2 group"
        rel="noreferrer nofollow noopener"
        target="_blank">
        <svg fill="none" height="38" viewBox="0 0 35 38" width="35" xmlns="http://www.w3.org/2000/svg">
          <path
            className="transition-colors stroke-font-dark dark:stroke-font-light group-hover:stroke-accent-light group-hover:dark:stroke-accent-dark group-hover:text-accent-light dark:group-hover:text-accent-dark"
            d="M24.3036 36.9374V30.4957C24.366 29.7019 24.2588 28.904 23.989 28.155C23.7193 27.4059 23.2931 26.7228 22.7389 26.1512C27.9656 25.5686 33.4586 23.5878 33.4586 14.4994C33.4582 12.1754 32.5642 9.94055 30.9618 8.25736C31.7206 6.22414 31.6669 3.97674 30.812 1.98204C30.812 1.98204 28.8478 1.39945 24.3036 4.44556C20.4885 3.41158 16.4669 3.41158 12.6518 4.44556C8.1076 1.39945 6.14344 1.98204 6.14344 1.98204C5.28849 3.97674 5.23484 6.22414 5.99363 8.25736C4.37923 9.95303 3.48437 12.2081 3.49682 14.5493C3.49682 23.5712 8.98981 25.552 14.2165 26.2011C13.6688 26.767 13.2465 27.4419 12.9769 28.1818C12.7073 28.9217 12.5966 29.7101 12.6518 30.4957V36.9374M12.6518 31.9438C4.32909 34.4406 4.32909 27.7825 1 26.9502L12.6518 31.9438Z"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </a>
      <div className="relative bottom-0 inset-x-0 bg-secondary-light dark:bg-secondary-dark transition-colors p-project-info sm:absolute sm:inset-x-[50px] sm:-bottom-[5px]">
        <p className="text-center text-project-description">{description}</p>
        <p className="relative opacity-80 text-center mt-4 pt-4 text-project-technologies before:content-[''] before:absolute before:top-0 before:left-1/2 before:w-[40px] before:h-px before:transition-colors before:-translate-x-1/2 before:bg-font-dark dark:before:bg-font-light">
          {technologies}
        </p>
      </div>
      <a
        aria-label={`Przejdź do prezentacji projektu - ${title}`}
        href={demo}
        className="absolute bottom-0 right-0 w-7 h-7 lg:w-8 lg:h-8 flex-center p-[0.375rem] transition-transform hover:scale-110 hover:translate-y-2 group"
        rel="noreferrer nofollow noopener"
        target="_blank">
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path
            className="transition-colors stroke-font-dark dark:stroke-font-light group-hover:stroke-accent-light group-hover:dark:stroke-accent-dark group-hover:text-accent-light dark:group-hover:text-accent-dark"
            d="M1.58337 22.4166L22.4167 1.58325M22.4167 1.58325H1.58337M22.4167 1.58325V22.4166"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </a>
    </div>
  );
};

export default ProjectCard;
