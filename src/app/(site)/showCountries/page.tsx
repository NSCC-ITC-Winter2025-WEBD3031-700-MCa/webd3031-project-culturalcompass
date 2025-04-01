// "use client";

// import HeroSub from "@/components/SharedComponent/HeroSub";
// import { useEffect, useState, Suspense } from "react"; 
// import { useSearchParams } from "next/navigation";
// import { Countriess } from "@/app/api/data"; 
// import Image from "next/image";
// import Link from "next/link";
// import { useSession } from "next-auth/react";

// // Define types for country data
// interface FamousPlace {
//   name: string;
//   review: string;
// }

// interface CountryDetails {
//   name: string;
//   description: string;
//   flag: string;
//   image: string;
//   language: string;
//   traditional_dress: string;
//   traditional_food: string;
//   traditional_activities: string;
//   national_anthem: string;
//   famous_places: FamousPlace[];
// }

// const ShowCountries = () => {
//   const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(null);
//   const searchParams = useSearchParams();
//   const country = searchParams.get("country");

//   const breadcrumbLinks = [
//     { href: "/", text: "Home" },
//     { href: "/showCountries", text: "Countries Collected" },
//   ];

//   useEffect(() => {
//     if (country) {
//       const selectedCountry = Countriess[0].countries.find((c) => c.name === country);

//       if (selectedCountry) {
//         setCountryDetails(selectedCountry); 
//       } else {
//         setCountryDetails(null);
//       }
//     }
//   }, [country]);

//   // Loading state if countryDetails are not available
//   if (!countryDetails) {
//     return (
//       <div className="container mx-auto mt-10">
//         <h1 className="text-3xl font-bold">Loading or Country not found...</h1>
//       </div>
//     );
//   }

//   return (
//     <>
//       <HeroSub
//         title={`Welcome to ${countryDetails.name}`}
//         description={`${countryDetails.description}`}
//         breadcrumbLinks={breadcrumbLinks}
//       />
//       <section className="dark:bg-darkmode" id="country">
//         <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4">
//           <div className="flex items-center justify-center mb-8">
//             <h2 className="text-[40px] leading-[3rem] text-midnight_text dark:text-white font-bold mr-4 text-center">
//               {countryDetails.name}
//             </h2>
//             <div className="flex-shrink-0">
//               <Image
//                 src={countryDetails.flag}
//                 alt={`Flag of ${countryDetails.name}`}
//                 width={45}
//                 height={30}  
//                 className="rounded-lg shadow-lg"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center mb-8">
//             <Image
//               src={countryDetails.image}
//               alt={`Image of ${countryDetails.name}`}
//               width={700}
//               height={400}
//               className="rounded-lg shadow-lg"
//             />
//           </div>
//           <ul className="list-disc pl-6">
//             <li><p><strong>Language:</strong> {countryDetails.language}</p></li>
//             <li><p><strong>Traditional Dress:</strong> {countryDetails.traditional_dress}</p></li>
//             <li><p><strong>Traditional Food:</strong> {countryDetails.traditional_food}</p></li>
//             <li className="blur-sm"><p><strong>Traditional Activities:</strong> {countryDetails.traditional_activities}</p></li>
//             <li className="blur-sm"><p><strong>National Anthem:</strong> {countryDetails.national_anthem}</p></li>
//           </ul>

//           <h2 className="text-2xl mt-8 mb-4">Famous Places</h2>

//           <ul className="blur-sm">
//             {countryDetails.famous_places.map((place: FamousPlace, index: number) => (
//               <li className="blur-sm" key={index}>
//                 <strong>{place.name}</strong>: {place.review}
//               </li>
//             ))}
//           </ul>
//           <div className="text-center mt-10">
//             <Link
//               href="/features" 
//               className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg"
//             >
//               Get all access
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// const ShowCountriesPage = () => (
//   <Suspense fallback={<div>Loading...</div>}>
//     <ShowCountries />
//   </Suspense>
// );

