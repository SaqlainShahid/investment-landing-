"use client";

import { useState } from "react";

const navLinks = [
  { name: "Overview", href: "#" },
  { name: "Strategies", href: "#strategies" },
  { name: "Performance", href: "#performance" },
  { name: "Simulator", href: "#simulator" },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState("Overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { name: string; href: string }) => {
    if (link.href !== "#") {
      e.preventDefault();
      const element = document.querySelector(link.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setActiveLink(link.name);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm rotate-45" />
          </div>
          <span className="font-bold text-gray-900 text-lg">WealthPath</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className={`text-sm transition-colors relative py-1 ${
                activeLink === link.name
                  ? "text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {link.name}
              {activeLink === link.name && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <button className="bg-blue-600 text-white text-sm px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
            Get Started
          </button>
          <div className="hidden sm:block w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden ring-2 ring-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col px-4 py-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`py-3 text-sm border-b border-gray-50 ${
                  activeLink === link.name
                    ? "text-blue-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
