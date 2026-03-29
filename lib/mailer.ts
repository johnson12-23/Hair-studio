import nodemailer from "nodemailer";

type SendEmailInput = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

type SendEmailSuccess = {
  ok: true;
  accepted: string[];
  rejected: string[];
  response: string;
};

type SendEmailFailure = {
  ok: false;
  reason: "SMTP_NOT_CONFIGURED" | "SEND_FAILED";
  error?: unknown;
};

type SendEmailResult = SendEmailSuccess | SendEmailFailure;

type SendEmailWithRetryResult = SendEmailResult & {
  attempts: number;
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
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER?.trim();
  const rawPass = process.env.SMTP_PASS?.trim();
  const from = process.env.SMTP_FROM?.trim();

  // Gmail app-passwords are often copied with spaces (e.g. "abcd efgh ijkl mnop").
  const pass = host?.includes("gmail.com") ? rawPass?.replace(/\s+/g, "") : rawPass;

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

function normalizeRecipients(to: string | string[]) {
  return (Array.isArray(to) ? to : [to]).map((value) => value.trim()).filter(Boolean);
}

export async function sendEmail(input: SendEmailInput) {
  const config = getSmtpConfig();

  if (!config) {
    return { ok: false, reason: "SMTP_NOT_CONFIGURED" as const };
  }

  const recipients = normalizeRecipients(input.to);
  if (recipients.length === 0) {
    return {
      ok: false,
      reason: "SEND_FAILED" as const,
      error: new Error("No recipients were provided")
    };
  }

  const smtpTransport = getTransporter(config);

  try {
    const fromAddress = config.from.includes("<")
      ? config.from
      : `"Abena Hair Studio" <${config.user}>`;

    const info = await smtpTransport.sendMail({
      from: fromAddress,
      sender: config.user,
      envelope: {
        from: config.user,
        to: recipients
      },
      to: recipients,
      subject: input.subject,
      text: input.text,
      html: input.html,
      replyTo: input.replyTo
    });

    const accepted = (info.accepted ?? []).map((value: unknown) => String(value));
    const rejected = (info.rejected ?? []).map((value: unknown) => String(value));

    if (accepted.length === 0) {
      return {
        ok: false,
        reason: "SEND_FAILED" as const,
        error: new Error(`No recipients accepted by SMTP server. Rejected: ${rejected.join(", ")}`)
      };
    }

    return {
      ok: true,
      accepted,
      rejected,
      response: info.response
    } satisfies SendEmailSuccess;
  } catch (error) {
    return {
      ok: false,
      reason: "SEND_FAILED" as const,
      error
    } satisfies SendEmailFailure;
  }
}

export async function sendEmailWithRetry(
  input: SendEmailInput,
  maxAttempts = 2
): Promise<SendEmailWithRetryResult> {
  const attempts = Math.max(1, maxAttempts);

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const result = await sendEmail(input);

    if (result.ok) {
      return {
        ok: true,
        accepted: result.accepted,
        rejected: result.rejected,
        response: result.response,
        attempts
      };
    }

    if (result.reason === "SMTP_NOT_CONFIGURED" || attempt === attempts) {
      return {
        ok: false,
        reason: result.reason,
        error: result.error,
        attempts
      };
    }

    await new Promise((resolve) => setTimeout(resolve, attempt * 350));
  }

  return {
    ok: false,
    reason: "SEND_FAILED",
    attempts,
    error: new Error("Unknown email delivery error")
  };
}
