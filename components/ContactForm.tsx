"use client";

import { FormEvent, useState } from "react";
import { apiUrl } from "@/lib/apiClient";

type Status = { type: "success" | "error"; message: string } | null;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (!payload.fullName || !payload.email || !payload.subject || !payload.message) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      form.reset();
      setStatus({ type: "success", message: result.message || "Message sent successfully." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to send message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[20px] border border-white/80 bg-[#f1f1f1] p-5 shadow-[inset_0_2px_0_rgba(255,255,255,.76),0_10px_28px_rgba(14,18,41,.1)] md:p-6"
    >
      <div className="space-y-3">
        <div>
          <label htmlFor="fullName" className="mb-2 block text-[16px] font-medium text-[#323642] md:text-[17px]">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            placeholder="Your Name Here..."
            className="h-11 w-full rounded-[12px] border border-white/90 bg-[#ececec] px-4 text-[15px] text-[#0e1229] outline-none placeholder:text-[#8f8f8f] shadow-[inset_0_2px_0_rgba(255,255,255,.8),0_7px_16px_rgba(14,18,41,.1)] md:h-[48px] md:text-[16px]"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-[16px] font-medium text-[#323642] md:text-[17px]">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="info@cyberarmour.pk"
            className="h-11 w-full rounded-[12px] border border-white/90 bg-[#ececec] px-4 text-[15px] text-[#0e1229] outline-none placeholder:text-[#8f8f8f] shadow-[inset_0_2px_0_rgba(255,255,255,.8),0_7px_16px_rgba(14,18,41,.1)] md:h-[48px] md:text-[16px]"
          />
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block text-[16px] font-medium text-[#323642] md:text-[17px]">
            Subject Of Interest
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="Regarding Project"
            className="h-11 w-full rounded-[12px] border border-white/90 bg-[#ececec] px-4 text-[15px] text-[#0e1229] outline-none placeholder:text-[#8f8f8f] shadow-[inset_0_2px_0_rgba(255,255,255,.8),0_7px_16px_rgba(14,18,41,.1)] md:h-[48px] md:text-[16px]"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-[16px] font-medium text-[#323642] md:text-[17px]">
            How may we assist you?
          </label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="Give us more info.."
            rows={3}
            className="w-full resize-none rounded-[12px] border border-white/90 bg-[#ececec] px-4 py-3 text-[15px] text-[#0e1229] outline-none placeholder:text-[#8f8f8f] shadow-[inset_0_2px_0_rgba(255,255,255,.8),0_7px_16px_rgba(14,18,41,.1)] md:text-[16px]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-[12px] bg-[#050505] text-[16px] font-semibold text-[#f5f5f5] shadow-[0_12px_28px_rgba(0,0,0,.3)] transition hover:bg-[#101010] disabled:cursor-not-allowed disabled:opacity-70 md:h-[48px] md:text-[17px]"
      >
        {isSubmitting ? "Sending..." : "Send Your Message"}
      </button>

      {status ? (
        <p className={`mt-3 text-sm ${status.type === "success" ? "text-[#1f7a1f]" : "text-[#9f1d1d]"}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
