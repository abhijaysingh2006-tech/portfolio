import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please provide a valid email address'),
  category: z.enum(['ARCHITECTURE_CONSULT', 'DISTRIBUTED_SYSTEMS', 'OPPORTUNITY', 'GENERAL']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000),
  // Honeypot field for bot spam detection
  systemToken: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, category, message, systemToken } = result.data;

    // Honeypot check: If the hidden honeypot field is populated, silently reject bot
    if (systemToken && systemToken.trim() !== '') {
      console.warn('Bot submission blocked via honeypot field.');
      return NextResponse.json({ success: true, message: 'Transmission received.' });
    }

    console.log(`[CONTACT DISPATCH] From: ${name} <${email}> [${category}]: ${message}`);

    // If Resend API key is configured, forward email
    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'portfolio@resend.dev',
            to: process.env.CONTACT_TO_EMAIL,
            subject: `[SYSTEMS PORTFOLIO] New Inquiry from ${name} [${category}]`,
            text: `Sender: ${name} (${email})\nCategory: ${category}\n\nMessage:\n${message}`,
          }),
        });
      } catch (err) {
        console.error('Failed to send email via Resend:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Transmission successfully committed to system log.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal processing failure' },
      { status: 500 }
    );
  }
}
