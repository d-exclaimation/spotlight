import { Resend } from "resend";
import { env } from "../config/env.js";

export const resend = new Resend(env.EMAIL_KEY);

export type MailArgs = {
  to: string;
  subject: string;
  html: string;
};

export async function mail(args: MailArgs) {
  return await resend.emails.send({
    from: env.EMAIL_ADDRESS,
    ...args,
  });
}
