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
    const email = String(body.email || "").trim();

    if (!email) return res.status(400).json({ error: "Email is required." });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
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

    await transporter.sendMail({
      from,
      to: RECIPIENT,
      replyTo: email,
      subject: "CyberArmour Newsletter Subscription",
      text: `New newsletter subscription\n\nSubmitted At: ${submittedAt}\nEmail: ${email}`,
      html: `
        <h2>New newsletter subscription</h2>
        <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#d7d7d7;">
          <tr><td><strong>Submitted At</strong></td><td>${submittedAt}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        </table>
      `,
    });

    return res.status(200).json({ message: "Subscribed successfully." });
  } catch {
    return res.status(500).json({ error: "Unable to subscribe right now." });
  }
}
