import { NextResponse } from "next/server";

const supportedCurrencies = ["EUR", "GBP", "CHF", "JPY", "AUD", "CAD", "NZD"] as const;

type RatesPayload = {
  base: "USD";
  rates: Record<string, number>;
  provider: string;
  isIntraday: boolean;
  asOf: string;
};

function hasAllRates(rates: Record<string, number>) {
  return supportedCurrencies.every((currency) => Number.isFinite(rates[currency]) && rates[currency] > 0);
}

// Primary source: Coinbase public exchange rates (no key, refreshed intraday).
async function fetchIntradayRates(): Promise<RatesPayload> {
  const response = await fetch("https://api.coinbase.com/v2/exchange-rates?currency=USD", {
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(4000),
  });
  if (!response.ok) throw new Error(`Intraday provider returned ${response.status}`);

  const data = await response.json();
  const rates: Record<string, number> = {};
  for (const currency of supportedCurrencies) {
    rates[currency] = Number(data?.data?.rates?.[currency]);
  }
  if (!hasAllRates(rates)) throw new Error("Intraday provider returned incomplete rates");

  return {
    base: "USD",
    rates: { USD: 1, ...rates },
    provider: "Coinbase",
    isIntraday: true,
    asOf: new Date().toISOString(),
  };
}

// Fallback: ECB reference rates (published once per business day, ~16:00 CET).
async function fetchReferenceRates(): Promise<RatesPayload> {
  const response = await fetch(
    `https://api.frankfurter.app/latest?from=USD&to=${supportedCurrencies.join(",")}`,
    { next: { revalidate: 300 }, signal: AbortSignal.timeout(4000) },
  );
  if (!response.ok) throw new Error(`Reference provider returned ${response.status}`);

  const data = await response.json();
  if (!hasAllRates(data.rates ?? {})) throw new Error("Reference provider returned incomplete rates");

  return {
    base: "USD",
    rates: { USD: 1, ...data.rates },
    provider: "ECB",
    isIntraday: false,
    asOf: data.date,
  };
}

export async function GET() {
  for (const source of [fetchIntradayRates, fetchReferenceRates]) {
    try {
      return NextResponse.json(await source());
    } catch {
      // Try the next source.
    }
  }

  return NextResponse.json(
    { error: "Current exchange rates are temporarily unavailable." },
    { status: 503 },
  );
}
