import { PRIVATE_ALLOWED_EMAILS } from "$env/static/private";
import { json } from "@sveltejs/kit";

export function GET({ params: { test } }) {
  const accepted = PRIVATE_ALLOWED_EMAILS.split(",").includes(
    test.toLowerCase()
  );
  return json({ accepted });
}
