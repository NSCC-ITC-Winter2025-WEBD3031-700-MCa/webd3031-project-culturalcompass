"use client";
import Image from "next/image";
import { TestimonialSlider } from "./TestimonialSlider";

const Testimonials = () => { 
  return (
    <section className="testimonial dark:bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4">
        <div className="grid grid-cols-12 lg:gap-8 gap-6 items-center">
          <div
            className="md:col-span-6 col-span-12"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-delay={"200"}
            data-aos-duration="1000"
          >
            <h2 className="text-[40px] leading-[3rem] text-midnight_text dark:text-white font-bold mb-5">
              Testimonials
            </h2>
            <TestimonialSlider />
          </div>
          <div
            className="md:col-span-6 col-span-12"
            data-aos="fade-left"
            data-aos-offset="300"
            data-aos-delay={"200"}
            data-aos-duration="1000"
          >
            <Image
              src="/images/testimonial/testimonial.png"
              alt="Testimonial"
              width={400}
              height={400}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
