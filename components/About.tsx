export default function About() {
  return (
    <section id="about" className="border-t border-white/10 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-8">
          About
        </p>

        <blockquote
          className="pl-6 mb-8"
          style={{
            borderLeft: "2px solid transparent",
            borderImage: "linear-gradient(to bottom, #C4A84A, #7D9E82, #3D8C7A) 1",
          }}
        >
          <p className="text-2xl sm:text-3xl font-light text-white/90 leading-snug">
            &ldquo;Your trading results reflect who you are. You will be forced
            to realize who you truly are as a human being.&rdquo;
          </p>
        </blockquote>

        <div className="space-y-4 text-white/50 text-sm leading-relaxed">
          <p>
            I&apos;ve been trading since 2019. After years of losses and breakthroughs,
            I figured out that consistency doesn&apos;t come from following someone
            else&apos;s calls — it comes from having a process you trust.
          </p>
          <p>
            You will learn to read price action clearly, build personal frameworks,
            and develop the mental discipline to execute trades, even on hard days.
          </p>
          <p className="text-white/30">No hype. No promises. Just traders doing the work.</p>
        </div>
      </div>
    </section>
  );
}
