import { buffer } from 'micro';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma'; // Ensure Prisma is correctly set up

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key

// Disable body parsing for the webhook to handle raw body data
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const sig = req.headers['stripe-signature']; // Stripe signature for security
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Secret from Stripe Dashboard

  let event;

  try {
    // Read the raw body from the request
    const body = await buffer(req);
    
    // Construct the event using the raw body and signature
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Error verifying webhook signature:', err.message);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const userEmail = session.customer_email;

      // Example: Update user status in your database
      try {
        const user = await prisma.user.update({
          where: { email: userEmail },
          data: { is_premium: true }, // Mark the user as premium after payment
        });
        console.log('User marked as premium:', user);
      } catch (err) {
        console.error('Error updating database:', err.message);
      }
      break;

    // Handle other events if needed, for example, payment intent succeeded:
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount_received} was successful!`);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Acknowledge receipt of the event
  res.status(200).send('Event received');
};

export default handler;