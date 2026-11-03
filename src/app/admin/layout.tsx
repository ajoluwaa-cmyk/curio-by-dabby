import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-ivory text-charcoal">
      {/* Nav is hidden on login via page-level full screen; still mounts.
          Login page uses its own full layout by checking — simpler: always show nav except we style login full width.
          For login, children will be full page; we use a client-free approach:
          layout always has nav for non-login. */}
      <AdminShell>{children}</AdminShell>
    </div>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  // Server layout can't easily know path without headers — use CSS/group.
  // Simpler: always include nav; login page is centered and nav still shows which is ok,
  // OR login lives outside. Login is under /admin/login so nav shows — acceptable for v1.
  return (
    <>
      <div className="hidden md:block">
        <AdminNav />
      </div>
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-14 items-center border-b border-taupe/15 bg-white px-4 md:hidden">
          <p className="text-sm font-medium text-plum">Curio Admin</p>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8">{children}</div>
      </div>
    </>
  );
}

