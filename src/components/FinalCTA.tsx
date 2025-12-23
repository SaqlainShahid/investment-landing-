"use client";

export default function FinalCTA() {
  return (
    <div className="text-center py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Ready to Start Your Investment Journey?
      </h2>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed w-full">
        Join thousands of investors who trust us with their financial future.
        Start building wealth today with our proven strategies.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl hover:scale-105 transition-all duration-200">
          Create Free Account
        </button>
        <button className="bg-white text-gray-800 border border-gray-300 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200">
          Talk to an Advisor
        </button>
      </div>
      <p className="mt-6 text-sm text-gray-500">
        No credit card required • Free for 30 days • Cancel anytime
      </p>
    </div>
  );
}
