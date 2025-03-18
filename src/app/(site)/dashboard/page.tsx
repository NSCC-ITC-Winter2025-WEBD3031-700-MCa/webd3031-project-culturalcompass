
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import Destination from "@/components/Home/Destinations";
import Dashboard from "@/components/Home/Dashboard";
export const metadata: Metadata = {
    title: "Destination | Culture Compass",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/dashboard", text: "Dashboard" },
  ];
  return (
    <>
      <HeroSub
        title="Dashboard"
        description="Discover a wealth of insightful materials meticulously crafted to provide you with a comprehensive understanding of the latest trends."
        breadcrumbLinks={breadcrumbLinks}
        
      />
      <Dashboard />
    </>
  );
};

export default page;
