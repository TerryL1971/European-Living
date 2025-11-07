// src/lib/formatUtils.ts

/**
 * Convert kebab-case to Title Case
 * Example: "general-practitioners" -> "General Practitioners"
 *          "veterinary-services" -> "Veterinary Services"
 */
export function kebabToTitleCase(str: string): string {
  if (!str) return '';
  
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Convert Title Case to kebab-case
 * Example: "General Practitioners" -> "general-practitioners"
 *          "Veterinary Services" -> "veterinary-services"
 */
export function titleToKebabCase(str: string): string {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .replace(/\s+/g, '-');
}

/**
 * Format category name for display
 * Handles both kebab-case and regular text
 */
export function formatCategoryName(category: string): string {
  if (!category) return '';
  
  // If it contains hyphens, it's kebab-case
  if (category.includes('-')) {
    return kebabToTitleCase(category);
  }
  
  // Otherwise, return as-is (might already be formatted)
  return category;
}

/**
 * Format subcategory name for display
 * Example: "car-dealerships" -> "Car Dealerships"
 *          "general-practitioners" -> "General Practitioners"
 */
export function formatSubcategoryName(subcategory: string): string {
  return formatCategoryName(subcategory);
}