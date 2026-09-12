import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Eazzy — Home Appliance Service, On Demand",
  description: "Book trusted technicians for AC, washing machine, RO, and geyser service.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          // Runs before paint to avoid a light-mode flash for users who chose dark.
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('eazzy_theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-paper text-ink dark:bg-[#0B0B0B] dark:text-white">
        <Navbar />
        <main className="pb-16 md:pb-0">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
