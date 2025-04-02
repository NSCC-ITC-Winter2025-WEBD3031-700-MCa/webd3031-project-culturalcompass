import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    console.log('Session:', session);  // Debugging session

    if (!session) {
      console.log('User not authenticated');
      return new Response(JSON.stringify({ error: "Unauthorized: Please sign in first" }), { status: 401 });
    }

    const { priceId } = await req.json();
    if (!priceId) {
      console.log('Price ID is missing');
      return new Response(JSON.stringify({ error: "Price ID is required" }), { status: 400 });
    }

    // Retrieve user email from session
    const userEmail = session.user.email;

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: userEmail, // Attach user email to Stripe session
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    console.log('Stripe session created:', stripeSession.url);  // Debugging created session URL

    return new Response(JSON.stringify({ url: stripeSession.url }), { status: 200 });
  } catch (error) {
    console.error('Error in POST /api/checkout:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}