export const hoverSquare = (direction: "left" | "top" | "right" | "bottom" = "left") => {
  const directionClass = {
    left: "before:-translate-x-10",
    top: "before:-translate-y-10",
    right: "before:translate-x-10",
    bottom: "before:translate-y-10",
  };

  return `relative before:transition-transform before:rounded-lg before:absolute before:inset-0 before:bg-slate-300 before:dark:bg-slate-700 before:duration-300 before:scale-0 before:-z-10 hocus:before:translate-x-0 hocus:before:translate-y-0 hocus:before:scale-100 ${directionClass[direction]}`;
};

export const focusRing =
  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:dark:ring-offset-slate-950 focus:ring-slate-500";

const proseBase = "prose prose-sm sm:prose-base dark:prose-invert";

const proseImg = ["mix-blend-luminosity", "object-cover", "object-center"]
  .map((className) => `prose-img:${className}`)
  .join(" ");

// TODO: complete proseAnchor classes
const proseAnchor = [].map((className) => `prose-a:${className}`).join(" ");

export const contentfulArticle = `${proseBase} ${proseImg} ${proseAnchor}`;
