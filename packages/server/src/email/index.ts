import { Resend } from "resend";
import { env } from "../config/env.js";

/**
 * The Resend email client
 *
 * @see https://resend.dev
 * @see `mail` function below to send emails
 */
export const resend = new Resend(env.EMAIL_KEY);

/**
 * The type of expected email arguments.
 */
export type Send = Parameters<typeof resend.emails.send>;

/**
 * The type of expected email arguments.
 */
export type SendArgs = Omit<Send[0], "from">;

/**
 * The type of expected email options.
 */
export type SendOptions = Send[1];

/**
 * Send an email through Resend with the proper `from` address.
 */
export async function mail(args: SendArgs, options?: SendOptions) {
  return await resend.emails.send(
    {
      ...args,
      from: env.EMAIL_ADDRESS,
    },
    options
  );
}
