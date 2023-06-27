import { blur } from "svelte/transition";

/**
 * Entering transition for svelte
 */
export function enter(node: Element) {
  return blur(node, { duration: 500, opacity: 0.25, amount: 5 });
}
