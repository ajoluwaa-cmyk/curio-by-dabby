"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        setEmail(d.contactEmail || "");
        setPhone(d.contactPhone || "");
        setWhatsapp(d.contactWhatsapp || "");
      })
      .catch(() => {});
  }, []);

  return (
    <main className="pt-16">
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-xl">
          <p className="mb-3 text-[11px] font-medium tracking-[0.25em] text-taupe uppercase">
            Curio By Dabby
          </p>
          <h1 className="mb-3 text-3xl font-light tracking-tight text-charcoal md:text-4xl">
            Contact
          </h1>
          <p className="mb-10 text-sm text-taupe">
            Questions about an order, a gift, or a product? We’re here.
          </p>

          <div className="space-y-4 rounded-2xl border border-taupe/15 bg-white p-6">
            {email ? (
              <div>
                <p className="text-xs font-medium text-taupe">Email</p>
                <a
                  href={`mailto:${email}`}
                  className="text-sm font-medium text-plum hover:underline"
                >
                  {email}
                </a>
              </div>
            ) : (
              <p className="text-sm text-taupe">
                Email will appear here once set in Admin → Settings.
              </p>
            )}
            {phone && (
              <div>
                <p className="text-xs font-medium text-taupe">Phone</p>
                <a
                  href={`tel:${phone}`}
                  className="text-sm font-medium text-charcoal"
                >
                  {phone}
                </a>
              </div>
            )}
            {whatsapp && (
              <div>
                <p className="text-xs font-medium text-taupe">WhatsApp</p>
                <a
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-plum hover:underline"
                >
                  Chat on WhatsApp
                </a>
              </div>
            )}
          </div>

          <p className="mt-8 text-sm text-taupe">
            For shipping times and returns, see{" "}
            <Link href="/shipping" className="text-plum hover:underline">
              Shipping
            </Link>{" "}
            and{" "}
            <Link href="/returns" className="text-plum hover:underline">
              Returns
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
