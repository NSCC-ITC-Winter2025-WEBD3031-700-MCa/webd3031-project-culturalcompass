"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Images Used

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// Import Swiper types
import { Swiper as SwiperClass } from "swiper/types";
import { Features } from "@/app/api/data";

export const TestSlider = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <div>
        <div className="flex justify-between items-center flex-wrap md:gap-0 gap-2 absolute lg:bottom-7 md:bottom-0 -bottom-8 end-1/2 translate-x-1/2">
          <div className="flex items-center gap-4">
            <div
              onClick={() => swiperRef.current?.slidePrev()}
              className={`group h-10 w-10 rounded-full flex items-center justify-center bg-primary/20 hover:bg-primary text-link dark:text-darklink dark:bg-primary/20 ${
                currentIndex === 0
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }`}
            >
              <Icon
                icon="tabler:arrow-left"
                className="shrink-0 text-2xl group-hover:text-white text-primary"
              />
            </div>
            <div
              onClick={() => swiperRef.current?.slideNext()}
              className={`group h-10 w-10 rounded-full flex items-center justify-center hover:bg-primary bg-primary/20 text-link dark:text-darklink dark:bg-primary/20  ${
                currentIndex === Features.length - 4
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              } `}
            >
              <Icon
                icon="tabler:arrow-right"
                className="shrink-0 text-2xl group-hover:text-white text-primary"
              />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Swiper
            onSwiper={(swiper: SwiperClass) => {
              // Store the swiper instance in the ref
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper: SwiperClass) => {
              setCurrentIndex(swiper.activeIndex);
            }}
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            className="mySwiper leader-swiper"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {Features.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    data-aos="fade-up"
                    data-aos-delay={`${index * 200}`}
                    data-aos-duration="1000"
                    className="md:px-16"
                    key={index}
                  >
                    <div className="bg-primary/20 rounded-full flex p-5 justify-center items-center w-fit mx-auto mb-6">
                      <Image
                        src={item.icon}
                        alt="..."
                        width={50}
                        height={50}
                        className="rounded-lg"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-midnight_text dark:text-white text-center mb-2">
                      {item.title}
                    </h3>
                    <p className="text-grey text-base font-normal text-center">
                      {item.description}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};
