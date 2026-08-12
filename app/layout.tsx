import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// Nunito is a variable font on Google Fonts, so no `weight` is needed — the
// full 200–1000 range is available and next/font self-hosts it at build time
// (no runtime request to Google). Exposed as a CSS variable rather than via
// `className` because globals.css maps --font-display / --font-body / --font-sans
// onto it; see the design system §6.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cat Passport",
  description:
    "Discover, revisit, and document the community cats of the UAE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
