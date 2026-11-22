"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is this for beginners?",
    answer:
      "Not for complete beginners. You should already have a basic understanding of the markets. This community is for traders who want to improve or completely rework their existing system. If you have a foundation and are ready to level up, this is for you.",
  },
  {
    question: "Do you teach ICT concepts?",
    answer:
      "No. Basic ICT concepts are available for free on YouTube. I focus on what comes after — building a real system, refining your edge, and developing the mindset to execute consistently.",
  },
{
    question: "Do you give signals?",
    answer:
      "No. The goal is to teach you to read the market yourself. Signals create dependency — the opposite of what I stand for.",
  },
  {
    question: "Is this a course?",
    answer:
      "No. This is not another trading course selling you a holy grail. It's an ongoing environment where you learn to think independently, build your own system, and grow as a trader long-term. The goal is real independence — not dependency on someone else's strategy.",
  },
  {
    question: "How do I cancel?",
    answer:
      "Cancel anytime directly through Whop with one click. No emails, no forms, no lock-in period. You keep access until the end of your billing cycle.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="border-t border-white/10 py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-4">
          Questions
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-16">
          Frequently Asked
        </h2>

        <div className="flex flex-col">
          {faqs.map(({ question, answer }, i) => (
            <div key={i} className="border-b border-white/10">
              <button
                type="button"
                id={`faq-question-${i}`}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="text-sm sm:text-base font-medium text-white/80 group-hover:text-white transition-colors pr-8">
                  {question}
                </span>
                <span
                  aria-hidden
                  className="text-xl font-light shrink-0 transition-transform duration-300"
                  style={{
                    color: "#7D9E82",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                inert={open !== i}
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: open === i ? "300px" : "0px",
                }}
              >
                <p className="text-white/40 text-sm leading-relaxed pb-6">
                  {answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
