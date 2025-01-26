// api/payment/checkout/route.jsx
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const body = await req.json();

    // Get the host dynamically
    const headersList = headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/payment-success?email=${body.email}`,
      cancel_url: baseUrl,
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
