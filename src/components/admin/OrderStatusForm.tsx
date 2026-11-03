"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];
const PAYMENTS = ["unpaid", "paid", "failed", "refunded"];

export default function OrderStatusForm({
  orderId,
  status,
  paymentStatus,
  internalNotes,
}: {
  orderId: string;
  status: string;
  paymentStatus: string;
  internalNotes: string;
}) {
  const router = useRouter();
  const [st, setSt] = useState(status);
  const [pay, setPay] = useState(paymentStatus);
  const [notes, setNotes] = useState(internalNotes);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const save = async () => {
    setSaving(true);
    setMsg("");
    const supabase = createClient();
    const { error } = await supabase
      .from("orders")
      .update({
        status: st,
        payment_status: pay,
        internal_notes: notes || null,
      })
      .eq("id", orderId);

    setSaving(false);
    if (error) {
      setMsg(error.message);
      return;
    }
    setMsg("Saved");
    router.refresh();
  };

  return (
    <div className="rounded-2xl border border-taupe/15 bg-white p-6 space-y-4">
      <h2 className="text-sm font-medium text-charcoal">Status</h2>
      <div>
        <label className="mb-1 block text-xs text-taupe">Order status</label>
        <select
          value={st}
          onChange={(e) => setSt(e.target.value)}
          className="w-full rounded-xl border border-taupe/25 px-4 py-2.5 text-sm outline-none focus:border-plum"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs text-taupe">Payment</label>
        <select
          value={pay}
          onChange={(e) => setPay(e.target.value)}
          className="w-full rounded-xl border border-taupe/25 px-4 py-2.5 text-sm outline-none focus:border-plum"
        >
          {PAYMENTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs text-taupe">Internal notes</label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-xl border border-taupe/25 px-4 py-2.5 text-sm outline-none focus:border-plum"
        />
      </div>
      <button
        onClick={save}
        disabled={saving}
        className="rounded-full bg-plum px-6 py-2.5 text-sm font-medium text-ivory hover:bg-plum/90 disabled:opacity-60"
      >
        {saving ? "Saving…" : "Update status"}
      </button>
      {msg && <p className="text-xs text-taupe">{msg}</p>}
    </div>
  );
}
