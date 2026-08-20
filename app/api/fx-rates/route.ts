import { NextResponse } from "next/server";

const supportedCurrencies = "EUR,GBP,CHF,JPY,AUD,CAD,NZD";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?from=USD&to=${supportedCurrencies}`,
      { next: { revalidate: 300 } },
    );

    if (!response.ok) throw new Error(`Rate provider returned ${response.status}`);
    const data = await response.json();

    return NextResponse.json({
      base: "USD",
      date: data.date,
      rates: { USD: 1, ...data.rates },
      provider: "Frankfurter / ECB",
      isIntraday: false,
    });
  } catch {
    return NextResponse.json(
      { error: "Current exchange rates are temporarily unavailable." },
      { status: 503 },
    );
  }
}

