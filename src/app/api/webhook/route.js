import { buffer } from 'micro';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

// Stripe and Prisma setup with the correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',  // Correct API version from Stripe Dashboard
});
const prisma = new PrismaClient();

// Disable body parsing for Stripe webhook
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);

  let event;

  try {
    // Stripe webhook signature verification
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log('✅ Verified event:', event.type);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful checkout session completion
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email;

    try {
      // Update user to premium status in Prisma
      await prisma.user.update({
        where: { email },
        data: { is_premium: true },
      });
      console.log(`🎉 Upgraded user ${email} to premium`);
    } catch (error) {
      console.error('❌ Prisma update failed:', error.message);
    }
  }

  // Respond with success
  res.json({ received: true });
}