import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Curio By Dabby | More Than Gifts. More Than Shopping.",
  description:
    "Discover thoughtful gifts and distinctive lifestyle products. AI-powered shopping assistant, original collections, and curated beauty, fashion & accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ivory text-charcoal antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
