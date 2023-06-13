import { PRIVATE_ALLOWED_EMAILS } from "$env/static/private";
import { json } from "@sveltejs/kit";

export function GET({ params: { test } }) {
  const allowed = PRIVATE_ALLOWED_EMAILS.includes(test.toLowerCase());
  return json({ allowed });
}
