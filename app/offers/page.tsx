import Link from "next/link";

export default function OffersPage() {
  return (
    <div className="mx-auto max-w-sm px-5 pb-24 pt-8 md:pb-12">
      <h1 className="font-heading text-xl font-bold text-ink dark:text-white">Offers</h1>

      <Link href="/services/AC" className="mt-6 block rounded-lg bg-amber-light p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-dark">AC Service</p>
        <p className="mt-1 font-heading text-xl font-extrabold text-ink dark:text-white">Get 20% Off</p>
        <p className="text-sm text-ink/70">This Month Only!</p>
        <span className="mt-3 inline-block rounded bg-teal px-4 py-2 text-xs font-bold text-paper">
          Book Now
        </span>
      </Link>

      <p className="mt-6 text-sm text-muted">More offers coming soon.</p>
    </div>
  );
}
