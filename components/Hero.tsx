export default function Hero() {
  return (
    <section className="relative hero-bg min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center overflow-hidden">
      {/* Multi-colour gradient orbs — hidden on mobile for scroll performance */}
      <div
        className="hidden sm:block absolute top-1/3 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: "rgba(61, 140, 122, 0.13)" }}
      />
      <div
        className="hidden sm:block absolute top-[20%] left-1/2 -translate-x-1/2 w-[400px] h-[250px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: "rgba(196, 168, 74, 0.08)" }}
      />
      <div
        className="hidden sm:block absolute top-1/3 left-[65%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: "rgba(125, 158, 130, 0.12)" }}
      />

      {/* Content sits above the ::after gradient overlay */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Eyebrow badge */}
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-10 border text-xs tracking-[0.2em] uppercase"
          style={{
            borderColor: "rgba(125, 158, 130, 0.3)",
            background: "rgba(125, 158, 130, 0.08)",
            color: "rgba(163, 191, 168, 0.9)",
          }}
        >
          <span
            className="relative flex h-1.5 w-1.5"
          >
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ background: "#7D9E82" }}
            />
            <span
              className="relative inline-flex rounded-full h-1.5 w-1.5"
              style={{ background: "#7D9E82" }}
            />
          </span>
          Trading since 2019
        </div>

        {/* Headline — mixed weight + serif italic accent */}
        <h1 className="leading-tight tracking-tighter mb-10 max-w-3xl">
          <span className="block text-5xl sm:text-7xl md:text-9xl font-extralight text-white/90">
            Build Your
          </span>
          <span
            className="block text-5xl sm:text-7xl md:text-9xl font-bold italic text-gradient pb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Edge.
          </span>
        </h1>

        {/* Subline */}
        <p className="text-white/50 text-base sm:text-lg max-w-md leading-relaxed mb-12 font-light">
          Become a professional in the financial markets by building a trading
          system that fits your personality. Surround yourself with like-minded
          traders who are focused on real growth, not hype.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <a
            href="https://whop.com/chart-artists/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-200 w-full sm:w-auto text-center text-black bg-[#7D9E82] hover:bg-[#8fb294] hover:shadow-[0_0_30px_rgba(125,158,130,0.5)]"
          >
            Join the Community
          </a>
          <a
            href="https://x.com/WelLdoOnEe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 text-sm hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60"
          >
            Follow on X →
          </a>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 text-white/30 text-xs tracking-widest uppercase">
          114+ traders inside
        </div>
      </div>
    </section>
  );
}
