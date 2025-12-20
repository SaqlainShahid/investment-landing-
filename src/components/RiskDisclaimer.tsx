"use client";

export default function RiskDisclaimer() {
  return (
    <section className="max-w-2xl mx-auto px-2 sm:px-4 py-8 sm:py-14 mt-6 sm:mt-10 mb-6 sm:mb-10 bg-white border border-red-100 rounded-2xl shadow text-left">
      <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-3 sm:mb-4 text-center">Security & Risk Disclaimer</h2>
      <ul className="space-y-3 sm:space-y-4 text-xs sm:text-base text-gray-700 mb-4 sm:mb-6 list-disc pl-4 sm:pl-6">
        <li><span className="font-semibold">Cryptocurrency investments are highly volatile.</span> Prices can fluctuate dramatically in short periods, and you may lose your entire investment.</li>
        <li><span className="font-semibold">No guaranteed returns.</span> All performance figures shown are for informational purposes only and do not represent actual or future returns.</li>
        <li><span className="font-semibold">Past performance is not indicative of future results.</span> Market conditions can change rapidly and unpredictably.</li>
        <li><span className="font-semibold">Principal loss is possible.</span> You may lose some or all of your invested capital.</li>
        <li>Investments are not insured or protected by any government agency.</li>
        <li>Consult a qualified financial advisor before making investment decisions.</li>
      </ul>
      <div className="text-xs text-gray-500 text-center max-w-xl mx-auto">
        WealthPath is not a registered investment advisor or broker-dealer. Information provided is for educational and informational purposes only and should not be considered financial advice or a solicitation to buy or sell any asset.
      </div>
    </section>
  );
}
