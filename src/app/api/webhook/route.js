import { buffer } from 'micro'; // to handle raw body data
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',  // Correct API version from Stripe Dashboard
});
const prisma = new PrismaClient();

// Disable body parser for Stripe webhook
export const config = {
  api: {
    bodyParser: false, 
  },
};

// Webhook handler
export async function POST(req) {
  const sig = req.headers.get('stripe-signature'); // Stripe signature
  const buf = await buffer(req); // Get raw body data

  let event;

  try {
    // Stripe webhook signature verification
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log('✅ Verified event:', event.type);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle successful checkout session completion
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
   
      if (user) {
        await prisma.user.update({
          where: { email },
          data: { is_premium: true },
        });
        console.log(`🎉 Upgraded user ${email} to premium`);
      } else {
        console.log(`❌ No user found with email: ${email}`);
      }
    } catch (error) {
      console.error('❌ Prisma update failed:', error);
      return new Response(`Database Update Error: ${error.message}`, { status: 500 });
    }
  }

  // Respond with success
  return new Response(JSON.stringify({ received: true }), { status: 200 });
}