export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function isMobile(breakpoint: keyof typeof BREAKPOINTS | undefined) {
  if (!breakpoint) return false;
  return ["xs", "sm", "md"].includes(breakpoint);
}
