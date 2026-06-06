// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx (for conditional classes) and tailwind-merge (to resolve conflicts)
 * 
 * Example usage:
 * cn("px-4 py-2", isActive && "bg-blue-500", "px-8") 
 * // Result: "py-2 bg-blue-500 px-8" (px-8 overrides px-4)
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}