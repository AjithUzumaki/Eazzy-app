import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-heading text-2xl font-extrabold text-ink">Admin</h1>
      <p className="mt-1 text-ink/70">Manage bookings, technicians, and services.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link href="/admin/bookings" className="rounded border border-line bg-white p-6 hover:border-teal">
          <h3 className="font-heading font-bold text-ink">Bookings</h3>
          <p className="mt-1 text-sm text-ink/70">View and assign incoming jobs</p>
        </Link>
        <div className="rounded border border-line bg-white p-6 opacity-50">
          <h3 className="font-heading font-bold text-ink">Technicians</h3>
          <p className="mt-1 text-sm text-ink/70">Coming next — manage your team</p>
        </div>
        <div className="rounded border border-line bg-white p-6 opacity-50">
          <h3 className="font-heading font-bold text-ink">Services & Pricing</h3>
          <p className="mt-1 text-sm text-ink/70">Coming next — edit catalog</p>
        </div>
      </div>
    </div>
  );
}
