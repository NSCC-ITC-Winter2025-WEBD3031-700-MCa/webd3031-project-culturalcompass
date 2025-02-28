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
import { Features, Testimonial } from "@/app/api/data";

// Helper function to render stars
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={index}
            className="w-5 h-5 text-yellow"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l2.39 7.27L22 9.27l-5.5 4.21L17.18 22 12 17.27 6.82 22l.68-8.52L2 9.27l7.61-1L12 2z" />
          </svg>
        ))}
      {/* Half star */}
      {halfStar && (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="halfStarGradient"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            >
              <stop offset="50%" stopColor="#f9c78f" />
              <stop offset="100%" stopColor="#668199" />
            </linearGradient>
            <clipPath id="halfStarClip">
              <rect x="0" y="0" width="18" height="36" />
            </clipPath>
          </defs>
          <path
            d="M34,16.78a2.22,2.22,0,0,0-1.29-4l-9-.34a.23.23,0,0,1-.2-.15L20.4,3.89a2.22,2.22,0,0,0-4.17,0l-3.1,8.43a.23.23,0,0,1-.2.15l-9,.34a2.22,2.22,0,0,0-1.29,4l7.06,5.55a.23.23,0,0,1,.08.24L7.35,31.21a2.22,2.22,0,0,0,3.38,2.45l7.46-5a.22.22,0,0,1,.25,0l7.46,5a2.2,2.2,0,0,0,2.55,0,2.2,2.2,0,0,0,.83-2.4l-2.45-8.64a.22.22,0,0,1,.08-.24ZM24.9,23.11l2.45,8.64A.22.22,0,0,1,27,32l-7.46-5a2.21,2.21,0,0,0-1.24-.38h0V4.44h0a.2.2,0,0,1,.21.15L21.62,13a2.22,2.22,0,0,0,2,1.46l9,.34a.22.22,0,0,1,.13.4l-7.06,5.55A2.21,2.21,0,0,0,24.9,23.11Z"
            fill="url(#halfStarGradient)"
            clipPath="url(#halfStarClip)"
          />
        </svg>
      )}
      {/* Empty stars */}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={index}
            className="w-5 h-5 text-border"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l2.39 7.27L22 9.27l-5.5 4.21L17.18 22 12 17.27 6.82 22l.68-8.52L2 9.27l7.61-1L12 2z" />
          </svg>
        ))}
    </div>
  );
};

export const TestimonialSlider = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <div>
        <div className="flex justify-between items-center flex-wrap md:gap-0 gap-2 z-999 absolute bottom-5 end-9 translate-x-1/2">
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
              setCurrentIndex(swiper.activeIndex); // Update current slide index on slide change
            }}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            className="mySwiper leader-swiper"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
            }}
          >
            {Testimonial.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div key={index}>
                    <p className="text-grey text-xl font-medium">
                      {item.review}
                    </p>
                    <div className="flex gap-8 mt-8">
                      <div>
                        <Image
                          src={item.userprofile}
                          alt="User profile"
                          width={55}
                          height={55}
                          style={{ width: "auto", height: "auto" }}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="text-midnight_text dark:text-white text-xl font-medium">
                          {item.username}
                        </p>
                        <div className="mt-2">{renderStars(item.rating)}</div>
                      </div>
                    </div>
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
