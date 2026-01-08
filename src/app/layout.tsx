import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "../components/ErrorBoundary";
import ClientSafety from "../components/ClientSafety";
import ClientOnly from "../components/ClientOnly";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Investment Strategy Simulator & Comparison | 2025 Results",
  description: "Simulate, compare, and analyze real investment strategies with 2025 performance data. Choose from Conservative, Weighted, or Aggressive portfolios and see historical results.",
  openGraph: {
    title: "Investment Strategy Simulator & Comparison | 2025 Results",
    description: "Simulate, compare, and analyze real investment strategies with 2025 performance data. Choose from Conservative, Weighted, or Aggressive portfolios and see historical results.",
    url: "https://yourdomain.com/",
    siteName: "Investment Landing Page",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Investment Strategy Simulator & Comparison"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Investment Strategy Simulator & Comparison | 2025 Results",
    description: "Simulate, compare, and analyze real investment strategies with 2025 performance data. Choose from Conservative, Weighted, or Aggressive portfolios and see historical results.",
    images: ["https://yourdomain.com/og-image.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-gray-800`}
      >
        <ClientSafety />
        <ClientOnly>
          <ErrorBoundary>
            <div className="w-full px-2 sm:px-6 md:px-8 flex flex-col min-h-screen">
              {children}
            </div>
          </ErrorBoundary>
        </ClientOnly>
      </body>
    </html>
  );
}
