import { NextRequest, NextResponse } from 'next/server';  // Import for app directory API routes
import { buffer } from 'micro';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',  // Use the correct version here
});
const prisma = new PrismaClient();
 
export async function POST(req: NextRequest) {
  // Read the raw body from the request
  const sig = req.headers.get('stripe-signature')!;
  const buf = await buffer(req as any);  // Type assertion as `req` doesn't have `buffer` method
 
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log('✅ Verified event:', event.type);
  } catch (error) {
    if (error instanceof Error) {  // Type guard to check if the error is an instance of Error
      console.error('❌ Webhook signature verification failed:', error.message);
      return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    } else {
      console.error('❌ Unknown error type', error);  // Handle non-Error types
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
 
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
 
    if (email == null) {
      console.error('❌ Customer email is null');
      return NextResponse.json({ error: 'Email is missing' }, { status: 400 });
    }
 
    try {
      // Update user in Prisma
      await prisma.user.update({
        where: { email },
        data: { is_premium: true },
      });
      console.log(`🎉 Upgraded user ${email} to premium`);
    } catch (error) {
      if (error instanceof Error) {  // Type guard to check if the error is an instance of Error
        console.error('❌ Prisma update failed:', error.message);
        return NextResponse.json({ error: 'Failed to upgrade user' }, { status: 500 });
      } else {
        console.error('❌ Unknown error type', error);
        return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
      }
    }
  }
 
  // Return a successful response to Stripe
  return NextResponse.json({ received: true });
}
 