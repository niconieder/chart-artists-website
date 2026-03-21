const categories = [
  {
    title: "Analysis & Ideas",
    color: "#C4A84A",
    gradientClass: "text-gradient-gold",
    hoverBorder: "hover:border-[#C4A84A]/30",
    hoverShadow: "hover:shadow-[0_0_40px_rgba(196,168,74,0.1)]",
    channels: [
      { name: "Daily Hypo", desc: "Daily intraday charts and setups (no signals)" },
      { name: "Weekly Intention", desc: "Weekly forecast and economic calendar" },
      { name: "HTF Outlook", desc: "Quarterly longterm outlook" },
      { name: "Best Trades", desc: "Breakdowns of recent trades" },
    ],
  },
  {
    title: "Education & Tools",
    color: "#3D8C7A",
    gradientClass: "text-gradient-teal",
    hoverBorder: "hover:border-[#3D8C7A]/30",
    hoverShadow: "hover:shadow-[0_0_40px_rgba(61,140,122,0.12)]",
    channels: [
      { name: "Education", desc: "Protocols and journal templates" },
      { name: "Trading Models", desc: "My own models and the Medusa indicator" },
      { name: "How To", desc: "Best brokers, prop firms, wallets and tools" },
      { name: "Mental Edge", desc: "Understand your thinking patterns and build real confidence" },
    ],
  },
  {
    title: "Community",
    color: "#7D9E82",
    gradientClass: "text-gradient",
    hoverBorder: "hover:border-[#7D9E82]/30",
    hoverShadow: "hover:shadow-[0_0_40px_rgba(125,158,130,0.12)]",
    channels: [
      { name: "Trading Chat", desc: "Share charts and discuss markets" },
      { name: "General Chat", desc: "Everything beyond trading" },
    ],
  },
  {
    title: "Bigger Picture",
    color: "#C4A84A",
    gradientClass: "text-gradient-gold",
    hoverBorder: "hover:border-[#C4A84A]/30",
    hoverShadow: "hover:shadow-[0_0_40px_rgba(196,168,74,0.1)]",
    channels: [
      { name: "Investments", desc: "Longterm crypto and stock ideas, market sentiment" },
      { name: "Financial Shift", desc: "CBDCs and how they impact the future of finance" },
    ],
  },
];

export default function WhatYouGet() {
  return (
    <section id="inside" className="border-t border-white/10 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-4">
          Membership
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          What&apos;s Inside
        </h2>
        <p className="text-white/50 text-sm leading-relaxed mb-16 max-w-lg">
          Learn to think and act like a professional in the markets.
          The goal is to become independent — self-thinking is essential for this.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map(({ title, color, gradientClass, hoverBorder, hoverShadow, channels }) => (
            <div
              key={title}
              className={`glass-card rounded-xl p-6 transition-all duration-300 ${hoverBorder} ${hoverShadow}`}
            >
              <h3 className={`${gradientClass} text-xs font-bold tracking-[0.2em] uppercase mb-6`}>
                {title}
              </h3>

              <div className="space-y-4">
                {channels.map(({ name, desc }) => (
                  <div key={name}>
                    <p className="text-sm font-medium mb-0.5">
                      <span className="text-white/20 mr-1.5" style={{ color }}>｜</span>
                      {name}
                    </p>
                    <p className="text-white/35 text-xs leading-relaxed pl-5">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
