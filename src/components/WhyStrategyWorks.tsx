"use client";

export default function WhyStrategyWorks() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-14 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Why This Strategy Works</h3>
      <p className="text-gray-500 text-lg mb-6">
        Our investment strategies are built on transparency, risk management, and data-driven insights. Each portfolio is designed to balance growth and security, leveraging advanced analytics and diversified assets to help you achieve your financial goals.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col items-center text-center">
          <h4 className="font-semibold text-blue-600 mb-2">Risk Management</h4>
          <p className="text-gray-500 text-sm">
            Robust risk controls and continuous monitoring help minimize drawdowns and protect your capital, even in volatile markets.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col items-center text-center">
          <h4 className="font-semibold text-blue-600 mb-2">Portfolio Rebalancing</h4>
          <p className="text-gray-500 text-sm">
            Automated rebalancing ensures your portfolio stays aligned with your goals and adapts to changing market conditions.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col items-center text-center">
          <h4 className="font-semibold text-blue-600 mb-2">Data-Driven Execution</h4>
          <p className="text-gray-500 text-sm">
            Advanced analytics and algorithms drive every investment decision, maximizing returns while managing risk.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col items-center text-center">
          <h4 className="font-semibold text-blue-600 mb-2">Transparency</h4>
          <p className="text-gray-500 text-sm">
            All performance data is independently verifiable and updated monthly. You always know exactly how your investments are performing.
          </p>
        </div>
      </div>
    </section>
  );
}
