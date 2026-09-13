import { Resend } from "resend";
import type { Booking } from "./store";
import { services } from "./data";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = "Eazzy <onboarding@resend.dev>";

export async function sendNewBookingAlert(booking: Booking) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping email notification.");
    return;
  }
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn("ADMIN_EMAIL not set — skipping email notification.");
    return;
  }

  const service = services.find((s) => s.id === booking.serviceId);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: adminEmail,
      subject: `New booking: ${service?.name ?? booking.serviceId} — ${booking.customerName}`,
      html: `
        <h2>New booking received</h2>
        <p><strong>Customer:</strong> ${booking.customerName} (${booking.customerPhone})</p>
        <p><strong>Service:</strong> ${service?.name ?? booking.serviceId}</p>
        <p><strong>Slot:</strong> ${booking.slotDate} · ${booking.slotTime}</p>
        <p><strong>Address:</strong> ${booking.address}</p>
        <p><strong>Notes:</strong> ${booking.notes || "—"}</p>
        <p><strong>Amount:</strong> ₹${booking.amount}</p>
        <p><strong>Booking ID:</strong> ${booking.id}</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send booking alert email:", err);
  }
}