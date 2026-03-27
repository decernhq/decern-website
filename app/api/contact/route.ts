import { Resend } from "resend";

const TO_EMAIL = "opensource@decern.dev";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Email service not configured." }, { status: 500 });
  }

  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return Response.json({ error: "Invalid body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !subject || !message) {
    return Response.json({ error: "All fields are required." }, { status: 422 });
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: `Decern Contact <onboarding@resend.dev>`,
    to: [TO_EMAIL],
    replyTo: email,
    subject: `[Contact] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", JSON.stringify(error));
    return Response.json({ error: "Failed to send email." }, { status: 500 });
  }

  console.log("Resend OK — id:", data?.id, "to:", TO_EMAIL);
  return Response.json({ ok: true });
}
