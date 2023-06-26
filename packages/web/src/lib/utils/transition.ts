import { fly } from "svelte/transition";

/**
 * Entering transition for svelte
 */
export function enter(node: Element) {
  return fly(node, { duration: 500, y: "15%", opacity: 0 });
}
