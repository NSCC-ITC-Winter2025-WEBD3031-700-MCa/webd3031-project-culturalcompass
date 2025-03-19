// "use client";

// import { loadStripe } from "@stripe/stripe-js";

// // Load Stripe with the publishable key
// // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");


// const PricingSection = () => {
//   const features = [
//     "Basic country information",
//     "Basic Customer Support",
//     "More in-depth country information",
//     "Relatable insights and recommendations",
//     "7-day free trial", 
//     "Shared customer experiences",
//     "Tips and hints for hidden gems",
//   ];

//   const plans = [
//     {
//       name: "Standard",
//       price: "FREE",
//       priceId: null, // No payment needed for free plan
//       items: [true, false, false, false, false, false, false], 
//     },
//     {
//       name: "Premium",
//       price: "$49.89",
//       priceId: "price_1R3Il8QQ6WgGmUw54ixVO56h", // Use your actual Price ID
//       items: [true, true, true, true, true, true, true], 
//     }
//   ];

//   const handleCheckout = async (priceId: string | null) => {
//     if (!priceId) return; // Do nothing for free plan
  
//     const stripe = await stripePromise;
  
//     const response = await fetch("/api/checkout-session", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ priceId }),
//     });
  
//     const session = await response.json();
  
//     if (session.url) {
//       window.location.href = session.url; // Redirect to Stripe Checkout
//     }
//   };
  
//   return (
//     <section className="relative py-24 bg-white dark:bg-darkmode">
//       <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4">
//         <h2 className="text-4xl font-bold text-center text-midnight_text dark:text-white mb-12">
//           Choose Your Plan
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-16">
//           {plans.map((plan, index) => (
//             <div key={index} className="bg-white dark:bg-darklight rounded-3xl shadow-2xl p-8 text-center">
//               <div className="bg-primary text-white py-2 px-4 rounded-full mb-4 inline-block">
//                 <h3 className="text-2xl font-semibold dark:text-white">{plan.name}</h3>
//               </div>
//               <p className="text-4xl font-bold text-midnight_text dark:text-white mb-4">
//                 {plan.price}
//               </p>
//               <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">One-time purchase</p>

//               <ul className="list-disc list-inside mb-6 text-left text-gray-600 dark:text-gray-300">
//                 {features.map((feature, idx) => (
//                   <li key={idx} className="mb-2 flex items-center">
//                     {plan.items[idx] ? (
//                       <span className="text-green-500 mr-2">✔️</span>
//                     ) : (
//                       <span className="text-red-500 mr-2">❌</span>
//                     )}
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//               {plan.name !== "Standard" && (
//                 <button 
//                   className="py-3 px-6 bg-primary hover:bg-blue-700 text-white rounded-lg"
//                   onClick={() => handleCheckout(plan.priceId)}
//                 >
//                   Purchase Now
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PricingSection;

"use client";

import { useSession, signIn } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

const PricingSection = () => {
  const { data: session } = useSession(); // Get authenticated user session

  const features = [
    "Basic country information",
    "Basic Customer Support",
    "More in-depth country information",
    "Relatable insights and recommendations",
    "7-day free trial",
    "Shared customer experiences",
    "Tips and hints for hidden gems",
  ];

  const plans = [
    {
      name: "Standard",
      price: "FREE",
      priceId: null, // No payment needed for free plan
      items: [true, false, false, false, false, false, false],
    },
    {
      name: "Premium",
      price: "$49.89",
      priceId: "price_1R3Il8QQ6WgGmUw54ixVO56h", // Use your actual Price ID
      items: [true, true, true, true, true, true, true],
    },
  ];

  const handleCheckout = async (priceId: string | null) => {
    if (!session) {
      toast.error("Please sign in to purchase a plan.");
      signIn(); // Redirect user to sign-in page
      return;
    }
  
    if (!priceId) return; // Do nothing for free plan
  
    const stripe = await stripePromise;
  
    try {
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to initiate checkout.");
      }
  
      const sessionData = await response.json();
  
      if (sessionData.url) {
        window.location.href = sessionData.url; // Redirect to Stripe Checkout
      } else {
        toast.error("Failed to initiate checkout. Try again later.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
      toast.error(errorMessage);
    }
  };  

  return (
    <section className="relative py-24 bg-white dark:bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4">
        <h2 className="text-4xl font-bold text-center text-midnight_text dark:text-white mb-12">
          Choose Your Plan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-16">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white dark:bg-darklight rounded-3xl shadow-2xl p-8 text-center">
              <div className="bg-primary text-white py-2 px-4 rounded-full mb-4 inline-block">
                <h3 className="text-2xl font-semibold dark:text-white">{plan.name}</h3>
              </div>
              <p className="text-4xl font-bold text-midnight_text dark:text-white mb-4">{plan.price}</p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">One-time purchase</p>

              <ul className="list-disc list-inside mb-6 text-left text-gray-600 dark:text-gray-300">
                {features.map((feature, idx) => (
                  <li key={idx} className="mb-2 flex items-center">
                    {plan.items[idx] ? (
                      <span className="text-green-500 mr-2">✔️</span>
                    ) : (
                      <span className="text-red-500 mr-2">❌</span>
                    )}
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.name !== "Standard" && (
                <button
                  className="py-3 px-6 bg-primary hover:bg-blue-700 text-white rounded-lg"
                  onClick={() => handleCheckout(plan.priceId)}
                >
                  {session ? "Purchase Now" : "Sign in to Purchase"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

