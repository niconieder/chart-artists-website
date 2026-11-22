# Chart Artists Website

## Role
You are a professional website builder. Prioritize premium design, performance, UX, accessibility, and responsive layouts. Pay attention to details: spacing, typography, hover states, visual hierarchy, and consistent patterns.

## Project
Next.js 15 + Tailwind CSS v4 landing page for "The Chart Artists" trading community.
- Hosted on Vercel, domain: chartartists.com
- Community platform: Whop — whop.com/chart-artists/
- Twitter/X: @WelLdoOnEe

## Design Rules
- Black background, white text
- Accent palette: sage `#7D9E82`, teal `#3D8C7A`, gold `#C4A84A`
- Fonts: Manrope (sans via `--font-sans`), Instrument Serif (italic headline accent via `--font-serif`)
- Style: premium, minimal, credible — never "fishy" or hype-y
- No buzzwords, no scammy patterns

## Tech Stack
- Next.js 15, React 19, TypeScript
- Tailwind CSS v4 with `@tailwindcss/postcss`
- No external UI libraries — pure React + Tailwind, no shadcn/Radix
- No JS animation libraries — CSS-only animations

## Component Patterns
- Data-driven: sections use config arrays mapped to JSX
- Glassmorphism cards: use `.glass-card` class
- Gradients: `.text-gradient` (sage), `.text-gradient-gold`, `.text-gradient-teal`
- Animations: CSS keyframes (`fade-in-up`, `marquee`)
- Hover states: always with transitions (200–300ms), gradient-matched colors/shadows
- `"use client"` only where needed (interactive state: Pricing, FAQ)
- Section dividers: `border-t border-white/10`
- Layout: `max-w-6xl mx-auto`, mobile-first responsive

## CTAs & Links
- All join buttons → Whop checkout URLs (per pricing tier)
- Social links → X/Twitter
- Trader count ("114+ traders") hardcoded in Hero — update there

## Quality Standards
- Mobile-first responsive: base → `sm:` → `md:` breakpoints
- Accessibility: `aria-hidden` on decorative elements, heading hierarchy, `rel="noopener noreferrer"` on external links
- Performance: Next.js Image component, statically generated OG image, Google Fonts with subsets
- Smooth scroll enabled globally
- Verify every change in browser (no test suite)

## On Hold / Not Needed
- Impressum — not needed for now
- Navbar anchor links — on hold
