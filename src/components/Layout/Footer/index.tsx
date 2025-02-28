import React, { FC } from "react";
import Logo from '@/components/Layout/Header/Logo'
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="dark:bg-darkmode relative z-[1] md:pt-24 pt-16">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-6">
        <div className="grid grid-cols-12">
          <div className="lg:col-span-5 md:col-span-4 col-span-12">
            <Logo />
          </div>
          <div className="lg:col-span-7 md:col-span-8 col-span-12 md:mt-0 mt-8">
            <div className="grid lg:grid-cols-2 lg:gap-0 gap-3 grid-cols-1 md:pb-16 pb-10 border-b border-border dark:border-dark_border">
              <div>
                <h5 className="text-base text-midnight_text font-medium dark:text-white">PHONE</h5>
                <Link href="tel:(630) 0536 220" className="text-xl font-bold text-midnight_text dark:text-white">(630) 0536 220</Link>
              </div>
              <div>
                <h5 className="text-base text-midnight_text font-medium dark:text-white">EMAIL</h5>
                <Link href="mailto:info@avenue.com" className="text-xl font-bold text-midnight_text dark:text-white hover:text-primary dark:hover:text-primary">info@avenue.com</Link>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 grid-cols-2 py-8">
              <div>
                <p className="text-lg font-medium text-midnight_text dark:text-white mb-3">Company</p>
                <ul className="">
                  <li className="mb-2">
                    <Link href="#" className="text-grey hover:text-primary text-base">About Us</Link>
                  </li>
                  <li className="mb-2">
                    <Link href="#" className="text-grey hover:text-primary text-base">Blog</Link>
                  </li>
                  <li className="mb-2">
                    <Link href="#" className="text-grey hover:text-primary text-base">Success Stories</Link>
                  </li>
                  <li className="mb-2">
                    <Link href="#" className="text-grey hover:text-primary text-base">Careers</Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-lg font-medium text-midnight_text dark:text-white mb-3">Travel</p>
                <ul className="">
                  <li className="mb-2">
                    <Link href="#" className="text-grey hover:text-primary text-base">Stay</Link>
                  </li>
                  <li className="mb-2">
                    <Link href="#" className="text-grey hover:text-primary text-base">Flight</Link>
                  </li>
                  <li className="mb-2">
                    <Link href="#" className="text-grey hover:text-primary text-base">Train</Link>
                  </li>
                  <li className="mb-2">
                    <Link href="#" className="text-grey hover:text-primary text-base">Destinations</Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-lg font-medium text-midnight_text dark:text-white mb-3">Quick Links</p>
                <ul className="">
                  <li className="mb-2">
                    <Link href="#" className="text-grey hover:text-primary text-base">Contact us</Link>
                  </li>
                  <li className="mb-2">
                    <Link href="#" className="text-grey hover:text-primary text-base">Top Destinations</Link>
                  </li>
                  <li className="mb-2">
                    <Link href="#" className="text-grey hover:text-primary text-base">Featured Destinations</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:pt-12 pt-5 grid grid-cols-12 sm:gap-7 gap-2 pb-12">
          <div className="flex items-center gap-4 lg:col-span-5 md:col-span-4 col-span-12">
            <Link href="#" className="text-primary hover:text-blue-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.0"
                width="30"
                height="30"
                viewBox="0 0 50 50"
                className="icon icons8-Facebook-Filled rounded-full fill-primary hover:fill-blue-700"
              >
                <path d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"></path>
              </svg>
            </Link>
            <Link href="#" className="group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="white"
                className="bi bi-twitter-x bg-primary group-hover:bg-blue-700 dark:fill-darkmode rounded-md"
                viewBox="-5 -5 25 25"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </Link>
            <Link href="#" className="group">
              <svg
                width="30"
                height="30"
                viewBox="0 0 31 33"
                fill="#2F73F2"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:fill-blue-800"
              >
                <g clipPath="url(#clip0_1_191)">
                  <path
                    d="M28.7643 0H2.23574C1.00092 0 0 1.06549 0 2.37998V30.62C0 31.9345 1.00092 33 2.23574 33H28.7643C29.9991 33 31 31.9345 31 30.62V2.37998C31 1.06549 29.9991 0 28.7643 0ZM10.9959 24.9434H7.22092V12.8536H10.9959V24.9434ZM9.10852 11.2028H9.08392C7.81717 11.2028 6.99789 10.2745 6.99789 9.11433C6.99789 7.92799 7.84224 7.02539 9.13359 7.02539C10.4249 7.02539 11.2196 7.92799 11.2442 9.11433C11.2442 10.2745 10.4249 11.2028 9.10852 11.2028ZM24.6076 24.9434H20.8331V18.4756C20.8331 16.8502 20.2865 15.7417 18.9207 15.7417C17.8779 15.7417 17.2568 16.4894 16.9839 17.2113C16.8841 17.4696 16.8597 17.8306 16.8597 18.1919V24.9434H13.085C13.085 24.9434 13.1344 13.9878 13.085 12.8536H16.8597V14.5654C17.3613 13.7416 18.2589 12.5699 20.2617 12.5699C22.7453 12.5699 24.6076 14.2978 24.6076 18.0111V24.9434Z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_191">
                    <rect width="31" height="33" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>
          <div className="lg:col-span-7 md:col-span-8 sm:col-span-10 col-span-12 flex sm:flex-row flex-col lg:gap-24 md:gap-12 sm:gap-6 justify-between">
            <div className="flex items-center ">
              <span className="text-xl font-medium text-midnight_text dark:text-white lg:mb-0 mb-3">
                Newsletter
              </span>
            </div>
            <div className="flex-1">
              <form className="flex items-stretch justify-end">
                <input
                  type="email"
                  placeholder="Email address*"
                  className="border border-border dark:border-dark_border py-3 px-4 rounded-s-lg !rounded-e-none w-full focus-visible:outline-0 focus:border-primary dark:focus:border-primary dark:text-white  dark:bg-darkmode"
                />
                <button className="bg-primary text-white px-9 py-3 rounded-e-lg hover:bg-blue-700">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;