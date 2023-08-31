export const hoverSquare = (direction: "left" | "top" | "right" | "bottom" = "left") => {
  const directionClass = {
    left: "before:-translate-x-3 before:origin-left",
    top: "before:-translate-y-3 before:origin-top",
    right: "before:translate-x-3 before:origin-right",
    bottom: "before:translate-y-3 before:origin-bottom",
  };

  return `relative before:transition-transform before:rounded-lg before:absolute before:inset-0 before:bg-slate-300 before:dark:bg-slate-700 before:duration-300 before:scale-0 before:-z-10 hocus:before:translate-x-0 hocus:before:translate-y-0 hocus:before:scale-100 ${directionClass[direction]}`;
};

export const focusRing =
  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:dark:ring-offset-slate-950 focus:ring-slate-500";

const proseBase = "prose prose-sm sm:prose-base dark:prose-invert";

const proseH1 = "prose-h1:mb-7";

const proseImg = "prose-img:mix-blend-luminosity prose-img:object-cover prose-img:object-center";

const proseAnchor =
  "prose-a:no-underline prose-a:m-0 prose-a:inline-block prose-a:relative prose-a:py-px prose-a:before:absolute prose-a:rounded-md prose-a:before:bg-slate-500/25 prose-a:before:dark:bg-slate-300/25 prose-a:before:transition prose-a:before:bottom-0.5 prose-a:before:h-2 prose-a:before:origin-bottom hocus:prose-a:before:opacity-0 hocus:prose-a:before:translate-y-2 prose-a:before:duration-300 hocus:prose-a:before:scale-0 prose-a:before:inset-x-0 focus:prose-a:outline-none focus:prose-a:ring-2 focus:prose-a:ring-offset-2 focus:prose-a:ring-offset-slate-50 focus:prose-a:dark:ring-offset-slate-950 focus:prose-a:ring-slate-500 prose-a:after:absolute prose-a:after:-inset-x-1 prose-a:after:inset-y-0 prose-a:after:bg-slate-300 prose-a:after:dark:bg-slate-700 prose-a:after:rounded-lg prose-a:after:duration-300 prose-a:after:scale-0 prose-a:after:-z-10 hocus:prose-a:after:translate-x-0 prose-a:after:origin-left hocus:prose-a:after:scale-100 prose-a:after:-translate-x-3";

const proseCode =
  "prose-code:rounded-md prose-code:p-0.5 prose-code:font-sans prose-code:inline-block prose-code:bg-slate-300 prose-code:text-slate-950 prose-code:dark:bg-slate-600 prose-code:dark:text-slate-50";

const proseHr = "prose-hr:border-t-4";

export const proseArticle = `${proseBase} ${proseH1} ${proseImg} ${proseAnchor} ${proseCode} ${proseHr}`;
