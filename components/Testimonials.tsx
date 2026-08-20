const testimonials = [
  {
    quote:
      "After being stuck for over two years, I had my first profitable month. My entire approach, mindset, and routine have completely changed.",
    name: "grindben",
  },
  {
    quote:
      "I went from taking 10–20 random trades a day to patiently waiting for high-quality setups. That shift alone changed my entire trading.",
    name: "Trader_dfd",
  },
  {
    quote:
      "After years of inconsistency and blowing multiple accounts, I finally found a structured and simple approach. My trading is improving week by week, and for the first time I feel like I'm on the right path.",
    name: "haredtrades",
  },
  {
    quote:
      "This mentorship completely changed how I approach trading. I'm calmer, more disciplined, and finally understand the importance of mindset and execution.",
    name: "NYBB_Bae2",
  },
  {
    quote:
      "Your consistency, professionalism, and mindset are on another level. You constantly push me to approach trading in a more professional way.",
    name: "CS",
  },
  {
    quote:
      "I stopped overcomplicating everything and started treating trading like a real business. My approach is now structured, focused, and much more effective.",
    name: "MAX",
  },
  {
    quote:
      "Being able to compare my market view with an experienced trader helped me grow fast. The daily updates and clear guidance made a huge difference in my understanding.",
    name: "Tradingstrom",
  },
  {
    quote:
      "I became consistent in my analysis and finally feel confident in what I'm doing. I know I'm on the right path — it's just a matter of time now.",
    name: "emanueleon",
  },
  {
    quote:
      "Complex concepts were broken down into simple, practical steps. I've gained confidence in my decisions and improved my performance significantly.",
    name: "Ploxin",
  },
  {
    quote:
      "I feel much more prepared and confident in the markets. I've learned to stay patient, trust my approach, and focus on what actually works for me.",
    name: "Swe_Trader",
  },
  {
    quote:
      "I learned how to structure and organize my entire trading approach. The difference between analyzing and actually trading is clear to me now.",
    name: "NewfarmerM",
  },
  {
    quote:
      "Learning how to approach the markets on a weekly basis changed everything for me. I now know when to trade and when to stay patient.",
    name: "jefrey",
  },
  {
    quote:
      "This program gave me a completely new perspective on trading. I now make more informed decisions and approach the market with a clear plan.",
    name: "t0nnnny",
  },
];

function TestimonialCard({ quote, name }: { quote: string; name: string }) {
  return (
    <div className="glass-card rounded-xl p-8 relative shrink-0 w-[85vw] sm:w-[340px] whitespace-normal snap-start transition-all duration-300 hover:border-[#7D9E82]/20 hover:shadow-[0_0_30px_rgba(125,158,130,0.08)]">
      <span
        className="absolute top-4 right-6 text-8xl leading-none select-none pointer-events-none opacity-5"
        style={{ color: "#7D9E82" }}
        aria-hidden
      >
        &ldquo;
      </span>

      <p className="text-white/70 leading-relaxed mb-6 text-sm">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="font-semibold text-sm text-white/50">{name}</p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl mb-16 px-6">
        <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-4">
          Members
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          What Members Say
        </h2>
      </div>

      <div className="overflow-x-auto sm:overflow-hidden snap-x snap-mandatory sm:snap-none scrollbar-hide px-6 sm:px-0">
        <div className="testimonial-track">
          <div className="flex gap-4 sm:pr-4">
            {testimonials.map(({ quote, name }, i) => (
              <TestimonialCard key={i} quote={quote} name={name} />
            ))}
          </div>
          <div className="hidden sm:flex gap-4 pr-4" aria-hidden>
            {testimonials.map(({ quote, name }, i) => (
              <TestimonialCard key={`duplicate-${i}`} quote={quote} name={name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
