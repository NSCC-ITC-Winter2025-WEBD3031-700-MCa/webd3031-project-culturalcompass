
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import Destination from "@/components/Home/Destinations";
export const metadata: Metadata = {
    title: "Destination | Avenue",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/destination", text: "Destination" },
  ];
  return (
    <>
      <HeroSub
        title="Destination"
        description="Discover a wealth of insightful materials meticulously crafted to provide you with a comprehensive understanding of the latest trends."
        breadcrumbLinks={breadcrumbLinks}
      />
      <Destination />
    </>
  );
};

export default page;
