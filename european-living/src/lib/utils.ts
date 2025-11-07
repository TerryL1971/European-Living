// european-living/src/lib/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a subcategory ID like "veterinary-services" or "general-practitioners"
 * into a display-friendly name like "Veterinary Services" or "General Practitioners".
 */
export function formatSubcategoryName(id?: string): string {
  if (!id) return "";
  return id
    .replace(/[-_]/g, " ") // handle both kebab and snake case
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
