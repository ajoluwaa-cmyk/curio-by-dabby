"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminSettingsPage() {
  const [contactEmail, setContactEmail] = useState("");
  const [shippingNote, setShippingNote] = useState("");
  const [storeName, setStoreName] = useState("Curio By Dabby");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("site_settings").select("*");
      const map = new Map((data || []).map((r) => [r.key, r.value]));
      setStoreName(map.get("store_name") || "Curio By Dabby");
      setContactEmail(map.get("contact_email") || "");
      setShippingNote(map.get("shipping_note") || "");
      setLoading(false);
    };
    load();
  }, []);

  const save = async () => {
    setMsg("");
    const supabase = createClient();
    const rows = [
      { key: "store_name", value: storeName },
      { key: "contact_email", value: contactEmail },
      { key: "shipping_note", value: shippingNote },
    ];
    for (const row of rows) {
      await supabase.from("site_settings").upsert(row);
    }
    setMsg("Settings saved");
  };

  if (loading) {
    return <p className="text-sm text-taupe">Loading settings…</p>;
  }

  return (
    <div className="max-w-lg">
      <h1 className="mb-6 text-2xl font-light text-charcoal">Settings</h1>
      <div className="space-y-4 rounded-2xl border border-taupe/15 bg-white p-6">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-charcoal">
            Store name
          </label>
          <input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full rounded-xl border border-taupe/25 px-4 py-3 text-sm outline-none focus:border-plum"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-charcoal">
            Contact email
          </label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="w-full rounded-xl border border-taupe/25 px-4 py-3 text-sm outline-none focus:border-plum"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-charcoal">
            Shipping note (shown on store)
          </label>
          <textarea
            rows={3}
            value={shippingNote}
            onChange={(e) => setShippingNote(e.target.value)}
            className="w-full rounded-xl border border-taupe/25 px-4 py-3 text-sm outline-none focus:border-plum"
          />
        </div>
        <button
          onClick={save}
          className="rounded-full bg-plum px-6 py-2.5 text-sm font-medium text-ivory hover:bg-plum/90"
        >
          Save settings
        </button>
        {msg && <p className="text-xs text-taupe">{msg}</p>}
      </div>
    </div>
  );
}
