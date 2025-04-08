// app/api/webhook/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});
const prisma = new PrismaClient();
 
export async function POST(req) {
  const signature = req.headers.get('stripe-signature');
  try {
    // Get raw body as text
    const rawBody = await req.text();
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
 
    // Handle checkout session completion
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      if (!session?.customer_email) {
        throw new Error('Missing customer email in Stripe session');
      }
 
      // Update user in database
      const updatedUser = await prisma.user.update({
        where: { email: session.customer_email },
        data: { is_premium: true },
      });
 
      if (!updatedUser) {
        throw new Error(`User not found: ${session.customer_email}`);
      }

      //session return from here
      const serverSession = await getServerSession(authOptions); 
      console.log(serverSession);
      if (serverSession?.user?.email === session.customer_email) {
       
        serverSession.user.is_premium = true;
      }
 
      console.log(`✅ Upgraded ${session.customer_email} to premium`);
    }
 
    return NextResponse.json(
      { success: true, message: 'Webhook processed' },
      { status: 200 }
    );
 
  } catch (error) {
    console.error('❌ Webhook error:', error.message);
    return NextResponse.json(
      { 
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: error.message.includes('Signature') ? 400 : 500 }
    );
  }
}
 
// Block all other HTTP methods
export function GET() {
  return NextResponse.json(
    { error: 'Method Not Allowed' },
    { status: 405 }
  );
}
 
export function PUT() {
  return NextResponse.json(
    { error: 'Method Not Allowed' },
    { status: 405 }
  );
}
 
export function DELETE() {
  return NextResponse.json(
    { error: 'Method Not Allowed' },
    { status: 405 }
  );
}
 