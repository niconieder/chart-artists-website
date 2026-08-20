"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ACCOUNT_CURRENCIES,
  INSTRUMENTS,
  MAJOR_PAIRS,
  calculatePosition,
  type AccountCurrency,
  type Rates,
} from "@/lib/risk-calculator";
import {
  FUTURES_INSTRUMENTS,
  calculateFuturesPosition,
} from "@/lib/futures-calculator";

type Market = "forex" | "futures";

type TradingAccount = {
  id: string;
  name: string;
  balance: number;
  currency: AccountCurrency;
  riskPercent: number;
};

type QuickAccount = {
  accountSize: number;
  accountCurrency: AccountCurrency;
  riskValue: number;
  riskMode: "percent" | "amount";
};

const currencySymbols: Record<AccountCurrency, string> = {
  EUR: "€", USD: "$", GBP: "£", CHF: "CHF", JPY: "¥", AUD: "A$", CAD: "C$", NZD: "NZ$",
};

const defaultForexAccount: TradingAccount = {
  id: "main-forex-account",
  name: "Main Account",
  balance: 10_000,
  currency: "EUR",
  riskPercent: 2,
};

const defaultFuturesAccount: TradingAccount = {
  id: "main-futures-account",
  name: "Main Account",
  balance: 50_000,
  currency: "USD",
  riskPercent: 1,
};

const defaultQuickAccounts: Record<Market, QuickAccount> = {
  forex: { accountSize: 10_000, accountCurrency: "EUR", riskValue: 2, riskMode: "percent" },
  futures: { accountSize: 50_000, accountCurrency: "USD", riskValue: 1, riskMode: "percent" },
};

function normalizeStoredAccounts(value: unknown, market: Market) {
  if (!Array.isArray(value) || !value.length) return null;

  return value.map((value, index) => {
    const account = value as TradingAccount;
    return {
      ...account,
      id: String(account.id).startsWith(`${market}-`)
        ? account.id
        : `${market}-${account.id || index}`,
    };
  });
}

function numberValue(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function optionalNumberValue(value: string) {
  if (!value.trim()) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatMoney(value: number, currency: AccountCurrency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(value);
}

function roundedLots(lots: number | null) {
  return lots === null ? null : Math.round(lots * 100) / 100;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/45">{children}</span>;
}

const inputClass = "h-9 w-full rounded-lg border border-white/10 bg-white/[0.055] px-3 text-xs text-white outline-none transition placeholder:text-white/25 focus:border-sage/70 focus:bg-white/[0.075]";

function PairPicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const majorPairSet = useMemo(() => new Set<string>(MAJOR_PAIRS), []);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const normalizedQuery = query.replace(/[^a-z]/gi, "").toUpperCase();
  const filtered = INSTRUMENTS.filter((item) =>
    item.symbol.replace("/", "").includes(normalizedQuery),
  );
  const sections = [
    { label: "Majors", items: filtered.filter((item) => majorPairSet.has(item.symbol)) },
    { label: "Forex", items: filtered.filter((item) => item.category === "Forex" && !majorPairSet.has(item.symbol)) },
    { label: "Metals", items: filtered.filter((item) => item.category === "Metals") },
  ].filter((section) => section.items.length > 0);

  function selectPair(symbol: string) {
    onChange(symbol);
    setQuery("");
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input
        aria-controls="pair-options"
        aria-expanded={open}
        aria-label="Currency pair"
        aria-autocomplete="list"
        className={`${inputClass} pr-10`}
        role="combobox"
        value={open ? query : value}
        placeholder={open ? `Search pairs… (${value})` : undefined}
        onFocus={() => { setQuery(""); setOpen(true); }}
        onChange={(event) => { setQuery(event.target.value); setOpen(true); }}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
          if (event.key === "Enter" && open && filtered[0]) {
            event.preventDefault();
            selectPair(filtered[0].symbol);
          }
        }}
      />
      <span aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/35">⌄</span>
      {open && (
        <div id="pair-options" role="listbox" className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-[#111412] p-2 shadow-2xl shadow-black/60">
          {sections.length ? sections.map((section) => (
            <div key={section.label} className="mb-2 last:mb-0">
              <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">{section.label}</p>
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                {section.items.map((item) => (
                  <button
                    key={item.symbol}
                    role="option"
                    aria-selected={item.symbol === value}
                    onClick={() => selectPair(item.symbol)}
                    className={`rounded-lg px-2.5 py-2 text-left text-xs transition ${item.symbol === value ? "bg-sage/20 text-sage-light" : "text-white/70 hover:bg-white/[0.07] hover:text-white"}`}
                  >
                    {item.symbol}
                  </button>
                ))}
              </div>
            </div>
          )) : <p className="px-3 py-5 text-center text-xs text-white/35">No matching pair</p>}
        </div>
      )}
    </div>
  );
}

function FuturesPicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const indexes = ["Nasdaq-100", "S&P 500", "Dow Jones"] as const;

  return (
    <select
      aria-label="Futures contract"
      className={`${inputClass} calculator-select`}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {indexes.map((index) => (
        <optgroup key={index} label={index}>
          {FUTURES_INSTRUMENTS.filter((item) => item.index === index).map((item) => (
            <option key={item.symbol} value={item.symbol}>
              {item.symbol} — {item.size}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

export default function RiskCalculator() {
  const [market, setMarket] = useState<Market>("forex");
  const [pair, setPair] = useState("EUR/USD");
  const [stopLoss, setStopLoss] = useState(50);
  const [futuresSymbol, setFuturesSymbol] = useState("NQ");
  const [futuresStopLoss, setFuturesStopLoss] = useState(40);
  const [futuresEntryPrice, setFuturesEntryPrice] = useState("");
  const [futuresStopPrice, setFuturesStopPrice] = useState("");
  const [quickAccounts, setQuickAccounts] = useState<Record<Market, QuickAccount>>(defaultQuickAccounts);
  const [accountsByMarket, setAccountsByMarket] = useState<Record<Market, TradingAccount[]>>({
    forex: [defaultForexAccount],
    futures: [defaultFuturesAccount],
  });
  const [rates, setRates] = useState<Rates>({ USD: 1 });
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);

  const { accountSize, accountCurrency, riskValue, riskMode } = quickAccounts[market];
  const accounts = accountsByMarket[market];
  const instrument = INSTRUMENTS.find((item) => item.symbol === pair) ?? INSTRUMENTS[0];
  const futuresInstrument = FUTURES_INSTRUMENTS.find((item) => item.symbol === futuresSymbol) ?? FUTURES_INSTRUMENTS[0];
  const entryPrice = optionalNumberValue(futuresEntryPrice);
  const stopPrice = optionalNumberValue(futuresStopPrice);
  const priceInputsComplete = futuresEntryPrice.trim() !== "" && futuresStopPrice.trim() !== "";
  const priceDistance = entryPrice !== null && stopPrice !== null
    ? Math.abs(entryPrice - stopPrice)
    : null;
  const rawPriceTicks = priceDistance === null ? null : priceDistance / futuresInstrument.tickSize;
  const roundedPriceTicks = rawPriceTicks === null ? null : Math.round(rawPriceTicks);
  const derivedStopLossTicks =
    entryPrice !== null && entryPrice > 0 &&
    stopPrice !== null && stopPrice > 0 &&
    roundedPriceTicks !== null && roundedPriceTicks > 0 &&
    rawPriceTicks !== null && Math.abs(rawPriceTicks - roundedPriceTicks) < 0.000001
      ? roundedPriceTicks
      : null;
  const effectiveFuturesStopLoss = priceInputsComplete
    ? derivedStopLossTicks ?? 0
    : futuresStopLoss;

  useEffect(() => {
    try {
      const savedAccounts = localStorage.getItem("chart-artists-risk-accounts-v3");
      if (savedAccounts) {
        const parsed = JSON.parse(savedAccounts);
        const parsedForex = normalizeStoredAccounts(parsed.forex, "forex");
        const parsedFutures = normalizeStoredAccounts(parsed.futures, "futures");
        setAccountsByMarket({
          forex: parsedForex ?? [defaultForexAccount],
          futures: parsedFutures ?? [defaultFuturesAccount],
        });
      } else {
        const legacy = localStorage.getItem("chart-artists-risk-accounts");
        const parsedLegacy = legacy ? normalizeStoredAccounts(JSON.parse(legacy), "forex") : null;
        if (parsedLegacy) {
          setAccountsByMarket({ forex: parsedLegacy, futures: [defaultFuturesAccount] });
        }
      }
    } catch {
      // Keep the safe default when browser storage contains invalid data.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("chart-artists-risk-accounts-v3", JSON.stringify(accountsByMarket));
  }, [accountsByMarket, hydrated]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/fx-rates", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Rates unavailable");
        return response.json();
      })
      .then((data) => {
        setRates(data.rates);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const singleResult = useMemo(() => calculatePosition({
    instrument,
    accountCurrency,
    accountSize,
    stopLossPips: stopLoss,
    riskValue,
    riskMode,
    usdRates: rates,
  }), [instrument, accountCurrency, accountSize, stopLoss, riskValue, riskMode, rates]);
  const singleRoundedLots = roundedLots(singleResult.lots);
  const singleForexActualRisk = singleRoundedLots === null || singleResult.pipValuePerLot === null
    ? null
    : singleRoundedLots * stopLoss * singleResult.pipValuePerLot;

  const singleFuturesResult = useMemo(() => calculateFuturesPosition({
    instrument: futuresInstrument,
    accountCurrency,
    accountSize,
    stopLossTicks: effectiveFuturesStopLoss,
    riskValue,
    riskMode,
    usdRates: rates,
  }), [futuresInstrument, accountCurrency, accountSize, effectiveFuturesStopLoss, riskValue, riskMode, rates]);

  const singlePositionSize = market === "forex" ? singleRoundedLots : singleFuturesResult.contracts;
  const singleActualRisk = market === "forex" ? singleForexActualRisk : singleFuturesResult.actualRisk;

  async function copyPositionSize() {
    if (singlePositionSize === null) return;
    try {
      await navigator.clipboard.writeText(market === "forex" ? singlePositionSize.toFixed(2) : singlePositionSize.toString());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  function updateQuickAccount(patch: Partial<QuickAccount>) {
    setQuickAccounts((current) => ({
      ...current,
      [market]: { ...current[market], ...patch },
    }));
  }

  function commitAccounts(selectedMarket: Market, nextAccounts: TradingAccount[]) {
    const next = { ...accountsByMarket, [selectedMarket]: nextAccounts };
    setAccountsByMarket(next);
    try {
      localStorage.setItem("chart-artists-risk-accounts-v3", JSON.stringify(next));
    } catch {
      // The accounts still work for the current session when storage is unavailable.
    }
  }

  function updateAccount(selectedMarket: Market, id: string, patch: Partial<TradingAccount>) {
    const current = accountsByMarket[selectedMarket];
    commitAccounts(selectedMarket, current.map((account) => account.id === id ? { ...account, ...patch } : account));
  }

  function addAccount(selectedMarket: Market) {
    const current = accountsByMarket[selectedMarket];
    commitAccounts(selectedMarket, [...current, {
      id: crypto.randomUUID(),
      name: `Account ${current.length + 1}`,
      balance: selectedMarket === "forex" ? 10_000 : 50_000,
      currency: selectedMarket === "forex" ? "EUR" : "USD",
      riskPercent: 1,
    }]);
  }

  function removeAccount(selectedMarket: Market, id: string) {
    const current = accountsByMarket[selectedMarket];
    commitAccounts(selectedMarket, current.filter((account) => account.id !== id));
  }

  return (
    <section className="relative px-5 pb-10 pt-3 sm:px-6 sm:pt-4">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-sage/[0.055] blur-[130px]" />
      <div className="relative mx-auto max-w-4xl">
        <a href="/tools" className="mb-3 inline-flex text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 transition hover:text-sage-light">← All tools</a>
        <h1 className="sr-only">Forex and futures risk calculator</h1>
        <div className="mb-3 flex w-fit rounded-lg border border-white/10 bg-white/[0.035] p-0.5">
          {(["forex", "futures"] as const).map((item) => (
            <button
              key={item}
              aria-pressed={market === item}
              onClick={() => setMarket(item)}
              className={`min-w-20 rounded-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${
                market === item ? "bg-white text-black" : "text-white/40 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="glass-card relative z-20 mb-3 rounded-xl p-3">
          <div className="mb-2.5 flex items-baseline justify-between gap-4">
            <h2 className="text-xs font-semibold">Trade setup</h2>
            <p className="hidden text-[10px] text-white/30 sm:block">Used for every account</p>
          </div>
          {market === "forex" ? (
            <div className="grid gap-2.5 sm:grid-cols-[1fr_130px]">
              <label>
                <FieldLabel>Currency pair</FieldLabel>
                <PairPicker value={pair} onChange={setPair} />
              </label>
              <label>
                <FieldLabel>Stop loss (pips)</FieldLabel>
                <input aria-label="Stop loss in pips" className={inputClass} type="number" min="0.1" step="0.1" value={stopLoss} onChange={(event) => setStopLoss(numberValue(event.target.value))} />
              </label>
            </div>
          ) : (
            <>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-[1fr_120px_120px_120px]">
                <label>
                  <FieldLabel>CME contract</FieldLabel>
                  <FuturesPicker value={futuresSymbol} onChange={setFuturesSymbol} />
                </label>
                <label>
                  <FieldLabel>Entry price</FieldLabel>
                  <input aria-label="Futures entry price" className={inputClass} type="number" min="0" step={futuresInstrument.tickSize} placeholder="Optional" value={futuresEntryPrice} onChange={(event) => setFuturesEntryPrice(event.target.value)} />
                </label>
                <label>
                  <FieldLabel>Stop price</FieldLabel>
                  <input aria-label="Futures stop price" className={inputClass} type="number" min="0" step={futuresInstrument.tickSize} placeholder="Optional" value={futuresStopPrice} onChange={(event) => setFuturesStopPrice(event.target.value)} />
                </label>
                <label>
                  <FieldLabel>Stop (ticks)</FieldLabel>
                  <input
                    aria-label="Stop loss in ticks"
                    className={`${inputClass} read-only:cursor-default read-only:text-sage-light`}
                    type="number"
                    min="1"
                    step="1"
                    readOnly={priceInputsComplete}
                    title={priceInputsComplete ? "Calculated from entry and stop prices" : "Enter the stop distance manually"}
                    value={priceInputsComplete ? derivedStopLossTicks ?? "" : futuresStopLoss}
                    onChange={(event) => setFuturesStopLoss(numberValue(event.target.value))}
                  />
                </label>
              </div>
              <div className="mt-2.5 border-t border-white/8 pt-2.5 text-[9px] text-white/35">
                {priceInputsComplete && (
                  <p className={`mb-1.5 ${derivedStopLossTicks === null ? "text-red-300/80" : "text-sage-light/80"}`}>
                    {derivedStopLossTicks === null
                      ? `Entry and stop must differ and follow ${futuresInstrument.tickSize}-point increments.`
                      : `${Number(priceDistance?.toFixed(4))} points = ${derivedStopLossTicks} ${derivedStopLossTicks === 1 ? "tick" : "ticks"}`}
                  </p>
                )}
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <span>{futuresInstrument.name}</span>
                  <span>Tick size: {futuresInstrument.tickSize} pts</span>
                  <span>1 point = {1 / futuresInstrument.tickSize} {1 / futuresInstrument.tickSize === 1 ? "tick" : "ticks"}</span>
                  <span>Tick value: ${futuresInstrument.tickValueUsd.toFixed(2)}</span>
                  <span>Multiplier: ${futuresInstrument.multiplierUsd} × index</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="grid gap-3 md:grid-cols-[0.86fr_1.14fr] md:items-start">
          <div key={`quick-${market}`} className="glass-card rounded-xl p-3">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sage/15 text-[10px] text-sage-light">◎</div>
              <div>
                <h2 className="text-xs font-semibold">Quick calculator</h2>
                <p className="text-[10px] text-white/30">One account, one position</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="grid grid-cols-[1fr_82px] gap-2">
                <label><FieldLabel>Account size</FieldLabel><input aria-label="Account size" className={inputClass} type="number" min="0" value={accountSize} onChange={(event) => updateQuickAccount({ accountSize: numberValue(event.target.value) })} /></label>
                <label><FieldLabel>Currency</FieldLabel><select aria-label="Account currency" className={`${inputClass} calculator-select`} value={accountCurrency} onChange={(event) => updateQuickAccount({ accountCurrency: event.target.value as AccountCurrency })}>{ACCOUNT_CURRENCIES.map((currency) => <option key={currency}>{currency}</option>)}</select></label>
              </div>

              <div>
                <FieldLabel>Risk</FieldLabel>
                <div className="grid grid-cols-[1fr_auto] gap-3">
                  <input aria-label="Risk" className={inputClass} type="number" min="0" step="0.1" value={riskValue} onChange={(event) => updateQuickAccount({ riskValue: numberValue(event.target.value) })} />
                  <div className="flex rounded-lg border border-white/10 bg-white/[0.055] p-0.5">
                    <button onClick={() => updateQuickAccount({ riskMode: "percent" })} className={`min-w-10 rounded-md px-2 text-xs transition ${riskMode === "percent" ? "bg-white text-black" : "text-white/45 hover:text-white"}`}>%</button>
                    <button onClick={() => updateQuickAccount({ riskMode: "amount" })} className={`min-w-10 rounded-md px-2 text-xs transition ${riskMode === "amount" ? "bg-white text-black" : "text-white/45 hover:text-white"}`}>{currencySymbols[accountCurrency]}</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-sage/25 bg-gradient-to-br from-sage/15 to-teal/5 p-3">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.16em] text-white/40">Position size</p>
                  <p className="mt-0.5 text-xl font-semibold tracking-tight">
                    {singlePositionSize === null
                      ? "—"
                      : market === "forex"
                        ? singlePositionSize.toFixed(2)
                        : singlePositionSize}
                  </p>
                </div>
                <div className="flex items-center gap-2 pb-1">
                  <span className="text-xs text-white/45">{market === "forex" ? "Lots" : "Contracts"}</span>
                  <button disabled={singlePositionSize === null} onClick={copyPositionSize} className="rounded-md border border-white/10 px-2 py-1 text-[8px] font-semibold uppercase tracking-wider text-white/45 transition hover:border-sage/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30">{copied ? "Copied" : "Copy"}</button>
                </div>
              </div>
              <div className="mt-2.5 border-t border-white/10 pt-2.5 text-[10px] text-white/40">
                <div className="flex flex-wrap justify-between gap-2">
                  <span>Actual risk: {singleActualRisk === null ? "—" : formatMoney(singleActualRisk, accountCurrency)}</span>
                  {market === "futures" && singleFuturesResult.riskPerContract !== null && (
                    <span>Per contract: {formatMoney(singleFuturesResult.riskPerContract, accountCurrency)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div key={`accounts-${market}`} className="glass-card rounded-xl p-3">
            <div className="mb-3 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2"><h2 className="text-xs font-semibold">Multi-account calculator</h2><span className="rounded-full bg-sage/15 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-sage-light">Auto-saved</span></div>
                <p className="mt-0.5 text-[10px] text-white/30">One setup, every account</p>
              </div>
              <button onClick={() => addAccount(market)} className="rounded-lg border border-white/15 px-2.5 py-1.5 text-[10px] font-medium transition hover:border-sage/60 hover:bg-sage/10">+ Add account</button>
            </div>

            <div className="space-y-2">
              {accounts.map((account) => {
                const forexResult = calculatePosition({ instrument, accountCurrency: account.currency, accountSize: account.balance, stopLossPips: stopLoss, riskValue: account.riskPercent, riskMode: "percent", usdRates: rates });
                const accountLots = roundedLots(forexResult.lots);
                const forexActualRisk = accountLots === null || forexResult.pipValuePerLot === null ? null : accountLots * stopLoss * forexResult.pipValuePerLot;
                const futuresResult = calculateFuturesPosition({ instrument: futuresInstrument, accountCurrency: account.currency, accountSize: account.balance, stopLossTicks: effectiveFuturesStopLoss, riskValue: account.riskPercent, riskMode: "percent", usdRates: rates });
                const positionSize = market === "forex" ? accountLots : futuresResult.contracts;
                const actualRisk = market === "forex" ? forexActualRisk : futuresResult.actualRisk;
                return (
                  <div key={account.id} className="rounded-xl border border-white/8 bg-white/[0.025] p-2.5">
                    <div className="mb-2 flex items-center justify-between gap-2.5">
                      <input aria-label="Account name" className="min-w-0 flex-1 bg-transparent text-xs font-medium text-white outline-none placeholder:text-white/25" value={account.name} onChange={(event) => updateAccount(market, account.id, { name: event.target.value })} />
                      <div className="text-right">
                        <p className="text-base font-semibold text-sage-light">{positionSize === null ? "—" : market === "forex" ? positionSize.toFixed(2) : positionSize}</p>
                        <p className="text-[8px] uppercase tracking-wider text-white/30">{market === "forex" ? "Lots" : "Contracts"}</p>
                      </div>
                      {accounts.length > 1 && <button aria-label={`Remove ${account.name}`} onClick={() => removeAccount(market, account.id)} className="ml-1 text-lg text-white/25 transition hover:text-red-300">×</button>}
                    </div>
                    <div className="grid grid-cols-[1fr_76px_70px] gap-1.5">
                      <input aria-label={`${account.name} balance`} className={`${inputClass} px-3`} type="number" min="0" value={account.balance} onChange={(event) => updateAccount(market, account.id, { balance: numberValue(event.target.value) })} />
                      <select aria-label={`${account.name} currency`} className={`${inputClass} calculator-select px-2`} value={account.currency} onChange={(event) => updateAccount(market, account.id, { currency: event.target.value as AccountCurrency })}>{ACCOUNT_CURRENCIES.map((currency) => <option key={currency}>{currency}</option>)}</select>
                      <div className="relative"><input aria-label={`${account.name} risk percent`} className={`${inputClass} px-3 pr-6`} type="number" min="0" step="0.1" value={account.riskPercent} onChange={(event) => updateAccount(market, account.id, { riskPercent: numberValue(event.target.value) })} /><span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-white/35">%</span></div>
                    </div>
                    <div className="mt-2 flex justify-end text-[9px] text-white/35">
                      <span>Actual risk: {actualRisk === null ? "—" : formatMoney(actualRisk, account.currency)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
