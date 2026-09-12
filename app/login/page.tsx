"use client";

import { useState } from "react";
import Link from "next/link";
import { saveSession } from "@/lib/auth";

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

  async function sendOtp() {
    // TODO: call a real OTP provider
    setStep("otp");
  }

  async function verifyOtp() {
    saveSession({ name: name || "Customer", phone });
    window.location.href = "/";
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <h1 className="font-heading text-2xl font-extrabold text-ink dark:text-white">Log in</h1>
      <p className="mt-1 text-sm text-ink/70">
        New here?{" "}
        <Link href="/signup" className="text-teal underline">
          Create an account
        </Link>
      </p>

      {step === "phone" && (
        <div className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-ink dark:text-white">Mobile number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="9876543210"
            className="w-full rounded border border-line px-4 py-3 dark:border-white/10 dark:bg-[#1A1A1A] dark:text-white outline-none focus:border-teal"
          />
          <button
            onClick={sendOtp}
            disabled={!phone}
            className="w-full rounded bg-teal py-3 font-heading font-bold text-paper hover:bg-teal-dark disabled:opacity-40"
          >
            Send OTP
          </button>
        </div>
      )}

      {step === "otp" && (
        <div className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-ink dark:text-white">Enter the OTP sent to {phone}</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="6-digit code"
            className="w-full rounded border border-line px-4 py-3 dark:border-white/10 dark:bg-[#1A1A1A] dark:text-white outline-none focus:border-teal"
          />
          <label className="block text-sm font-medium text-ink dark:text-white">Your name (first time only)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full rounded border border-line px-4 py-3 dark:border-white/10 dark:bg-[#1A1A1A] dark:text-white outline-none focus:border-teal"
          />
          <button
            onClick={verifyOtp}
            className="w-full rounded bg-teal py-3 font-heading font-bold text-paper hover:bg-teal-dark"
          >
            Verify & log in
          </button>
        </div>
      )}
    </div>
  );
}
