const nodemailer = require("nodemailer");

let transporter;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = String(process.env.SMTP_SECURE || "true") === "true";
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("EMAIL_USER and EMAIL_PASS must be set in environment variables");
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });

  return transporter;
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidMessageInput({ name, email, message }) {
  const cleanName = String(name || "").trim();
  const cleanEmail = normalizeEmail(email);
  const cleanMessage = String(message || "").trim();

  return {
    cleanName,
    cleanEmail,
    cleanMessage,
    isValid:
      cleanName.length >= 2 &&
      cleanMessage.length >= 10 &&
      isValidEmail(cleanEmail)
  };
}

async function sendAdminEmail({ cleanName, cleanEmail, cleanMessage }) {
  const adminRecipient = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  const info = await getTransporter().sendMail({
    from: process.env.EMAIL_USER,
    to: adminRecipient,
    subject: "New Contact Message - Abena Hair Studio",
    text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
    replyTo: cleanEmail,
    envelope: {
      from: process.env.EMAIL_USER,
      to: [adminRecipient]
    }
  });

  console.log("[SMTP] Admin email sent", {
    accepted: info.accepted,
    rejected: info.rejected,
    messageId: info.messageId
  });
}

async function sendCustomerAutoReply({ cleanName, cleanEmail }) {
  const info = await getTransporter().sendMail({
    from: process.env.EMAIL_USER,
    to: cleanEmail,
    subject: "We've received your message - Abena Hair Studio",
    text: `Hello ${cleanName},\n\nThank you for reaching out to Abena Hair Studio.\n\nWe've received your message and our team will get back to you shortly.\n\nWe look forward to welcoming you to the studio.\n\n- Abena Hair Studio`,
    envelope: {
      from: process.env.EMAIL_USER,
      to: [cleanEmail]
    }
  });

  console.log("[SMTP] Customer email sent", {
    accepted: info.accepted,
    rejected: info.rejected,
    messageId: info.messageId
  });
}

async function sendMessage(req, res) {
  try {
    const { name, email, message } = req.body || {};
    const payload = isValidMessageInput({ name, email, message });

    if (!payload.isValid) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid name, email, and message."
      });
    }

    await Promise.all([
      sendAdminEmail(payload),
      sendCustomerAutoReply(payload)
    ]);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully."
    });
  } catch (error) {
    console.error("[SMTP] send-message failed", error);
    return res.status(500).json({
      success: false,
      message: "Could not send emails right now. Please try again later."
    });
  }
}

module.exports = {
  sendMessage
};
