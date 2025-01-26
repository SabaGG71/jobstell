import { NextResponse } from "next/server";
import Stripe from "stripe";

// In the Stripe payment route (route.js)
export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const body = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.HOST_URL}payment-success?email=${body.email}`,
      cancel_url: process.env.HOST_URL,
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
