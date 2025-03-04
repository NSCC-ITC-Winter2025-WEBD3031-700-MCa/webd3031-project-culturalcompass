"use client";
import Image from "next/image";

const PricingSection = () => {
  // Define the items that each package contains
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
      items: [true, false, false, false, false, false, false], 
    },
    {
      name: "Premium",
      price: "$49.89",
      items: [true, true, true, true, true, true, true, true], 
    },
    {
      name: "Deluxe",
      price: "$29.99",
      items: [false, false, true, true, true, true, true, true, true, true], // Represents the availability of the features in the Deluxe plan
    },
  ];

  return (
    <section className="relative py-24 bg-white dark:bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4">
        <h2 className="text-4xl font-bold text-center text-midnight_text dark:text-white mb-12">
          Choose Your Plan
        </h2>

        {/* Pricing Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white dark:bg-darklight rounded-3xl shadow-2xl p-8 text-center">
              {/* Feature Name with Background */}
              <div className="bg-primary text-white py-2 px-4 rounded-full mb-4 inline-block">
                <h3 className="text-2xl font-semibold dark:text-white">{plan.name}</h3>
              </div>
              <p className="text-4xl font-bold text-midnight_text dark:text-white mb-4">
                {plan.price}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">One-time purchase</p>

              {/* List of Features with Check or Cross */}
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
              <button className="py-3 px-6 bg-primary hover:bg-blue-700 text-white rounded-lg">
              Purchase Now
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