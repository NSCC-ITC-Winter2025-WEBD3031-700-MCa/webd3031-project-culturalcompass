import { buffer } from 'micro';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});
const prisma = new PrismaClient();
 
export const config = { api: { bodyParser: false } };
 
export async function POST(req) {
  try {
    const sig = req.headers.get('stripe-signature');
    const buf = await buffer(req);
    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
 
    console.log('✅ Verified event:', event.type);
 
    // Handle successful payments
    if (event.type === 'checkout.session.completed' || 
        event.type === 'checkout.session.async_payment_succeeded') {
      const session = event.data.object;
      if (!session?.customer_email) {
        throw new Error('Missing customer email in session');
      }
 
      const user = await prisma.user.findUnique({
        where: { email: session.customer_email },
      });
 
      if (!user) {
        throw new Error(`User not found: ${session.customer_email}`);
      }
 
      await prisma.user.update({
        where: { email: session.customer_email },
        data: { is_premium: true },
      });
      console.log(`🎉 Upgraded ${session.customer_email} to premium`);
    }
 
    return Response.json({ received: true });
  } catch (err) {
    console.error('❌ Webhook error:', err.message);
    return new Response(`Webhook Error: ${err.message}`, {
      status: err.message.includes('Signature') ? 400 : 500
    });
  }
}
 
// Block other methods
export function GET() { return Response.error('Method Not Allowed', { status: 405 }) }
export function PUT() { return Response.error('Method Not Allowed', { status: 405 }) }
export function DELETE() { return Response.error('Method Not Allowed', { status: 405 }) }