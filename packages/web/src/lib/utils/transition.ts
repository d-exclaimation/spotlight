import { fly } from "svelte/transition";

export function enter(node: Element) {
  return fly(node, { duration: 500, y: "15%", delay: 500, opacity: 0 });
}

export function exit(node: Element) {
  return fly(node, { duration: 500, y: "-15%", opacity: 0 });
}
