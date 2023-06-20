import { writable } from "svelte/store";

export const glance = writable({
  current: 0,
  on: new Date(),
});

export const beginning = writable(new Date());
