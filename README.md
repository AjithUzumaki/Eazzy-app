# Eazzy

Home appliance service booking app — AC, Washing Machine, RO, Geyser.

This version is **fully functional end-to-end** using an in-memory data
store (`lib/store.ts`) standing in for a real database, so you can run it
locally right now and click through the entire journey. Swap the store for
Prisma + Postgres when you're ready to go live (steps below) — the function
names in `lib/store.ts` map directly onto the Prisma schema.

## All 7 modules, working now

| # | Module | Where |
|---|--------|-------|
| 1 | Onboarding & Auth | `/login`, `/signup` — phone OTP UI (any code accepted for now), saves a session |
| 2 | Service Catalog | `/` and `/services/[category]` |
| 3 | Booking Flow | `/booking?service=...` — date, slot, address, notes |
| 4 | Payment | `/booking/payment` — simulated Razorpay checkout |
| 5 | Order Tracking | `/orders` (list) and `/orders/[id]` (live status timeline) |
| 6 | Admin/Technician Side | `/admin/bookings` (assign technicians) and `/technician` (technician job view) |
| 7 | Post-Service | Rating + review form appears on `/orders/[id]` once a job is marked Completed |

## Try the full flow locally

1. `npm install` then `npm run dev`, open http://localhost:3000
2. Sign up as a customer (any phone number, any name)
3. Pick a service → book a slot → pay (simulated)
4. Open `/admin/bookings` in another tab — assign a technician to the booking
5. Open `/technician`, log in with the assigned technician's demo phone
   (`9000000001` Mani, `9000000002` Suresh, `9000000003` Karthik) and advance
   the job: On the Way → In Progress → Completed
6. Back in the customer's `/orders/[id]` tab, the status timeline updates
   automatically (polls every few seconds) — once Completed, the rating form appears

## Project structure

```
app/
  page.tsx                       → Home (service category grid)
  services/[category]/           → Sub-service listing per category
  booking/                       → Booking form
  booking/payment/               → Simulated payment
  orders/                        → Customer's booking list
  orders/[id]/                   → Order tracking + review
  login/, signup/                → Auth screens
  admin/, admin/bookings/        → Admin dashboard, technician assignment
  technician/                    → Technician login + job management
  api/                           → All backend routes (see table above)
components/                      → Navbar, ServiceCard
lib/store.ts                     → In-memory "database" — replace with Prisma
lib/auth.ts                      → Client-side session — replace with real auth
lib/data.ts                      → Service catalog (static for now)
prisma/schema.prisma             → Real database schema, ready to migrate to
public/logo.svg                  → App logo/icon source
```

## Going from demo to production

### 1. Real database
Create a free Postgres DB (easiest: [Supabase](https://supabase.com)).
```
DATABASE_URL="postgresql://..."
```
```bash
npx prisma migrate dev --name init
```
Create `lib/prisma.ts`:
```ts
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
```
Then replace each function body in `lib/store.ts` with the equivalent Prisma
call — the function signatures already match what each page/API route expects,
so nothing else needs to change.

### 2. Real auth
Use Supabase Auth's built-in phone OTP. Replace the `sendOtp`/`verifyOtp` stubs
in `app/login/page.tsx` and `app/signup/page.tsx` with
`supabase.auth.signInWithOtp({ phone })`, and replace `lib/auth.ts` with a
real session check (cookies/JWT) instead of localStorage.

### 3. Real payments
Sign up for [Razorpay](https://razorpay.com). In `app/api/payments/route.ts`,
create a real order (`razorpayInstance.orders.create(...)`), return the order
ID to `app/booking/payment/page.tsx` to open Razorpay Checkout, and only mark
a booking paid after verifying the payment webhook signature server-side —
never trust a client-side "success" callback alone.

### 4. Real notifications
Add SMS (MSG91/Twilio) or push notifications when `updateStatus()` runs in
`lib/store.ts`, so customers get notified at each stage automatically.

## Deploy the web app

1. Push to a GitHub repo.
2. Import into [vercel.com](https://vercel.com), add your env vars (`DATABASE_URL` etc.).
3. Deploy — live at `eazzy.vercel.app` instantly, attach a custom domain later.

## Turn it into a mobile app

```bash
npm install @capacitor/core @capacitor/cli
npx cap init eazzy com.yourname.eazzy
npx cap add android
npx cap add ios
```
Wraps your deployed web app into a native shell. Use `@capacitor/assets` to
generate all icon sizes from `public/logo.svg`, then open `android/` in
Android Studio to build, test, and publish to Google Play (~$25 one-time fee).
