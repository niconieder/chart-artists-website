import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chartartists.com"),
  title: "The Chart Artists",
  description:
    "Become a professional in the financial markets. Build a trading system that fits your personality. No signals, no hype — just serious traders since 2019.",
  openGraph: {
    title: "The Chart Artists",
    description: "Build your edge. No hype.",
    url: "https://whop.com/chart-artists/",
    siteName: "The Chart Artists",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@WelLdoOnEe",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-black text-white antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
