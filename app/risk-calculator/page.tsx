import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RiskCalculator from "@/components/RiskCalculator";

export const metadata: Metadata = {
  title: "Forex Risk Calculator | The Chart Artists",
  description: "Calculate forex and metals position sizes for one or multiple trading accounts.",
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

