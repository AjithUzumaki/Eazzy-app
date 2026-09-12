export type ServiceCategory = "AC" | "WASHING_MACHINE" | "RO" | "GEYSER";

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  price: number;
  durationMin: number;
}

export const categories: { key: ServiceCategory; label: string; icon: string }[] = [
  { key: "AC", label: "AC Service", icon: "Snowflake" },
  { key: "WASHING_MACHINE", label: "Washing Machine", icon: "Shirt" },
  { key: "RO", label: "RO Service", icon: "Droplet" },
  { key: "GEYSER", label: "Geyser Service", icon: "Flame" },
];

// Placeholder data — replace with a DB query (Prisma) once the backend is connected.
export const services: Service[] = [
  { id: "ac-gas", category: "AC", name: "AC Gas Refill", description: "Top-up refrigerant gas for cooling issues", price: 1499, durationMin: 60 },
  { id: "ac-service", category: "AC", name: "AC General Service", description: "Deep clean filters, coils, and drainage", price: 599, durationMin: 45 },
  { id: "ac-install", category: "AC", name: "AC Installation", description: "New unit installation, split or window", price: 1999, durationMin: 90 },
  { id: "wm-repair", category: "WASHING_MACHINE", name: "Washing Machine Repair", description: "Diagnose and fix drum, motor, or drainage issues", price: 499, durationMin: 60 },
  { id: "wm-install", category: "WASHING_MACHINE", name: "Washing Machine Installation", description: "New machine setup and testing", price: 399, durationMin: 45 },
  { id: "ro-service", category: "RO", name: "RO General Service", description: "Filter change and full system check", price: 499, durationMin: 45 },
  { id: "ro-repair", category: "RO", name: "RO Repair", description: "Fix leaks, low pressure, or no-water issues", price: 399, durationMin: 60 },
  { id: "geyser-repair", category: "GEYSER", name: "Geyser Repair", description: "Fix heating element or thermostat issues", price: 499, durationMin: 60 },
  { id: "geyser-install", category: "GEYSER", name: "Geyser Installation", description: "New geyser mounting and connection", price: 699, durationMin: 60 },
];

export function servicesByCategory(category: ServiceCategory) {
  return services.filter((s) => s.category === category);
}
