"use client";

import { FormEvent, useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = email.trim();
    if (!value) {
      setStatus("error");
      setMessage("Please enter your email.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });

      const data = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Unable to subscribe right now.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "Subscribed successfully.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Unable to subscribe right now.");
    }
  };

  return (
    <footer
      id="contact"
      className="border-t border-[var(--line)] bg-[var(--paper)] px-6 py-14 text-[var(--muted)] md:px-20"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-[var(--ink)]">
            CyberArmour
          </h2>
          <p className="text-sm leading-relaxed">
            xyz,<br />
            xyz Islamabad
          </p>
          <a
            href="mailto:info@cyberarmour.pk"
            className="mt-4 inline-block text-sm text-[var(--blue)] transition-colors hover:text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
            aria-label="Email CyberArmour at info@cyberarmour.pk"
          >
            info@cyberarmour.pk
          </a>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-[var(--ink)]">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer transition-colors hover:text-[var(--ink)]">Home</li>
            <li className="cursor-pointer transition-colors hover:text-[var(--ink)]">About</li>
            <li className="cursor-pointer transition-colors hover:text-[var(--ink)]">Services</li>
            <li className="cursor-pointer transition-colors hover:text-[var(--ink)]">Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-[var(--ink)]">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Consulting &amp; Design</li>
            <li>System Integration</li>
            <li>Operation &amp; Maintenance</li>
            <li>Data Governance</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-[var(--ink)]">Newsletter</h3>
          <p className="mb-4 text-sm">Subscribe for updates and insights</p>

          <form onSubmit={onNewsletterSubmit}>
            <div className="flex items-center overflow-hidden rounded-lg border border-[var(--line)] bg-white/60">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="flex-1 bg-transparent px-4 py-2 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
                aria-label="Newsletter email address"
                autoComplete="email"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#0e1229] px-4 py-2 text-[#f7f4ed] transition-colors hover:bg-[#0e1229] disabled:cursor-not-allowed disabled:opacity-70"
                aria-label="Submit newsletter subscription"
              >
                {status === "loading" ? "..." : "→"}
              </button>
            </div>
            {message ? (
              <p
                className={`mt-2 text-xs ${status === "success" ? "text-emerald-700" : "text-red-700"}`}
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            ) : null}
          </form>
        </div>
      </div>

      <div className="my-10 border-t border-[var(--line)]" />

      <div className="grid grid-cols-1 gap-10 text-start md:grid-cols-4">
        <div>
          <p className="font-semibold text-[var(--ink)]">Pakistan</p>
          <p className="text-sm">Islamabad</p>
        </div>

        <div>
          <p className="font-semibold text-[var(--ink)]">United Kingdom</p>
          <p className="text-sm">London</p>
        </div>

        <div>
          <p className="font-semibold text-[var(--ink)]">Hong Kong</p>
          <p className="text-sm">S.A.R China</p>
        </div>

        <div>
          <p className="font-semibold text-[var(--ink)]">United Arab Emirates</p>
          <p className="text-sm">Ajman</p>
        </div>
      </div>

      <div className="my-8 border-t border-[var(--line)]" />

      <div className="text-sm text-[var(--muted)]">
        © 2026 CyberArmour Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}
