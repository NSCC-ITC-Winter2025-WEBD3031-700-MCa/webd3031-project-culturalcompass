"use client"
import { useState } from "react";
import { accordionData } from "@/app/api/data";
import Link from "next/link";
import Image from "next/image";
import '@/Style/accordian.css';

const Detail = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index: any) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="dark:bg-darkmode pt-16">
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4">
                <div className="grid justify-between grid-cols-12 lg:gap-8 gap-6">
                    <div className="lg:col-span-6 col-span-12">
                        <div className="mb-4">
                            <h2 className="text-[32px] leading-[2.5rem] font-bold text-midnight_text mb-11">Overview</h2>
                            <p className="text-grey text-lg mb-4">
                                Leave your guidebooks at home and dive into the local cultures that make each destination so special. We’ll connect you with our exclusive experiences. Each trip is carefully crafted to let enjoy your vacation.
                            </p>
                            <p className="text-grey text-lg">
                                A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.
                            </p>
                        </div>
                        <h3 className="text-2xl text-midnight_text dark:text-white mb-6">Price Includes</h3>
                        <div className="grid sm:grid-cols-2 sm:gap-0 gap-4 pb-12 border-b border-border dark:border-dark_border">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-5 items-center">
                                    <div className="rounded-full bg-primary/20 px-3 py-4">
                                        <div className="border-l-2 border-b-2 border-primary px-2 py-1 -rotate-45"></div>
                                    </div>
                                    <p className="text-grey text-lg font-medium">Air fares</p>
                                </div>
                                <div className="flex gap-5 items-center">
                                    <div className="rounded-full bg-primary/20 px-3 py-4">
                                        <div className="border-l-2 border-b-2 border-primary px-2 py-1 -rotate-45"></div>
                                    </div>
                                    <p className="text-grey text-lg font-medium">3 Nights Hotel Accomodation</p>
                                </div>
                                <div className="flex gap-5 items-center">
                                    <div className="rounded-full bg-primary/20 px-3 py-4">
                                        <div className="border-l-2 border-b-2 border-primary px-2 py-1 -rotate-45"></div>
                                    </div>
                                    <p className="text-grey text-lg font-medium">On Trip Transport</p>
                                </div>
                                <div className="flex gap-5 items-center">
                                    <div className="rounded-full bg-primary/20 px-3 py-4">
                                        <div className="border-l-2 border-b-2 border-primary px-2 py-1 -rotate-45"></div>
                                    </div>
                                    <p className="text-grey text-lg font-medium">2 Meals / day</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-5 items-center">
                                    <div className="rounded-full bg-danger/20 p-3">
                                        <svg
                                            width="15px"
                                            height="15px"
                                            viewBox="0 0 15 15"
                                            fill="rgb(220, 53, 69)"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.7929 7.49998L1.14645 1.85353L1.85356 1.14642L7.50001 6.79287L13.1465 1.14642L13.8536 1.85353L8.20711 7.49998L13.8536 13.1464L13.1465 13.8535L7.50001 8.20708L1.85356 13.8535L1.14645 13.1464L6.7929 7.49998Z" fill="rgb(220, 53, 69)" />
                                        </svg>
                                    </div>
                                    <p className="text-grey text-lg font-medium">Driver Service Fee</p>
                                </div>
                                <div className="flex gap-5 items-center">
                                    <div className="rounded-full bg-danger/20 p-3">
                                        <svg
                                            width="15px"
                                            height="15px"
                                            viewBox="0 0 15 15"
                                            fill="rgb(220, 53, 69)"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.7929 7.49998L1.14645 1.85353L1.85356 1.14642L7.50001 6.79287L13.1465 1.14642L13.8536 1.85353L8.20711 7.49998L13.8536 13.1464L13.1465 13.8535L7.50001 8.20708L1.85356 13.8535L1.14645 13.1464L6.7929 7.49998Z" fill="rgb(220, 53, 69)" />
                                        </svg>
                                    </div>
                                    <p className="text-grey text-lg font-medium">Guide Service Fee</p>
                                </div>
                                <div className="flex gap-5 items-center">
                                    <div className="rounded-full bg-danger/20 p-3">
                                        <svg
                                            width="15px"
                                            height="15px"
                                            viewBox="0 0 15 15"
                                            fill="rgb(220, 53, 69)"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.7929 7.49998L1.14645 1.85353L1.85356 1.14642L7.50001 6.79287L13.1465 1.14642L13.8536 1.85353L8.20711 7.49998L13.8536 13.1464L13.1465 13.8535L7.50001 8.20708L1.85356 13.8535L1.14645 13.1464L6.7929 7.49998Z" fill="rgb(220, 53, 69)" />
                                        </svg>
                                    </div>
                                    <p className="text-grey text-lg font-medium">Room Service Fees
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="py-12 border-b border-border dark:border-dark_border">
                            <h3 className="text-4xl text-midnight_text dark:text-white font-bold mb-6">What to Expect</h3>
                            <p className="text-grey text-lg">
                                A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.
                            </p>
                            <div className="flex flex-col gap-4 mt-12">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-full bg-primary/20">
                                        <div className="bg-primary p-1 rounded-full"></div>
                                    </div>
                                    <p className="text-grey text-base">View the City Walls</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-full bg-primary/20">
                                        <div className="bg-primary p-1 rounded-full"></div>
                                    </div>
                                    <p className="text-grey text-base">Hiking in the forest</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-full bg-primary/20">
                                        <div className="bg-primary p-1 rounded-full"></div>
                                    </div>
                                    <p className="text-grey text-base">Discover the famous view point “The Lark”</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-full bg-primary/20">
                                        <div className="bg-primary p-1 rounded-full"></div>
                                    </div>
                                    <p className="text-grey text-base">Sunset on the cruise</p>
                                </div>
                            </div>
                        </div>
                        <div className="my-12 bg-primary/20 dark:bg-primary/20 p-6 rounded-lg">
                            <p className="text-base text-grey">
                                <span className="text-midnight_text dark:text-white">Suggested daily budget</span> - 50-60 EUR / 52-62 USD (Note: This is a suggested budget assuming you're staying in a hostel, eating out a little, cooking most of your meals, and using local transportation. Using the budget tips below, you can always lower this number. However, if you stay in fancier accommodation or eat out more often, expect this to be higher!)
                            </p>
                        </div>

                        <div className="flex flex-col gap-y-8">
                            <h2 className="text-midnight_text dark:text-white">
                                Itinerary
                            </h2>
                            <div className="overflow-hidden lg:w-770 w-full m-auto shadow-lg dark:shadow-darkmd px-6 rounded-2xl">
                                {accordionData.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`accordion__item ${activeIndex === index ? "accordion__item--active" : ""
                                            }`}
                                    >
                                        <button
                                            className="accordion__btn flex justify-between items-center w-full text-xl text-left cursor-pointer transition-all pl-0 p-8 border-none outline-none bg-white dark:bg-darkmode text-midnight_text dark:text-white hover:text-primary hover:dark:text-primary group"
                                            onClick={() => toggleAccordion(index)}
                                        >
                                            <span className="text-xl font-medium">{item.title}</span>
                                            <span className="rounded-full rotate-0 group-active:rotate-180 transition-width opacity-90">
                                                {activeIndex === index ? (
                                                    <svg
                                                        className="icon-minus"
                                                        width="14"
                                                        height="2"
                                                        viewBox="0 0 14 2"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M14 1.99799H0V-0.00201416H14V1.99799Z"
                                                            className="icon-fill"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        className="icon-plus"
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M14 7.99805H8V13.998H6V7.99805H0V5.99805H6V-0.00195312H8V5.99805H14V7.99805Z"
                                                            className="icon-fill"
                                                        />
                                                    </svg>
                                                )}
                                            </span>
                                        </button>

                                        <div className="accordion__content font-light max-h-0 opacity-0 overflow-hidden translate-x-4 dark:bg-darkmode">
                                            <p className="text-grey font-normal text-lg px-0 py-4">
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5 col-span-12">
                        <div className="bg-white mb-11 dark:bg-darkmode shadow-filter_shadow dark:shadow-darkmd px-11 py-8 text-center rounded-lg">
                            <h4 className="text-[28px] leading-[2.25rem] font-bold  text-midnight_text dark:text-white text-center">
                                FL, USA
                            </h4>
                            <p className="text-sm mb-6 text-grey text-center">7 related listings</p>
                            <Link className="bg-transparent border  border-primary text-primary px-9 py-2 rounded-lg hover:bg-blue-600 hover:text-white" href="#">
                                See Listings
                            </Link>
                        </div>
                        <div className="bg-white dark:bg-darkmode shadow-filter_shadow dark:shadow-darkmd px-11 flex flex-col gap-8 py-8">
                            <div className="flex items-center gap-4">
                                <Image
                                    src="/images/package_details/svg/things-to-see.svg"
                                    alt="..."
                                    width={40}
                                    height={40}
                                    style={{ width: "auto", height: "auto" }}
                                />
                                <Link href="#" className="text-grey dark:text-white hover:text-primary dark:hover:text-primary text-sm">things to see</Link>
                            </div>
                            <div className="flex gap-4 items-center">
                                <Image
                                    src="/images/package_details/svg/costs.svg"
                                    alt="..."
                                    width={40}
                                    height={40}
                                />
                                <Link href="#" className="text-grey dark:text-white hover:text-primary dark:hover:text-primary text-sm">typical costs</Link>
                            </div>
                            <div className="flex gap-4 items-center">
                                <Image
                                    src="/images/package_details/svg/trip.svg"
                                    alt="..."
                                    width={40}
                                    height={40}
                                />
                                <Link href="#" className="text-grey dark:text-white hover:text-primary dark:hover:text-primary text-sm">budget tips</Link>
                            </div>
                            <div className="flex gap-4 items-center">
                                <Image
                                    src="/images/package_details/svg/guides.svg"
                                    alt="..."
                                    width={40}
                                    height={40}
                                />
                                <Link href="#" className="text-grey dark:text-white hover:text-primary dark:hover:text-primary text-sm">related guides</Link>
                            </div>
                            <div className="flex gap-4 items-center">
                                <Image
                                    src="/images/package_details/svg/articles.svg"
                                    alt="..."
                                    width={40}
                                    height={40}
                                />
                                <Link href="#" className="text-grey dark:text-white hover:text-primary dark:hover:text-primary text-sm">related articles</Link>
                            </div>
                            <div className="flex gap-4 items-center">
                                <Image
                                    src="/images/package_details/svg/comments.svg"
                                    alt="..."
                                    width={40}
                                    height={40}
                                />
                                <Link href="#" className="text-grey dark:text-white hover:text-primary dark:hover:text-primary text-sm">comments</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Detail;