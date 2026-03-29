import nodemailer from "nodemailer";

type SendEmailInput = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
};

let transporter: nodemailer.Transporter | null = null;

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;

  if (!host || Number.isNaN(port) || !user || !pass || !from) {
    return null;
  }

  return {
    host,
    port,
    secure,
    user,
    pass,
    from
  };
}

function getTransporter(config: SmtpConfig) {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass
      }
    });
  }

  return transporter;
}

export function isSmtpConfigured() {
  return Boolean(getSmtpConfig());
}

export async function sendEmail(input: SendEmailInput) {
  const config = getSmtpConfig();

  if (!config) {
    return { ok: false, reason: "SMTP_NOT_CONFIGURED" as const };
  }

  const smtpTransport = getTransporter(config);

  await smtpTransport.sendMail({
    from: config.from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
    replyTo: input.replyTo
  });

  return { ok: true as const };
}
