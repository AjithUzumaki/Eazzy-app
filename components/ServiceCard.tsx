import Link from "next/link";
import type { Service } from "@/lib/data";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/booking?service=${service.id}`}
      className="block rounded border border-line bg-white dark:border-white/10 dark:bg-[#1A1A1A] p-5 transition hover:border-teal"
    >
      <h3 className="font-heading text-base font-bold text-ink dark:text-white">{service.name}</h3>
      <p className="mt-1 text-sm text-ink/70">{service.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-heading text-lg font-extrabold text-teal">₹{service.price}</span>
        <span className="text-sm text-amber-dark">Book now</span>
      </div>
    </Link>
  );
}
