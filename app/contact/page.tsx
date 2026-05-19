import Footer from "@/components/Footer";
import Globe_With_Container_ContactUs_Page from "@/components/Globe_With_Container_ContactUs_Page";
import { Navbar } from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import { Mail, MailOpen } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f5f5f5] pt-[84px] pb-10 md:pb-14">
        <section className="mx-auto -mt-5 flex h-[calc(100svh-84px)] w-[min(1240px,calc(100%-32px))] flex-col justify-center py-2 md:w-[min(1240px,calc(100%-64px))]">
          <div className="mb-5 md:mb-6">
            <div className="mb-5 flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/90 bg-[#efefef] px-6 py-2.5 text-[15px] font-semibold uppercase tracking-[0.04em] text-[#0e1229] shadow-[inset_0_2px_0_rgba(255,255,255,.8),0_8px_20px_rgba(14,18,41,.12)]">
                <Mail className="size-4 text-[#0e1229]" strokeWidth={2.2} aria-hidden="true" />
                Contact
              </div>
            </div>
            <h1 className="text-center text-[38px] font-semibold leading-[0.95] text-[#0e1229] md:text-[52px]">
              Reach Us At Anytime
            </h1>
            <p className="mx-auto mt-3 max-w-4xl text-center text-[17px] leading-[1.4] text-[#3f4351] md:text-[24px]">
              Have questions or need any help? We’re here to help you with that
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.35fr]">
            <div className="grid">
              <article className="flex flex-col items-center space-y-6 rounded-[20px] border border-white/80 bg-[#f1f1f1] p-5 shadow-[inset_0_2px_0_rgba(255,255,255,.76),0_10px_28px_rgba(14,18,41,.1)] md:p-6">
                <h2 className="text-center text-[26px] font-semibold text-[#0e1229] md:text-[30px]">Office Locations</h2>

                <div className="relative w-full overflow-hidden rounded-[14px] bg-transparent">
                  <Globe_With_Container_ContactUs_Page />
                </div>

                <div className="inline-flex items-center rounded-full border border-white/90 bg-[#f5f5f5] p-1.5 shadow-[inset_0_2px_0_rgba(255,255,255,.8),0_8px_20px_rgba(14,18,41,.08)]">
                  <a
                    href="mailto:info@cyberarmour.pk"
                    className="group inline-flex size-10 items-center justify-center rounded-full border border-white/95 bg-[#f0f0f0] text-[16px] font-semibold text-[#323d68] shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_6px_14px_rgba(14,18,41,.12)] transition hover:text-[#0e1229] md:size-11 md:text-[17px]"
                  >
                    <Mail className="size-4 group-hover:hidden" />
                    <MailOpen className="hidden size-4 group-hover:block" />
                  </a>
                </div>
              </article>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
