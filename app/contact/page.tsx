import Footer from "@/components/Footer";
import Globe_With_Container_ContactUs_Page from "@/components/Globe_With_Container_ContactUs_Page";
import { Navbar } from "@/components/Navbar";
import { Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f5f5f5] pt-[84px] pb-10 md:pb-14">
        <section className="mx-auto -mt-5 flex h-[calc(100svh-84px)] w-[min(1240px,calc(100%-32px))] flex-col justify-center py-2 md:w-[min(1240px,calc(100%-64px))]">
          <div className="mb-5 md:mb-6">
            <div className="mb-5 flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/90 bg-[#efefef] px-6 py-2.5 text-[15px] font-semibold uppercase tracking-[0.04em] text-[#0e1229] shadow-[inset_0_2px_0_rgba(255,255,255,.8),0_8px_20px_rgba(14,18,41,.12)]">
                <Phone className="size-4 text-[#0e1229]" strokeWidth={2.2} aria-hidden="true" />
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
                    href="tel:+923001112233"
                    className="group inline-flex items-center rounded-full border border-white/95 bg-[#f0f0f0] px-3 py-2 text-[16px] font-semibold text-[#323d68] shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_6px_14px_rgba(14,18,41,.12)] transition hover:text-[#0e1229] md:text-[17px]"
                  >
                    <Phone className="size-4" />
                    <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-out group-hover:ml-2 group-hover:max-w-[160px] group-hover:opacity-100">
                      +92 300 111 2233
                    </span>
                  </a>
                </div>
              </article>
            </div>

            <form className="rounded-[20px] border border-white/80 bg-[#f1f1f1] p-5 shadow-[inset_0_2px_0_rgba(255,255,255,.76),0_10px_28px_rgba(14,18,41,.1)] md:p-6">
              <div className="space-y-3">
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-[16px] font-medium text-[#323642] md:text-[17px]">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
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
                    placeholder="Give us more info.."
                    rows={3}
                    className="w-full resize-none rounded-[12px] border border-white/90 bg-[#ececec] px-4 py-3 text-[15px] text-[#0e1229] outline-none placeholder:text-[#8f8f8f] shadow-[inset_0_2px_0_rgba(255,255,255,.8),0_7px_16px_rgba(14,18,41,.1)] md:text-[16px]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-[12px] bg-[#050505] text-[16px] font-semibold text-[#f5f5f5] shadow-[0_12px_28px_rgba(0,0,0,.3)] transition hover:bg-[#101010] md:h-[48px] md:text-[17px]"
              >
                Send Your Message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
