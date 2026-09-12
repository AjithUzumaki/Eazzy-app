import Link from "next/link";
import Image from "next/image";
import { Search, Snowflake, Shirt, Droplet, Flame, Users, ShieldCheck, CalendarCheck, Star } from "lucide-react";
import { categories, services } from "@/lib/data";

const ICONS: Record<string, any> = { Snowflake, Shirt, Droplet, Flame };

const STATS = [
  { icon: Users, value: "10K+", label: "Happy Customers" },
  { icon: ShieldCheck, value: "500+", label: "Verified Technicians" },
  { icon: CalendarCheck, value: "25K+", label: "Services Completed" },
  { icon: Star, value: "4.8/5", label: "Customer Ratings" },
];

export default function HomePage() {
  const popular = services.slice(0, 3);

  return (
    <div>
      {/* ============ MOBILE APP LAYOUT ============ */}
      <div className="px-5 pb-24 pt-4 md:hidden">
        <h1 className="font-heading text-lg font-bold text-ink dark:text-white">Good Morning 👋</h1>
        <p className="text-sm text-muted">What can we help you with?</p>

        <div className="mt-4 flex items-center gap-2 rounded border border-line bg-white px-4 py-3 dark:border-white/10 dark:bg-[#1A1A1A]">
          <Search size={18} className="text-muted" />
          <input
            placeholder="Search for services..."
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted dark:text-white"
          />
        </div>

        <Link
          href="/services/AC"
          className="mt-4 block rounded-lg bg-amber-light p-5"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-amber-dark">AC Service</p>
          <p className="mt-1 font-heading text-xl font-extrabold text-ink">Get 20% Off</p>
          <p className="text-sm text-ink/70">This Month Only!</p>
          <span className="mt-3 inline-block rounded bg-teal px-4 py-2 text-xs font-bold text-paper">
            Book Now
          </span>
        </Link>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="font-heading text-sm font-bold text-ink dark:text-white">Our Services</h2>
          <Link href="/services/AC" className="text-xs text-amber">View All</Link>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {categories.map((cat) => {
            const Icon = ICONS[cat.icon];
            return (
              <Link
                key={cat.key}
                href={`/services/${cat.key}`}
                className="flex flex-col items-center gap-2 rounded border border-line bg-white py-4 dark:border-white/10 dark:bg-[#1A1A1A]"
              >
                <Icon size={22} className="text-ink dark:text-white" />
                <span className="text-center text-[11px] leading-tight text-ink dark:text-white">{cat.label}</span>
              </Link>
            );
          })}
        </div>

        <h2 className="mt-6 font-heading text-sm font-bold text-ink dark:text-white">Popular Services</h2>
        <div className="mt-3 space-y-3">
          {popular.map((s) => (
            <Link
              key={s.id}
              href={`/booking?service=${s.id}`}
              className="flex items-center gap-3 rounded border border-line bg-white p-3 dark:border-white/10 dark:bg-[#1A1A1A]"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded bg-paper dark:bg-white/5">
                {(() => {
                  const cat = categories.find((c) => c.key === s.category);
                  const Icon = cat ? ICONS[cat.icon] : Snowflake;
                  return <Icon size={24} className="text-ink dark:text-white" />;
                })()}
              </div>
              <div className="flex-1">
                <p className="font-heading text-sm font-bold text-ink dark:text-white">{s.name}</p>
                <p className="text-xs text-muted">{s.description}</p>
              </div>
              <div className="text-right">
                <p className="font-heading text-sm font-extrabold text-amber-dark">₹{s.price}</p>
                <span className="mt-1 inline-block rounded bg-teal px-3 py-1 text-[10px] font-bold text-paper">
                  Book Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ============ DESKTOP MARKETING LAYOUT ============ */}
      <div className="hidden md:block">
        <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-12 px-8 py-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-amber-dark">
              Professional Home Services
            </p>
            <h1 className="mt-3 font-heading text-5xl font-extrabold leading-tight text-ink">
              Home Services
              <br />
              Made <span className="text-amber">Eazzy</span>
            </h1>
            <p className="mt-4 max-w-md text-ink/70">
              Book trusted professionals for AC, Washing Machine, RO & Geyser
              services at your doorstep.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/services/AC"
                className="rounded bg-teal px-6 py-3 font-heading font-bold text-paper hover:bg-teal-dark"
              >
                Book a Service →
              </Link>
              <a
                href="#how-it-works"
                className="rounded border border-line px-6 py-3 font-heading font-bold text-ink hover:border-teal"
              >
                How It Works
              </a>
            </div>
            <div className="mt-8 flex gap-8 text-sm text-ink/70">
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-amber-dark" /> Verified Professionals
              </span>
              <span className="flex items-center gap-2">
                <Star size={18} className="text-amber-dark" /> Satisfaction Guaranteed
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <Image src="/logo.svg" alt="Eazzy appliances" width={320} height={320} />
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-8 py-12" id="how-it-works">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-amber-dark">Our Services</p>
              <h2 className="mt-1 font-heading text-3xl font-extrabold text-ink">
                What can we help you with?
              </h2>
            </div>
            <Link href="/services/AC" className="text-sm font-bold text-ink hover:text-amber">
              View All Services →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-5">
            {categories.map((cat) => {
              const Icon = ICONS[cat.icon];
              const service = services.find((s) => s.category === cat.key);
              return (
                <div key={cat.key} className="rounded border border-line bg-white p-5">
                  <Icon size={26} className="text-ink" />
                  <h3 className="mt-3 font-heading font-bold text-ink">{cat.label}</h3>
                  <p className="mt-1 text-sm text-ink/60">{service?.description}</p>
                  <p className="mt-4 text-xs text-ink/50">Starting from</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-heading text-xl font-extrabold text-amber-dark">
                      ₹{service?.price}
                    </span>
                    <Link
                      href={`/services/${cat.key}`}
                      className="rounded bg-teal px-4 py-2 text-xs font-bold text-paper hover:bg-teal-dark"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-8 pb-16">
          <div className="grid grid-cols-4 gap-6 rounded-lg border border-line bg-white p-8">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <s.icon size={22} className="text-amber-dark" />
                <div>
                  <p className="font-heading text-xl font-extrabold text-ink">{s.value}</p>
                  <p className="text-xs text-ink/60">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
