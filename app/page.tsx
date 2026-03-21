import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhatYouGet from "@/components/WhatYouGet";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatYouGet />
        <Pricing />
        <Testimonials />
        <FAQ />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
