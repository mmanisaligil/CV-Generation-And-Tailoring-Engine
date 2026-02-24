import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 space-y-2 bg-slate-900 p-4 text-white">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/dashboard/templates">Templates</Link>
          <Link href="/dashboard/tailor">Tailor</Link>
          <Link href="/dashboard/export">Export</Link>
        </nav>
      </aside>
      <section className="flex-1 p-6">{children}</section>
    </div>
  );
}
