import { browser } from "$app/environment";
export async function verify() {
  if (!browser) return;
  const data = localStorage.getItem("waitlist");
  if (!data) {
    return;
  }
  const { email } = JSON.parse(data);

  const res = await fetch(`/test/${encodeURIComponent(email)}`);
  const { accepted } = await res.json();

  return { accepted: !!accepted };
}
