export const languages = {
  pl: "Polski",
  en: "English",
} as const;

export type Languages = keyof typeof languages;

export const defaultLang: Languages = "pl";

export const ui = {
  pl: {
    "sidebar.homepage": "Strona główna",
    "sidebar.about-me": "O mnie",
    "sidebar.projects": "Projekty",
    "sidebar.uses": "Uses",

    "footer.i18n.aria-label": "Otwórz bieżącą stronę w języku",

    "about-me.seo.description":
      "Kilka zdań o mnie, moim doświadczeniu, pasji, zainteresowaniach oraz aktualnych ścieżkach rozwoju!",

    "projects.seo.title": "Projekty",
    "projects.seo.description": "Lista moich dotychczasowych projektów i realizacji!",
    "projects.title": "Projekty",
    "projects.github.aria-label": "Przejdź do plików źródłowych projektu",
    "projects.demo.aria-label": "Przejdź do strony głównej projekstu",
    "projects.technologies.title": "Technologie",

    "uses.seo.title": "Uses",
    "uses.seo.description": "Aktualna lista sprzętu, oprogramowania oraz narzędzi, z których regularnie korzystam!",
    "uses.title": "Uses",
    "uses.last-update.title": "Ostatnia aktualizacja",

    "404.seo.title": "Nie znaleziono strony",
    "404.seo.description":
      "Szukana strona nie została znaleziona. Wróć do strony głównej i dowiedz się więcej na mój temat!",
    "404.title": "404",
    "404.go-back-button": "Zabierz mnie stąd",
  },
  en: {
    "sidebar.homepage": "Homepage",
    "sidebar.about-me": "About me",
    "sidebar.projects": "Projects",
    "sidebar.uses": "Uses",

    "footer.i18n.aria-label": "Open the current page in the language",

    "about-me.seo.description":
      "A few words about me, my experience, passion, interests and current development paths!",

    "projects.seo.title": "Projects",
    "projects.seo.description": "List of my previous projects and implementations!",
    "projects.title": "Projects",
    "projects.github.aria-label": "Go to the project source",
    "projects.demo.aria-label": "Go to the project home page",
    "projects.technologies.title": "Technologies",

    "uses.seo.title": "Uses",
    "uses.seo.description": "A current list of hardware, software and tools that I use regularly!",
    "uses.title": "Uses",
    "uses.last-update.title": "Last update",

    "404.seo.title": "Page not found",
    "404.seo.description":
      "The page you were looking for was not found. Return to the home page and learn more about me!",
    "404.title": "404",
    "404.go-back-button": "Take me away from here",
  },
} as const;

export const routes = {
  pl: {
    projekty: "projekty",
  },
  en: {
    projekty: "projects",
  },
} as const;
