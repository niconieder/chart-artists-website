import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RiskCalculator from "@/components/RiskCalculator";

export const metadata: Metadata = {
  title: "Forex & Futures Risk Calculator | The Chart Artists",
  description: "Calculate forex lot sizes and CME futures contracts for one or multiple trading accounts.",
};

export default function RiskCalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-hidden bg-black pt-24">
        <RiskCalculator />
      </main>
      <Footer />
    </>
  );
}