// export default ShowCountriesPage;

'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Countriess } from "@/app/api/data";

// Define types for country data
interface FamousPlace {
  name: string;
  review: string;
}

interface CountryDetails {
  name: string;
  description: string;
  flag: string;
  image?: string;
  language: string;
  details: string;
  traditional_dress: string;
  traditional_dress_image: string | null;
  people: string;
  traditional_food: string;
  traditional_food_image: string[];
  traditional_activities: string;
  national_anthem: string;
  famous_places: FamousPlace[];
  youtube_video: string;
}

const ShowCountries = () => {
  const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(null);
  const searchParams = useSearchParams();
  const { data: session, status } = useSession(); // Get session data
  const [isPremium, setIsPremium] = useState(false);

  const country = searchParams.get("country");

  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/showCountries", text: "Countries Collected" },
  ];

  useEffect(() => {
    // Log the session data to check if it includes the correct values
    console.log('Session data:', session); // <-- Check the session data

    if (status === "authenticated" && session) {
      console.log('User is authenticated. Checking is_premium...');
      // Check if is_premium exists in session and log it
      const userIsPremium = session.user.is_premium;
      console.log('User is premium:', userIsPremium); // <-- Check if the is_premium value is correct

      setIsPremium(userIsPremium || false);
    } else {
      console.log('User not authenticated or session not available');
    }
  }, [session, status]);

  useEffect(() => {
    // Log the country data to check
    if (country) {
      const selectedCountry = Countriess[0].countries.find((c) => c.name === country);
      if (selectedCountry) {
        console.log('Selected Country:', selectedCountry); // <-- Check selected country data
        setCountryDetails(selectedCountry);
      } else {
        console.log('Country not found');
        setCountryDetails(null);
      }
    }
  }, [country]);

  useEffect(() => {
    console.log('isPremium state:', isPremium); // <-- Check if isPremium state updates
  }, [isPremium]);

  if (!countryDetails) {
    return (
      <div className="container mx-auto mt-10 flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-center">Loading or Country not found...</h1>
      </div>
    );
  }


    return (
      <>
        <HeroSub
          title={`Welcome to ${countryDetails.name}`}
          description={`${countryDetails.description}`}
          breadcrumbLinks={breadcrumbLinks}
        />
        <section className="dark:bg-darkmode" id="country">
          <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4">
            <div className="flex items-center justify-center mb-8">
              <h2 className="text-[40px] leading-[3rem] text-midnight_text dark:text-white font-bold mr-4 text-center">
                {countryDetails.name}
              </h2>
              <div className="flex-shrink-0">
                <Image
                  src={countryDetails.flag}
                  alt={`Flag of ${countryDetails.name}`}
                  width={45}
                  height={30}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
    
            <div className="flex justify-center mb-8">
              <Image
                src={countryDetails.image || "/default-image.jpg"}
                alt={`Image of ${countryDetails.name}`}
                width={700}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
    
            <ul className="list-disc pl-6 ">
              <p className="mb-6">
                <strong>Introduction: </strong>
                {countryDetails.details}
              </p>
              <li style={{
                filter: isPremium ? "none" : "blur(8px)",
                pointerEvents: isPremium ? "auto" : "none",
                userSelect: isPremium ? "auto" : "none"
              }}>
                <p>
                  <strong>Language:</strong> {countryDetails.language}
                </p>
              </li>
              <li style={{
                filter: isPremium ? "none" : "blur(8px)",
                pointerEvents: isPremium ? "auto" : "none",
                userSelect: isPremium ? "auto" : "none"
              }}>
                <p>
                  <strong>Traditional Dress:</strong> {countryDetails.traditional_dress}
                </p>
              </li>
              {countryDetails.traditional_dress_image && (
                <li style={{
                  filter: isPremium ? "none" : "blur(8px)",
                  pointerEvents: isPremium ? "auto" : "none",
                  userSelect: isPremium ? "auto" : "none"
                }}>
                  <p className="mb-6"><strong>Traditional Dress Image:</strong></p>
                  <div className="flex justify-center">
                    <Image
                      src={countryDetails.traditional_dress_image}
                      alt={`Traditional Dress of ${countryDetails.name}`}
                      width={600}
                      height={300}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                </li>
              )}
    
              {countryDetails.traditional_food_image && countryDetails.traditional_food_image.length > 0 && (
                <li style={{
                  filter: isPremium ? "none" : "blur(8px)",
                  pointerEvents: isPremium ? "auto" : "none",
                  userSelect: isPremium ? "auto" : "none"
                }}>
                  <p className="mt-6">
                    <strong>Traditional Food:</strong> {countryDetails.traditional_food}
                  </p>
                  <p className="mt-6 mb-6"><strong>Food Images:</strong></p>
                  <div className="flex justify-center gap-6 mb-6">
                    {countryDetails.traditional_food_image.map((foodImage, index) => (
                      <div key={index} style={{
                        position: "relative",
                        display: "inline-block",
                        cursor: isPremium ? "pointer" : "not-allowed",
                        pointerEvents: isPremium ? "auto" : "none"
                      }}>
                        <Image
                          src={foodImage}
                          alt={`Food from ${countryDetails.name}`}
                          width={450}
                          height={450}
                          className="rounded-lg shadow-lg transform transition-all hover:scale-110"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                </li>
              )}
    
              <li style={{
                filter: isPremium ? "none" : "blur(8px)",
                pointerEvents: isPremium ? "auto" : "none",
                userSelect: isPremium ? "auto" : "none"
              }}>
                <p>
                  <strong>Traditional Activities:</strong> {countryDetails.traditional_activities}
                </p>
              </li>
              <li style={{
                filter: isPremium ? "none" : "blur(8px)",
                pointerEvents: isPremium ? "auto" : "none",
                userSelect: isPremium ? "auto" : "none"
              }} className="mb-6">
                <p>
                  <strong>National Anthem:</strong> {countryDetails.national_anthem}
                </p>
              </li>
            </ul>
    
            <p style={{
              filter: isPremium ? "none" : "blur(8px)",
              pointerEvents: isPremium ? "auto" : "none",
              userSelect: isPremium ? "auto" : "none"
            }}>
              {countryDetails.people}
            </p>
    
            <h2 className="text-2xl mt-8 mb-4">Famous Places</h2>
    
            <ul style={{
              filter: isPremium ? "none" : "blur(8px)",
              pointerEvents: isPremium ? "auto" : "none",
              userSelect: isPremium ? "auto" : "none"
            }}>
              {countryDetails.famous_places.map((place: FamousPlace, index: number) => (
                <li key={index}>
                  <strong>{place.name}</strong>: {place.review}
                </li>
              ))}
            </ul>
    
            <h2 className="text-2xl mt-8 mb-4">Explore More on YouTube</h2>
            <div style={{
              filter: isPremium ? "none" : "blur(8px)",
              pointerEvents: isPremium ? "auto" : "none",
              userSelect: isPremium ? "auto" : "none"
            }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    position: 'relative',
                    paddingBottom: '56.25%', 
                    height: '0',
                    overflow: 'hidden',
                    maxWidth: '100%',
                    width: '100%'
                  }}
                >
                  <iframe
                    src={countryDetails.youtube_video}
                    title={`YouTube video about ${countryDetails.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
                    }}
                  ></iframe>
                </div>
              </div>
            </div>
    
            {!isPremium && (
              <div className="text-center mt-10">
                <Link
                  href="/features"
                  className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg"
                >
                  Get all access
                </Link>
              </div>
            )}
          </div>
        </section>
      </>
    );
  }
const ShowCountriesPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ShowCountries />
  </Suspense>
);

export default ShowCountriesPage;