import { json } from "@sveltejs/kit";

export function GET({ params: { test } }) {
  console.log(test);
  return json(test);
}
