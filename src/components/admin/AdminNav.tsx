"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="flex w-56 flex-shrink-0 flex-col border-r border-taupe/15 bg-white">
      <div className="border-b border-taupe/15 px-5 py-5">
        <p className="text-sm font-medium text-plum">Curio Admin</p>
        <p className="text-[11px] text-taupe">By Dabby</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {links.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-plum/10 font-medium text-plum"
                  : "text-charcoal hover:bg-taupe/10"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-taupe/15 p-3">
        <Link
          href="/"
          className="mb-2 block rounded-lg px-3 py-2 text-sm text-taupe hover:text-plum"
        >
          ← View store
        </Link>
        <button
          onClick={logout}
          className="w-full rounded-lg px-3 py-2 text-left text-sm text-taupe hover:bg-taupe/10 hover:text-charcoal"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
