import type { AccountCurrency, Rates } from "@/lib/risk-calculator";
import { quoteToAccountRate } from "@/lib/risk-calculator";

export type FuturesInstrument = {
  symbol: string;
  name: string;
  index: "Nasdaq-100" | "S&P 500" | "Dow Jones";
  size: "E-mini" | "Micro E-mini";
  tickSize: number;
  tickValueUsd: number;
  multiplierUsd: number;
};

export const FUTURES_INSTRUMENTS: FuturesInstrument[] = [
  { symbol: "NQ", name: "E-mini Nasdaq-100", index: "Nasdaq-100", size: "E-mini", tickSize: 0.25, tickValueUsd: 5, multiplierUsd: 20 },
  { symbol: "MNQ", name: "Micro E-mini Nasdaq-100", index: "Nasdaq-100", size: "Micro E-mini", tickSize: 0.25, tickValueUsd: 0.5, multiplierUsd: 2 },
  { symbol: "ES", name: "E-mini S&P 500", index: "S&P 500", size: "E-mini", tickSize: 0.25, tickValueUsd: 12.5, multiplierUsd: 50 },
  { symbol: "MES", name: "Micro E-mini S&P 500", index: "S&P 500", size: "Micro E-mini", tickSize: 0.25, tickValueUsd: 1.25, multiplierUsd: 5 },
  { symbol: "YM", name: "E-mini Dow", index: "Dow Jones", size: "E-mini", tickSize: 1, tickValueUsd: 5, multiplierUsd: 5 },
  { symbol: "MYM", name: "Micro E-mini Dow", index: "Dow Jones", size: "Micro E-mini", tickSize: 1, tickValueUsd: 0.5, multiplierUsd: 0.5 },
];

export function calculateFuturesPosition({
  instrument,
  accountCurrency,
  accountSize,
  stopLossTicks,
  riskValue,
  riskMode,
  usdRates,
}: {
  instrument: FuturesInstrument;
  accountCurrency: AccountCurrency;
  accountSize: number;
  stopLossTicks: number;
  riskValue: number;
  riskMode: "percent" | "amount";
  usdRates: Rates;
}) {
  const riskAmount = riskMode === "percent"
    ? accountSize * (riskValue / 100)
    : riskValue;
  const usdToAccountRate = quoteToAccountRate("USD", accountCurrency, usdRates);

  if (
    usdToAccountRate === null ||
    !Number.isFinite(riskAmount) || riskAmount <= 0 ||
    !Number.isFinite(stopLossTicks) || stopLossTicks <= 0
  ) {
    return { contracts: null, riskAmount, riskPerContract: null, actualRisk: null };
  }

  const riskPerContract = stopLossTicks * instrument.tickValueUsd * usdToAccountRate;
  const contracts = Math.floor((riskAmount + Number.EPSILON) / riskPerContract);

  return {
    contracts,
    riskAmount,
    riskPerContract,
    actualRisk: contracts * riskPerContract,
  };
}
