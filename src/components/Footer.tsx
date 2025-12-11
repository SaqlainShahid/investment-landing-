"use client";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rounded-sm rotate-45" />
            </div>
            <span className="font-bold text-gray-900">WealthPath</span>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Contact Us
            </a>
          </div>

          <p className="text-sm text-gray-400">
            © 2024 WealthPath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
