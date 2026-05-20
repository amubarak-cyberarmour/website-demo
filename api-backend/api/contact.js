import nodemailer from "nodemailer";

const RECIPIENT = "info@cyberarmour.pk";

function setCors(res) {
  const allowOrigin = process.env.CORS_ORIGIN || "https://webdemo.cyberarmour.pk";
  res.setHeader("Access-Control-Allow-Origin", allowOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = parseBody(req);

    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;

    if (!host || !user || !pass || !from) {
      return res.status(503).json({ error: "Email service is not configured. Please set SMTP environment variables." });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const submittedAt = new Date().toISOString();
    const mailSubject = `CyberArmour Contact: ${subject}`;
    const textBody = [
      "New contact form submission",
      "",
      `Submitted At: ${submittedAt}`,
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const htmlBody = `
      <h2>New contact form submission</h2>
      <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#d7d7d7;">
        <tr><td><strong>Submitted At</strong></td><td>${submittedAt}</td></tr>
        <tr><td><strong>Full Name</strong></td><td>${escapeHtml(fullName)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Subject</strong></td><td>${escapeHtml(subject)}</td></tr>
      </table>
      <h3>Message</h3>
      <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
    `;

    await transporter.sendMail({
      from,
      to: RECIPIENT,
      replyTo: email,
      subject: mailSubject,
      text: textBody,
      html: htmlBody,
    });

    return res.status(200).json({ message: "Your message has been sent successfully." });
  } catch {
    return res.status(500).json({ error: "Unable to send your message right now." });
  }
}
