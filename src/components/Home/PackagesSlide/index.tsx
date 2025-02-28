"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Package } from "@/app/api/data";

const PackageCard = () => {
  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <section className="dark:bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
        <h2 className="text-[40px] leading-[3rem] text-midnight_text font-bold text-center mb-10">
          Summer Holiday Packages
        </h2>
        <Slider {...settings}>
          {Package.map((item, index) => (
            <Link
              key={index}
              data-aos="fade-up"
              data-aos-delay={`${index * 400}`}
              data-aos-duration="1000"
              href={`/tours/${item.slug}`}
              className="group px-4"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src={item.image}
                  alt="..."
                  width={1200}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                  className="group-hover:scale-110 group-hover:cursor-pointer transition-all duration-500"
                />
                <div className="absolute top-3 right-3 rounded-full py-1 px-4 bg-primary">
                  <p className="text-white font-medium text-sm">
                    Starts {item.price}
                  </p>
                </div>
              </div>
              <div className="ms-4 mt-6">
                <h4 className="text-midnight_text text-2xl group-hover:text-primary dark:text-white">
                  {item.name}
                </h4>
                <p className="text-base text-grey">{item.duration}</p>
              </div>
            </Link>
          ))}
        </Slider>
        <div className="text-center mt-10">
          <Link
            href="/tours"
            className="text-primary border border-primary px-4 py-2 rounded-lg w-fit mx-auto hover:text-white hover:bg-primary"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PackageCard;
