import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import Destination from "@/components/Home/Destinations";
import FeaturesSlider from "@/components/Home/Features";
import Blog from "@/components/SharedComponent/Blog";
import PopularCountries from "@/components/Home/Countries";
export const metadata: Metadata = {
  title: "Culture Compass",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Destination />
      <FeaturesSlider />
      <PopularCountries />
      <Blog />
     
    </main>
  );
}
