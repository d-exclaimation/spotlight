export async function verify() {
  const data = localStorage.getItem("waitlist");
  if (!data) {
    return { accepted: false };
  }
  const { email } = JSON.parse(data);

  const res = await fetch(`/test/${encodeURIComponent(email)}`);
  const { accepted } = await res.json();

  return { accepted: !!accepted };
}
