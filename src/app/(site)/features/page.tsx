
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import FeaturesSlider from "@/components/Home/Features";
export const metadata: Metadata = {
    title: "Features | Avenue",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/features", text: "Features" },
  ];
  return (
    <>
      <HeroSub
        title="Features"
        description="Discover a wealth of insightful materials meticulously crafted to provide you with a comprehensive understanding of the latest trends."
        breadcrumbLinks={breadcrumbLinks}
      />
      <FeaturesSlider />
    </>
  );
};

export default page;
