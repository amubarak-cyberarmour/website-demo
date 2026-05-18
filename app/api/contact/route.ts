import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const RECIPIENT = "info@cyberarmour.pk";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const fullName = (body.fullName || "").trim();
    const email = (body.email || "").trim();
    const subject = (body.subject || "").trim();
    const message = (body.message || "").trim();

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;

    if (!host || !user || !pass || !from) {
      return NextResponse.json(
        { error: "Email service is not configured. Please set SMTP environment variables." },
        { status: 503 }
      );
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

    return NextResponse.json({ message: "Your message has been sent successfully." });
  } catch {
    return NextResponse.json({ error: "Unable to send your message right now." }, { status: 500 });
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
