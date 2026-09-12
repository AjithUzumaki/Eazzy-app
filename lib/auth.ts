// Minimal client-side "session" so the demo flow works without real auth yet.
// Replace with Supabase Auth (session/cookies) when you wire up real OTP login —
// see the README for the recommended path.

export interface Session {
  name: string;
  phone: string;
}

const KEY = "eazzy_session";

export function saveSession(session: Session) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
