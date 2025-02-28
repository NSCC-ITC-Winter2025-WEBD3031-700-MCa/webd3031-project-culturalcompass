import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const JournyInfo: FC = () => {
  return (
    <section className="relative dark:bg-darkmode ">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4">
        <div className="grid grid-cols-12 gap-7 justify-between items-center bg-primary rounded-3xl overflow-hidden">
          <div className="lg:py-28 pt-20 sm:ps-20 sm:text-left text-center z-10 lg:col-span-7 col-span-12">
            <h2
              className="text-white pb-8 dark:text-white"
              data-aos="fade-up"
              data-aos-delay={"200"}
              data-aos-duration="1000"
            >
              A journey of a thousand miles begins with a single step
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4">
              <Link
                href="https://play.google.com/store/apps?hl=en_IN&gl=US&pli=1"
                target="_blank"
                data-aos="fade-up"
                data-aos-delay={"300"}
                data-aos-duration="1000"
              >
                <Image
                  src="/images/SharedComponent/google-play.jpg"
                  alt="logo"
                  width={0}
                  height={0}
                  quality={100}
                  sizes="100vh"
                  className="!w-44 !h-16 rounded-xl"
                />
              </Link>
              <Link
                href="https://www.apple.com/in/app-store/"
                target="_blank"
                data-aos="fade-up"
                data-aos-offset="400"
                data-aos-delay={"300"}
                data-aos-duration="1000"
              >
                <Image
                  src="/images/SharedComponent/app-store.jpg"
                  alt="logo"
                  width={0}
                  height={0}
                  quality={100}
                  sizes="100vh"
                  className="!w-44 !h-16 rounded-xl"
                />
              </Link>
            </div>
          </div>
          <div
            className="md:-mb-10 mb-0 z-1 lg:col-span-5 col-span-12 md:order-none order-2"
            data-aos="fade-right"
            data-aos-delay={"200"}
            data-aos-duration="1000"
          >
            <Image
              src="/images/SharedComponent/journy.png"
              alt="logo"
              width={275}
              height={0}
              quality={100}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournyInfo;
