import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const RECIPIENT = "info@cyberarmour.pk";

type NewsletterPayload = {
  email?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as NewsletterPayload;
    const email = (body.email || "").trim();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
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

    return NextResponse.json({ message: "Subscribed successfully." });
  } catch {
    return NextResponse.json({ error: "Unable to subscribe right now." }, { status: 500 });
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

