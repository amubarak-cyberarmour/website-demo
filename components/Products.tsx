"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, Cpu, Database, Lock, Search, Send, ShieldAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "./orb-ui";

const WHISPER_DEMO = [
  {
    question: "How does WHISPER ensure data security?",
    answer:
      "WHISPER keeps sensitive knowledge inside the organization's environment and enforces access control, audit logging, security classifications, and segregation across divisions and projects.",
  },
  {
    question: "Can WHISPER run without internet?",
    answer:
      "Yes. WHISPER supports an air-gapped on-prem deployment designed for fully offline environments with zero internet connectivity.",
  },
  {
    question: "What are the deployment options?",
    answer:
      "WHISPER can be deployed as air-gapped on-prem, connected on-prem with internal network and SSO/IAM, or private cloud and hybrid with a dedicated scalable tenant.",
  },
  {
    question: "Can it analyze legal contracts?",
    answer:
      "Yes. Legal contract analysis is supported alongside executive briefing summaries, policy and SOP Q&A, and tender requirement extraction.",
  },
  {
    question: "How does data segregation work?",
    answer:
      "WHISPER separates knowledge between divisions and projects so sensitive content stays scoped correctly and does not leak across organizational boundaries.",
  },
  {
    question: "Why should an organization choose WHISPER?",
    answer:
      "WHISPER is built for organizations that need enterprise AI assistance without compromising security, sovereignty, or internal boundaries.",
  },
];

const WHISPER_SCROLL_CARDS = [
  {
    title: "Introducing Whisper",
    points: [
      "Data Sovereignty: Runs within your network boundary, no external data",
      "Confidentiality: Works with sensitive content safely",
      "Governance & Control: Full oversight on access, policies, and usage",
    ],
  },
  {
    title: "How Whisper Works?",
    points: [
      "Connect: Ingest approved sources from files, wikis, and databases",
      "Index & Classify: Chunk and embed documents with metadata and labels",
      "Ask & Answer: Retrieve only allowed content and return cited answers",
    ],
  },
  {
    title: "What makes Whisper different?",
    points: [
      "Offline by default",
      "Confidential data RAG",
      "Separated knowledge bases",
      "Multi-layer access control",
      "Security classifications",
      "Prompt governance",
    ],
  },
];

const CORE_FEATURES = [
  { icon: Search, label: "Smart Search", desc: "AI-powered document search" },
  { icon: Database, label: "Data Hub", desc: "Centralized data management" },
  { icon: Lock, label: "Security", desc: "Enterprise-grade encryption" },
  { icon: Activity, label: "Analytics", desc: "Real-time insights" },
  { icon: Cpu, label: "Performance", desc: "Fast controlled retrieval" },
  { icon: ShieldAlert, label: "Compliance", desc: "Audit-ready access controls" },
];

const MARQUEE_ITEMS = [
  { label: "READY TO DEPLOY", icon: Send },
  { label: "ZERO DATA RISK", icon: Lock },
  { label: "YOUR AI", icon: ShieldAlert },
  { label: "YOUR ADVANTAGE", icon: Cpu },
];

const motionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ChatMessage({ message, isUser, index }: { message: string; isUser: boolean; index: number }) {
  const [displayedText, setDisplayedText] = useState(() => (isUser ? message : ""));

  useEffect(() => {
    if (isUser) return;

    let currentIndex = 0;
    const interval = window.setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(message.slice(0, currentIndex + 1));
        currentIndex += 1;
      } else {
        window.clearInterval(interval);
      }
    }, 20);

    return () => window.clearInterval(interval);
  }, [message, isUser]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-md rounded-2xl border px-4 py-2 text-sm leading-6 ${
          isUser
            ? "border-[#0e1229] bg-[#0e1229] text-white"
            : "border-[#0e1229]/10 bg-[#f5f5f5] text-[#323d68]"
        }`}
      >
        {displayedText}
        {!isUser && displayedText.length < message.length ? <span className="animate-pulse">|</span> : null}
      </div>
    </motion.div>
  );
}

export default function Products() {
  const whisperCardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeWhisperScrollCard, setActiveWhisperScrollCard] = useState(0);
  const [chatMessages, setChatMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timers: number[] = [];
    let cancelled = false;
    const typeSpeed = 90;
    const sendPause = 900;
    const responseDelay = 1300;
    const betweenPairsDelay = 1800;
    const batchReadDelay = 3600;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const timer = window.setTimeout(resolve, ms);
        timers.push(timer);
      });

    const typeIntoInput = async (text: string) => {
      setInputValue("");

      for (let index = 0; index < text.length; index += 1) {
        if (cancelled) return;
        await wait(typeSpeed);
        setInputValue(text.slice(0, index + 1));
      }
    };

    const runDemo = async () => {
      setChatMessages([]);
      setInputValue("");

      for (let batchStart = 0; batchStart < WHISPER_DEMO.length; batchStart += 2) {
        const batch = WHISPER_DEMO.slice(batchStart, batchStart + 2);

        for (const item of batch) {
          if (cancelled) return;

          await typeIntoInput(item.question);
          if (cancelled) return;

          await wait(sendPause);
          setChatMessages((prev) => [...prev, { text: item.question, isUser: true }]);
          setInputValue("");

          await wait(responseDelay);
          setChatMessages((prev) => [...prev, { text: item.answer, isUser: false }]);

          await wait(betweenPairsDelay);
        }

        await wait(batchReadDelay);
        setChatMessages([]);
        setInputValue("");
      }

      if (!cancelled) {
        runDemo();
      }
    };

    runDemo();

    return () => {
      cancelled = true;
      setInputValue("");
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveWhisperScrollCard(index);
          }
        });
      },
      {
        threshold: 0.55,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    whisperCardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" className="scroll-mt-20 bg-[#f5f5f5] pb-28 pt-12 text-[#0e1229] md:pt-14 lg:pt-16">
      <div className="mx-auto max-w-[92rem] px-6 sm:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: motionEase }}
          viewport={{ once: true }}
          className="mb-10 mx-auto max-w-3xl text-center"
        >
          <h1 className="mb-14 text-[52px] text-center font-semibold leading-none tracking-normal text-[#0e1229] [text-shadow:0_8px_24px_rgba(14,18,41,0.18)] md:mb-20 md:text-[86px]">Products</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: motionEase }}
          className="mb-10 rounded-[8px] border border-white/80 bg-[#f5f5f5] px-6 py-5 text-center shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_18px_50px_rgba(14,18,41,.08)] sm:px-8"
        >
          <h3 className="text-2xl font-semibold uppercase tracking-normal text-[#0e1229] [font-family:inherit] sm:text-3xl">
            Lead the industry with AI or watch others do it
          </h3>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#0e1229]/30 to-transparent" />
        </motion.div>

        <div className="relative grid gap-8 lg:grid-cols-[0.55fr_1.45fr]">
          <div className="hidden space-y-12 lg:block lg:pr-2 lg:pt-[42vh]">
            {WHISPER_SCROLL_CARDS.map((card, index) => (
              <motion.article
                key={card.title}
                data-index={index}
                ref={(element) => {
                  whisperCardRefs.current[index] = element;
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.5, once: false, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.5, ease: motionEase }}
                className={`flex h-[30rem] items-center justify-center overflow-hidden rounded-[8px] border p-6 text-center shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_18px_50px_rgba(14,18,41,.08)] transition-colors duration-300 ${
                  activeWhisperScrollCard === index
                    ? "border-[#0e1229]/20 bg-[#f5f5f5]"
                    : "border-white/80 bg-[#f5f5f5]"
                }`}
              >
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold tracking-normal text-[#0e1229] [font-family:inherit]">{card.title}</h3>
                  <div className="mt-5 grid gap-3">
                    {card.points.map((item) => (
                      <div key={item} className="rounded-[8px] border border-[#0e1229]/10 bg-[#0e1229]/[0.04] px-4 py-3 text-sm leading-6 text-[#555968]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="space-y-4 lg:hidden">
            {WHISPER_SCROLL_CARDS.map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: motionEase }}
                className="rounded-[8px] border border-white/80 bg-[#f5f5f5] p-8 shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_18px_50px_rgba(14,18,41,.08)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#6f7280]">Whisper AI</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-normal text-[#0e1229] [font-family:inherit] sm:text-3xl">{card.title}</h3>
                <div className="mt-8 grid gap-3">
                  {card.points.map((item) => (
                    <div key={item} className="rounded-[8px] border border-[#0e1229]/10 bg-[#0e1229]/[0.04] px-4 py-4 text-sm leading-7 text-[#555968]">
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4 lg:sticky lg:top-12 lg:self-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08, ease: motionEase }}
              className="relative flex min-h-[91vh] flex-col overflow-hidden rounded-[8px] border border-white/80 bg-[#f5f5f5] p-8 shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_18px_50px_rgba(14,18,41,.08)] backdrop-blur-sm lg:h-[calc(100vh-8.5rem)] lg:min-h-0"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[8px]">
                <div className="whisper-border-light" />
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold tracking-normal text-[#0e1229] [font-family:inherit] sm:text-3xl">Whisper AI Assistant</h3>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <div className="size-2 rounded-full bg-[#0e1229] shadow-[0_0_0_4px_rgba(14,18,41,.12)]" />
                  <span className="text-xs text-[#6f7280]">Secure Enterprise knowledge Q&A simulation</span>
                </div>
              </div>

              <div className="custom-scrollbar mb-6 flex-1 space-y-3 overflow-y-auto">
                <AnimatePresence>
                  {chatMessages.map((msg, idx) => (
                    <ChatMessage key={`${msg.text}-${idx}`} message={msg.text} isUser={msg.isUser} index={idx} />
                  ))}
                </AnimatePresence>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  readOnly
                  // placeholder="Ask Whisper"
                  className="flex-1 rounded-full border border-[#0e1229]/10 bg-[#f5f5f5] px-4 py-3 text-sm text-[#0e1229] placeholder-[#6f7280] focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  disabled
                  className="cursor-not-allowed rounded-full bg-[#0e1229] p-3 text-white opacity-70"
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.12, ease: motionEase }}
          className="mt-5 bg-[#f5f5f5] py-5"
        >
          <div
            className="relative mx-auto flex w-[calc(100vw-32px)] max-w-[860px] overflow-hidden py-5"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            }}
          >
            <div className="products-marquee-track flex w-max whitespace-nowrap">
              {[0, 1].map((groupIndex) => (
                <div
                  key={groupIndex}
                  className="flex shrink-0 items-center gap-4 pr-4 sm:gap-5 sm:pr-5"
                >
                  {MARQUEE_ITEMS.map((item) => (
                    <span
                      key={`${groupIndex}-${item.label}`}
                      className="inline-flex h-10 w-[172px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/90 bg-[#f5f5f5] px-3 text-[11px] font-semibold uppercase tracking-normal text-[#171717] shadow-[0_8px_16px_rgba(14,18,41,.10),inset_0_2px_1px_rgba(255,255,255,.85)] sm:h-12 sm:w-[200px] sm:px-4 sm:text-[13px]"
                    >
                      <item.icon size={17} className="text-[#171717] sm:size-[19px]" strokeWidth={1.9} />
                      {item.label}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: motionEase }}
          className="mt-20 space-y-4"
        >
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, ease: motionEase }}
            className="text-2xl font-semibold tracking-normal text-[#0e1229] [font-family:inherit] sm:text-3xl"
          >
            Core Features
          </motion.h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_FEATURES.map((feature, idx) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 34, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.55, delay: idx * 0.09, ease: motionEase }}
                className="group relative overflow-hidden rounded-[8px] border border-white/80 bg-[#f5f5f5] p-5 shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_18px_50px_rgba(14,18,41,.08)] transition-colors duration-300"
              >
                <div className="pointer-events-none absolute inset-0 rounded-[8px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="feature-border-light" />
                </div>
                <motion.div className="mb-3 inline-flex transition-transform duration-300 group-hover:translate-x-1" whileHover={{ scale: 1.1 }}>
                  <feature.icon size={24} className="text-[#0e1229]" />
                </motion.div>
                <p className="text-sm font-semibold text-[#0e1229]">{feature.label}</p>
                <p className="mt-1 text-xs leading-5 text-[#555968]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: motionEase }}
          viewport={{ once: true }}
          className="mt-20 border-t border-[#0e1229]/10 pt-8 text-center"
        >
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-[#f7f4ed]">Ready to get started</p>
          <PrimaryButton>Book a demo</PrimaryButton>
        </motion.div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(14, 18, 41, 0.18);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(14, 18, 41, 0.26);
        }

        .products-marquee-track {
          animation: products-marquee 36s linear infinite;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .whisper-border-light,
        .feature-border-light {
          position: absolute;
          inset: 0;
          border-radius: 8px;
          padding: 1.5px;
          overflow: hidden;
          filter: drop-shadow(0 0 8px rgba(14, 18, 41, 0.22));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          pointer-events: none;
        }

        .whisper-border-light::before,
        .feature-border-light::before {
          content: "";
          position: absolute;
          inset: -55%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 284deg,
            rgba(14, 18, 41, 0.08) 306deg,
            rgba(14, 18, 41, 0.92) 330deg,
            rgba(14, 18, 41, 0.08) 348deg,
            transparent 360deg
          );
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .whisper-border-light::before {
          animation: border-spin 5.8s linear infinite;
        }

        .feature-border-light::before {
          animation: border-spin 3.8s linear infinite;
        }

        @keyframes products-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes border-spin {
          from {
            transform: rotate(0deg) translate3d(0, 0, 0);
          }
          to {
            transform: rotate(360deg) translate3d(0, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}
