import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import Destination from "@/components/Home/Destinations";
import FeaturesSlider from "@/components/Home/Features";
import PackageSlider from "@/components/Home/PackagesSlide";
import Testimonials from "@/components/Home/Testimonial";
import Blog from "@/components/SharedComponent/Blog";
import JournyInfo from "@/components/SharedComponent/journyInfo";
import PopularCountries from "@/components/Home/Countries";
export const metadata: Metadata = {
  title: "Avenue",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Destination />
      <FeaturesSlider />
      <PackageSlider />
      <PopularCountries />
      <Testimonials />
      <Blog />
      <JournyInfo />
    </main>
  );
}
