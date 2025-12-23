"use client";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 sm:py-12">
      <div className="px-2 sm:px-4 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2.5 mb-2 sm:mb-0">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rounded-sm rotate-45" />
            </div>
            <span className="font-bold text-gray-900 text-sm sm:text-base">WealthPath</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8 mb-2 sm:mb-0">
            <a
              href="#"
              className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors min-h-[44px] flex items-center"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors min-h-[44px] flex items-center"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors min-h-[44px] flex items-center"
            >
              Contact Us
            </a>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-right max-w-xs">
            © 2024 WealthPath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
