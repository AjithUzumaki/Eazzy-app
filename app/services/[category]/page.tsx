import Link from "next/link";
import { ChevronRight, Snowflake, Shirt, Droplet, Flame } from "lucide-react";
import { servicesByCategory, categories, ServiceCategory } from "@/lib/data";
import { notFound } from "next/navigation";

const ICONS: Record<string, any> = { Snowflake, Shirt, Droplet, Flame };

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryKey = params.category.toUpperCase() as ServiceCategory;
  const category = categories.find((c) => c.key === categoryKey);
  if (!category) return notFound();

  const list = servicesByCategory(categoryKey);
  const Icon = ICONS[category.icon];

  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-6 md:pb-12">
      <h1 className="font-heading text-xl font-bold text-ink dark:text-white">{category.label}</h1>
      <p className="mt-1 text-sm text-muted">Choose the service you need.</p>

      <div className="mt-6 space-y-3">
        {list.map((service) => (
          <Link
            key={service.id}
            href={`/booking?service=${service.id}`}
            className="flex items-center gap-4 rounded border border-line bg-white p-4 hover:border-teal dark:border-white/10 dark:bg-[#1A1A1A]"
          >
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded bg-paper dark:bg-white/5">
              <Icon size={24} className="text-ink dark:text-white" />
            </div>
            <div className="flex-1">
              <p className="font-heading text-sm font-bold text-ink dark:text-white">{service.name}</p>
              <p className="text-xs text-muted">{service.description}</p>
              <p className="mt-1 text-[11px] text-muted">Starting from</p>
              <p className="font-heading text-base font-extrabold text-amber-dark">₹{service.price}</p>
            </div>
            <ChevronRight size={18} className="text-muted" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.key.toLowerCase() }));
}
