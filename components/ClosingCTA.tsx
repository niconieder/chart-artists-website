export default function ClosingCTA() {
  return (
    <section className="border-t border-white/10 py-32 px-6 relative overflow-hidden">
      {/* Multi-colour gradient orbs — hidden on mobile for scroll performance */}
      <div
        className="hidden sm:block absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[280px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(61, 140, 122, 0.12)" }}
      />
      <div
        className="hidden sm:block absolute top-[30%] left-1/2 -translate-x-1/2 w-[380px] h-[220px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(196, 168, 74, 0.07)" }}
      />
      <div
        className="hidden sm:block absolute top-1/2 left-[65%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[280px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(125, 158, 130, 0.10)" }}
      />

      {/* Decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-[8rem] sm:text-[12rem] font-bold tracking-tighter whitespace-nowrap opacity-[0.03] text-gradient"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          CHART ARTISTS
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center flex flex-col items-center gap-8">
        <p className="text-white/30 text-xs tracking-[0.2em] uppercase">
          Ready?
        </p>

        <h2 className="text-4xl sm:text-6xl tracking-tighter leading-none">
          <span className="block font-extralight text-white/90">Stop watching.</span>
          <span
            className="block font-bold italic text-gradient pb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Start building.
          </span>
        </h2>

<a
          href="https://whop.com/chart-artists/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-10 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-200 text-black bg-[#7D9E82] hover:bg-[#8fb294] hover:shadow-[0_0_40px_rgba(125,158,130,0.6)]"
        >
          Join Now
        </a>

      </div>
    </section>
  );
}
