import { json } from "@sveltejs/kit";

export function GET({ url }) {
  const email = url.searchParams.get("email");
  console.log(email);
  return json(email);
}
