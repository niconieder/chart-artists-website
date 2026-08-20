import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Member Tools | The Chart Artists",
  description: "Trading tools for members of The Chart Artists.",
};

const tools = [
  {
    name: "Risk Calculator",
    description: "Calculate a position size once across all your trading accounts.",
    href: "/risk-calculator",
    label: "Forex",
  },
];

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-145px)] bg-black px-5 pb-16 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 max-w-xl">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-sage-light">Member area</p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Trading <span className="font-[family-name:var(--font-serif)] font-normal italic text-gradient">tools.</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              Practical tools built for The Chart Artists community.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {tools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="glass-card group rounded-xl p-4 transition duration-200 hover:-translate-y-0.5 hover:border-sage/40 hover:bg-white/[0.05]"
              >
                <div className="mb-7 flex items-start justify-between gap-4">
                  <span className="rounded-full bg-sage/15 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-sage-light">{tool.label}</span>
                  <span className="text-sm text-white/25 transition group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
                </div>
                <h2 className="text-base font-semibold">{tool.name}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-white/40">{tool.description}</p>
              </a>
            ))}

            <div className="rounded-xl border border-dashed border-white/8 p-4 text-white/20">
              <div className="mb-7 flex justify-end"><span className="text-lg">+</span></div>
              <p className="text-sm font-medium">More tools</p>
              <p className="mt-1.5 text-xs">New member tools will appear here.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
