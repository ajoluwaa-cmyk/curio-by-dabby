"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import AskCurioPanel from "./AskCurioPanel";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCurioOpen, setIsCurioOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-ivory/85 backdrop-blur-md border-b border-taupe/15">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/curio-logo.png"
              alt="Curio By Dabby"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/shop" className="text-sm text-charcoal/80 transition hover:text-plum">
              Shop
            </Link>
            <Link href="/gifts" className="text-sm text-charcoal/80 transition hover:text-plum">
              Gifts
            </Link>
            <Link href="/collections" className="text-sm text-charcoal/80 transition hover:text-plum">
              Collections
            </Link>
            <Link href="/personalize" className="text-sm text-charcoal/80 transition hover:text-plum">
              Personalize
            </Link>
            <Link href="/about" className="text-sm text-charcoal/80 transition hover:text-plum">
              About
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCurioOpen(true)}
              className="hidden rounded-full bg-plum px-5 py-2 text-sm font-medium text-ivory transition hover:bg-plum/90 md:inline-flex"
            >
              Ask Curio
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1 text-charcoal"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="border-t border-taupe/15 bg-ivory md:hidden">
            <div className="flex flex-col space-y-4 px-6 py-6">
              <Link href="/shop" className="text-charcoal" onClick={() => setIsOpen(false)}>Shop</Link>
              <Link href="/gifts" className="text-charcoal" onClick={() => setIsOpen(false)}>Gifts</Link>
              <Link href="/collections" className="text-charcoal" onClick={() => setIsOpen(false)}>Collections</Link>
              <Link href="/personalize" className="text-charcoal" onClick={() => setIsOpen(false)}>Personalize</Link>
              <Link href="/about" className="text-charcoal" onClick={() => setIsOpen(false)}>About</Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsCurioOpen(true);
                }}
                className="mt-2 w-full rounded-full bg-plum px-5 py-2.5 text-sm font-medium text-ivory"
              >
                Ask Curio
              </button>
            </div>
          </div>
        )}
      </header>

      {/* AI Panel */}
      <AskCurioPanel isOpen={isCurioOpen} onClose={() => setIsCurioOpen(false)} />
    </>
  );
}
