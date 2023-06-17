import { fly } from "svelte/transition";

/**
 * Entering transition for svelte
 */
export function enter(node: Element) {
  return fly(node, { duration: 500, y: "15%", delay: 500, opacity: 0 });
}

/**
 * Exiting transition for svelte
 */
export function exit(node: Element) {
  return fly(node, { duration: 500, y: "-15%", opacity: 0 });
}
