"use client";

import HeroSub from "@/components/SharedComponent/HeroSub";
import { useEffect, useState, Suspense } from "react"; // Added Suspense import
import { useSearchParams } from "next/navigation";
import { Countriess } from "@/app/api/data"; 
import Image from "next/image";
import Link from "next/link";

const ShowCountries = () => {
  const [countryDetails, setCountryDetails] = useState<any>(null);
  const searchParams = useSearchParams();
  const country = searchParams.get("country");

  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/showCountries", text: "Countries Collected" },
  ];

  useEffect(() => {
    if (country) {
      const selectedCountry = Countriess[0].countries.find((c) => c.name === country);

      if (selectedCountry) {
        setCountryDetails(selectedCountry); 
      } else {
        setCountryDetails(null);
      }
    }
  }, [country]);

  // Loading state if countryDetails are not available
  if (!countryDetails) {
    return (
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold">Loading or Country not found...</h1>
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
              src={countryDetails.image}
              alt={`Image of ${countryDetails.name}`}
              width={700}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <ul className="list-disc pl-6">
            <li><p><strong>Language:</strong> {countryDetails.language}</p></li>
            <li><p><strong>Traditional Dress:</strong> {countryDetails.traditional_dress}</p></li>
            <li><p><strong>Traditional Food:</strong> {countryDetails.traditional_food}</p></li>
            <li className="blur-sm"><p><strong>Traditional Activities:</strong> {countryDetails.traditional_activities}</p></li>
            <li className="blur-sm"><p><strong>National Anthem:</strong> {countryDetails.national_anthem}</p></li>
          </ul>

          <h2 className="text-2xl mt-8 mb-4">Famous Places</h2>

          <ul className="blur-sm">
            {countryDetails.famous_places.map((place: any, index: number) => (
              <li className="blur-sm" key={index}>
                <strong>{place.name}</strong>: {place.review}
              </li>
            ))}
          </ul>
          <div className="text-center mt-10">
            <Link
              href="/features" 
              className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg"
            >
              Get all access
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

const ShowCountriesPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ShowCountries />
  </Suspense>
);

export default ShowCountriesPage;