const plans = [
  {
    name: "Monthly",
    price: "$40",
    period: "/ month",
    note: "Cancel anytime",
    badge: null,
    cta: "Get Started",
    href: "https://whop.com/checkout/plan_3kJCCrsfLB9xV",
    featured: false,
    accentColor: "#7D9E82",
    gradient: "text-gradient",
  },
  {
    name: "3 Months",
    price: "$108",
    period: "/ 3 months",
    note: "Save $12 — 10% off",
    badge: "Most Popular",
    cta: "Get Started",
    href: "https://whop.com/checkout/plan_FFwX1fOouimgT",
    featured: true,
    accentColor: "#C4A84A",
    gradient: "text-gradient-gold",
  },
  {
    name: "Lifetime",
    price: "$420",
    period: "one-time",
    note: "Pay once, access forever",
    badge: null,
    cta: "Get Lifetime Access",
    href: "https://whop.com/checkout/plan_TopjWVtiNd2g9",
    featured: false,
    accentColor: "#3D8C7A",
    gradient: "text-gradient-teal",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-white/10 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-4">
          Pricing
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-16">
          Simple, Transparent Pricing
        </h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {plans.map(({ name, price, period, note, badge, cta, href, featured, accentColor, gradient }) => (
            <div
              key={name}
              className={`relative glass-card rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 ${
                featured ? "md:-mt-4 md:mb-[-16px]" : ""
              }`}
              style={
                featured
                  ? {
                      border: "1px solid",
                      borderColor: `${accentColor}40`,
                      boxShadow: `0 0 50px ${accentColor}18`,
                    }
                  : {}
              }
            >
              {badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold tracking-widest uppercase rounded-full text-black"
                  style={{ background: accentColor }}
                >
                  {badge}
                </div>
              )}

              <p className="text-white/50 text-xs tracking-[0.2em] uppercase mb-4">{name}</p>

              <div className="mb-2 flex items-end gap-2">
                <span className={`text-5xl font-bold tracking-tighter ${gradient}`}>
                  {price}
                </span>
                <span className="text-white/30 text-sm mb-1.5">{period}</span>
              </div>
              <p className="text-xs mb-8" style={{ color: `${accentColor}CC` }}>
                {note}
              </p>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`pricing-cta w-full text-center py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-200 ${
                  featured ? "pricing-cta-featured" : "pricing-cta-outline"
                }`}
                style={
                  featured
                    ? {
                        background: accentColor,
                        color: "#000",
                        "--pricing-hover-shadow": `0 0 30px ${accentColor}50`,
                      } as React.CSSProperties
                    : {
                        border: `1px solid ${accentColor}50`,
                        color: accentColor,
                        "--pricing-hover-background": `${accentColor}15`,
                      } as React.CSSProperties
                }
              >
                {cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-white/20 text-xs mt-8">
          Hosted on Whop · Secure checkout · Cancel anytime
        </p>
      </div>
    </section>
  );
}
