import "server-only";

import nodemailer from "nodemailer";
import type { SendMailOptions, Transporter } from "nodemailer";

const smtpTimeoutMs = 10_000;

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
};

let transporter: Transporter | undefined;
let missingEnvWarned = false;

function smtpPort(value: string | undefined) {
  const parsed = Number(value?.trim() || "465");
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    return null;
  }
  return parsed;
}

function smtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const port = smtpPort(process.env.SMTP_PORT);

  if (!host || !user || !pass || port === null) {
    return null;
  }

  return {
    host,
    port,
    user,
    pass,
    from: process.env.EMAIL_FROM?.trim() || user,
  };
}

function getTransporter() {
  const config = smtpConfig();
  if (!config) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
      connectionTimeout: smtpTimeoutMs,
      greetingTimeout: smtpTimeoutMs,
      socketTimeout: smtpTimeoutMs,
    });
  }

  return { transporter, from: config.from };
}

export async function sendMail(
  options: Pick<SendMailOptions, "to" | "subject" | "text" | "html">
) {
  const mailer = getTransporter();
  if (!mailer) {
    if (!missingEnvWarned) {
      missingEnvWarned = true;
      console.warn(
        "SMTP is not configured (SMTP_HOST / SMTP_USER / SMTP_PASS). Skipping mail."
      );
    }
    return false;
  }

  await mailer.transporter.sendMail({
    from: mailer.from,
    ...options,
  });
  return true;
}
