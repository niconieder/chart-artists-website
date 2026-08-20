export const ACCOUNT_CURRENCIES = [
  "EUR",
  "USD",
  "GBP",
  "CHF",
  "JPY",
  "AUD",
  "CAD",
  "NZD",
] as const;

export type AccountCurrency = (typeof ACCOUNT_CURRENCIES)[number];

export type Instrument = {
  symbol: string;
  base: string;
  quote: string;
  pipSize: number;
  contractSize: number;
  category: "Forex" | "Metals";
};

export const MAJOR_PAIRS = [
  "EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "USD/CAD", "AUD/USD", "NZD/USD",
] as const;

const forexPairs = [
  ...MAJOR_PAIRS,
  "AUD/CAD", "AUD/CHF", "AUD/JPY", "AUD/NZD",
  "CAD/CHF", "CAD/JPY", "CHF/JPY", "EUR/AUD", "EUR/CAD",
  "EUR/CHF", "EUR/GBP", "EUR/JPY", "EUR/NZD",
  "GBP/AUD", "GBP/CAD", "GBP/CHF", "GBP/JPY", "GBP/NZD",
  "NZD/CAD", "NZD/CHF", "NZD/JPY",
];

export const INSTRUMENTS: Instrument[] = [
  ...forexPairs.map((symbol) => {
    const [base, quote] = symbol.split("/");
    return {
      symbol,
      base,
      quote,
      pipSize: quote === "JPY" ? 0.01 : 0.0001,
      contractSize: 100_000,
      category: "Forex" as const,
    };
  }),
  { symbol: "XAU/USD", base: "XAU", quote: "USD", pipSize: 0.01, contractSize: 100, category: "Metals" },
  { symbol: "XAG/USD", base: "XAG", quote: "USD", pipSize: 0.001, contractSize: 5_000, category: "Metals" },
];

export type Rates = Record<string, number>;

export function quoteToAccountRate(
  quoteCurrency: string,
  accountCurrency: AccountCurrency,
  usdRates: Rates,
) {
  if (quoteCurrency === accountCurrency) return 1;
  const quoteRate = quoteCurrency === "USD" ? 1 : usdRates[quoteCurrency];
  const accountRate = accountCurrency === "USD" ? 1 : usdRates[accountCurrency];
  if (!quoteRate || !accountRate) return null;
  return accountRate / quoteRate;
}

export function calculatePosition({
  instrument,
  accountCurrency,
  accountSize,
  stopLossPips,
  riskValue,
  riskMode,
  usdRates,
}: {
  instrument: Instrument;
  accountCurrency: AccountCurrency;
  accountSize: number;
  stopLossPips: number;
  riskValue: number;
  riskMode: "percent" | "amount";
  usdRates: Rates;
}) {
  const riskAmount = riskMode === "percent"
    ? accountSize * (riskValue / 100)
    : riskValue;
  const conversionRate = quoteToAccountRate(instrument.quote, accountCurrency, usdRates);

  if (
    conversionRate === null ||
    !Number.isFinite(riskAmount) || riskAmount <= 0 ||
    !Number.isFinite(stopLossPips) || stopLossPips <= 0
  ) {
    return { lots: null, riskAmount, pipValuePerLot: null };
  }

  const pipValuePerLot = instrument.contractSize * instrument.pipSize * conversionRate;
  const lots = riskAmount / (stopLossPips * pipValuePerLot);
  return { lots, riskAmount, pipValuePerLot };
}
