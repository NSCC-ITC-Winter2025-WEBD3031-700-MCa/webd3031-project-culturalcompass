"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Features } from "@/app/api/data";
import "@/Style/slider.css";
import { TestSlider } from "./TestSlider";

const FeaturesSlider = () => {
  return (
    <section
      className={`relative fetures before:content-[''] before:absolute before:w-41 before:h-41 before:bg-SkyBlueMist dark:before:bg-SkyBlueMist before:blur-250 before:md:block before:hidden before:-left-37 before:z-[10] dark:bg-darkmode`}
      id="features"
    >
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4">
        <div className="bg-white dark:bg-darklight lg:pt-24 lg:py-28 md:py-16 py-8 rounded-3xl relative z-20">
          <h2 className="text-[40px] leading-[3rem] text-midnight_text dark:text-white font-bold mb-9 text-center">
            Features
          </h2>
          <TestSlider />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSlider;
