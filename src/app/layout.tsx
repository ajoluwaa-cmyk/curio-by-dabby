import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Curio By Dabby | More Than Gifts. More Than Shopping.",
  description: "Discover thoughtful gifts and distinctive lifestyle products. AI-powered shopping assistant, original collections, and curated beauty, fashion & accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ivory text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
