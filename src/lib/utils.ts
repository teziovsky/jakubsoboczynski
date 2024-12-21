import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function directionByIndex(index: number) {
  if (index % 4 === 0) return "top";
  if (index % 4 === 1) return "left";
  if (index % 4 === 2) return "bottom";
  if (index % 4 === 3) return "right";
  return "top";
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
