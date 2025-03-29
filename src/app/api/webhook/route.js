import { NextResponse } from "next/server";
import { buffer } from "micro";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

// Stripe and Prisma setup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // or latest version
});
const prisma = new PrismaClient();

// Disable default body parsing
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// Main POST handler
// export async function POST(req) {
//   const rawBody = await req.text(); // required for Stripe signature verification
//   const sig = req.headers.get("stripe-signature");

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       rawBody,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error("Webhook signature verification failed:", err.message);
//     return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     const customerEmail = session.customer_email;

//     try {
//       await prisma.user.update({
//         where: { email: customerEmail },
//         data: {
//           is_premium: true,
//         },
//       });

//       console.log(`✅ User with email ${customerEmail} upgraded to premium.`);
//     } catch (err) {
//       console.error("Error updating user:", err.message);
//     }
//   }

//   return NextResponse.json({ received: true }, { status: 200 });
// }

export async function POST(req) {
  console.log("🔥 Webhook received");

  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  console.log("📬 Signature header:", sig);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("✅ Webhook verified:", event.type);
  } catch (err) {
    console.error("❌ Signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("🎉 Payment session:", session);

    const customerEmail = session.customer_email;
    console.log("👤 Customer email:", customerEmail);

    try {
      await prisma.user.update({
        where: { email: customerEmail },
        data: { is_premium: true },
      });
      console.log(`✅ Updated user ${customerEmail} to premium`);
    } catch (err) {
      console.error("❌ Prisma error:", err.message);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
