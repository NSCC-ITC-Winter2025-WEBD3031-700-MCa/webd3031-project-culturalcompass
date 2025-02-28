import React, { FC } from "react";
import Image from "next/image";

interface HeroSubProps {
    duration: string | any;
    title: string | any;
    location: string | any;
    review: string | any;
    rating: string | any;
    price: string | any;
}

const HeroSub: FC<HeroSubProps> = ({ duration, title, location, review, rating, price }) => {
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className="flex items-center">
                {/* Full stars */}
                {Array(fullStars).fill(0).map((_, index) => (
                    <svg key={index} className="w-5 h-5 text-yellow" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l2.39 7.27L22 9.27l-5.5 4.21L17.18 22 12 17.27 6.82 22l.68-8.52L2 9.27l7.61-1L12 2z" />
                    </svg>
                ))}
                {/* Half star */}
                {halfStar && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="halfStarGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                                <stop offset="50%" stopColor="#f9c78f" />
                                <stop offset="100%" stopColor="#668199" />
                            </linearGradient>
                            <clipPath id="halfStarClip">
                                <rect x="0" y="0" width="18" height="36" />
                            </clipPath>
                        </defs>
                        <path d="M34,16.78a2.22,2.22,0,0,0-1.29-4l-9-.34a.23.23,0,0,1-.2-.15L20.4,3.89a2.22,2.22,0,0,0-4.17,0l-3.1,8.43a.23.23,0,0,1-.2.15l-9,.34a2.22,2.22,0,0,0-1.29,4l7.06,5.55a.23.23,0,0,1,.08.24L7.35,31.21a2.22,2.22,0,0,0,3.38,2.45l7.46-5a.22.22,0,0,1,.25,0l7.46,5a2.2,2.2,0,0,0,2.55,0,2.2,2.2,0,0,0,.83-2.4l-2.45-8.64a.22.22,0,0,1,.08-.24ZM24.9,23.11l2.45,8.64A.22.22,0,0,1,27,32l-7.46-5a2.21,2.21,0,0,0-1.24-.38h0V4.44h0a.2.2,0,0,1,.21.15L21.62,13a2.22,2.22,0,0,0,2,1.46l9,.34a.22.22,0,0,1,.13.4l-7.06,5.55A2.21,2.21,0,0,0,24.9,23.11Z" fill="url(#halfStarGradient)" clipPath="url(#halfStarClip)" />
                    </svg>
                )}
                {/* Empty stars */}
                {Array(emptyStars).fill(0).map((_, index) => (
                    <svg key={index} className="w-5 h-5 text-border" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l2.39 7.27L22 9.27l-5.5 4.21L17.18 22 12 17.27 6.82 22l.68-8.52L2 9.27l7.61-1L12 2z" />
                    </svg>
                ))}
            </div>
        );
    };
    return (
        <>
            <section className="py-16 pt-44 bg-herobg dark:bg-semidark">
                <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4">
                    <div className="grid grid-cols-12 lg:gap-0 gap-6">
                        <div className="lg:col-span-8 col-span-12">
                            <p className="text-grey text-xl mb-4">{duration}</p>
                            <h2 className="mb-3 dark:text-white lg:text-[70px] lg:leading-[4.75rem] sm:text-[50px] leading-[4.3rem] text-4xl font-bold text-midnight_text">{title}</h2>
                            <div className="flex md:flex-nowrap flex-wrap gap-11">
                                <div className=" flex gap-8">
                                    <div className="rounded-full h-16 w-16 flex items-center justify-center bg-primary/20">
                                        <svg
                                            fill="#2F73F2"
                                            height="45px"
                                            width="37px"
                                            version="1.1"
                                            id="Capa_1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            viewBox="0 0 297 297"
                                            xmlSpace="preserve"
                                            stroke="#2F73F2"
                                            strokeWidth="0.00297"
                                        >
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <g>
                                                    <path d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645 c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645 C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892 c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z"></path>
                                                    <path d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614 c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901 c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104 C179.265,127.948,165.464,141.901,148.5,141.901z"></path>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <h3 className="sm:text-[28px] sm:leading-[2.25rem] text-[22px] leading-[2rem] text-midnight_text dark:text-white">
                                            {location}
                                        </h3>
                                        <p className="text-sm text-grey ">location</p>
                                    </div>
                                </div>
                                <div className=" flex gap-8">
                                    <div className="rounded-full h-16 w-16 flex items-center justify-center bg-primary/20">
                                        <svg
                                            width="37px"
                                            height="45px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z" stroke="#2F73F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <h3 className="sm:text-[28px] sm:leading-[2.25rem] text-[22px] leading-[2rem] text-midnight_text dark:text-white">
                                            2024
                                        </h3>
                                        <p className="text-sm text-grey">Jan - July</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-base text-grey">{review}</p>
                                    <div>
                                        {renderStars(rating)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 md:col-span-7 sm:col-span-10 col-span-12">
                            <div className="bg-white dark:bg-darkmode shadow-filter_shadow dark:shadow-darkmd rounded-lg">
                                <div className="flex gap-8 py-8 px-11 border-b border-border dark:border-darkmode">
                                    <div className="rounded-full h-16 w-16 flex items-center justify-center bg-primary/20">
                                        <svg
                                            width="37px"
                                            height="45px"
                                            viewBox="0 0 24.00 24.00"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            stroke="#2F73F2"
                                        >
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <g clipPath="url(#clip0_443_3628)">
                                                    <rect x="2" y="6" width="20" height="12" stroke="#2F73F2" strokeWidth="0.8399999999999999" strokeLinecap="round" strokeLinejoin="round"></rect>
                                                    <path d="M22 10C21.4747 10 20.9546 9.89654 20.4693 9.69552C19.984 9.4945 19.543 9.19986 19.1716 8.82843C18.8001 8.45699 18.5055 8.01604 18.3045 7.53073C18.1035 7.04543 18 6.52529 18 6L22 6L22 10Z" stroke="#2F73F2" strokeWidth="0.8399999999999999" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M18 18C18 16.9391 18.4214 15.9217 19.1716 15.1716C19.9217 14.4214 20.9391 14 22 14L22 18L18 18Z" stroke="#2F73F2" strokeWidth="0.8399999999999999" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M2 14C3.06087 14 4.07828 14.4214 4.82843 15.1716C5.57857 15.9217 6 16.9391 6 18L2 18L2 14Z" stroke="#2F73F2" strokeWidth="0.8399999999999999" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M6 6C6 7.06087 5.57857 8.07828 4.82843 8.82843C4.07828 9.57857 3.06087 10 2 10L2 6H6Z" stroke="#2F73F2" strokeWidth="0.8399999999999999" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M14.0741 9.5H11.3333C10.597 9.5 10 10.0596 10 10.75C10 11.4404 10.597 12 11.3333 12H13.1111C13.8475 12 14.4444 12.5596 14.4444 13.25C14.4444 13.9404 13.8475 14.5 13.1111 14.5H10" stroke="#2F73F2" strokeWidth="0.8399999999999999" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M12 9.51733V8.5" stroke="#2F73F2" strokeWidth="0.8399999999999999" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M12 15.5173V14.5" stroke="#2F73F2" strokeWidth="0.8399999999999999" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_443_3628">
                                                        <rect width="24" height="24" fill="white"></rect>
                                                    </clipPath>
                                                </defs>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="">
                                        <h3 className="text-[28px] leading-[2.25rem] text-midnight_text dark:text-white font-bold">
                                            {price}
                                        </h3>
                                        <p className="text-base text-grey ">/ person</p>
                                    </div>
                                </div>
                                <div className="flex gap-8 py-8 px-11">
                                    <div className="rounded-full h-16 w-16 flex items-center justify-center bg-primary/20">
                                        <Image
                                            src="/images/features/icon-customer.svg"
                                            alt="..."
                                            width={37}
                                            height={45}
                                        />
                                    </div>
                                    <div className="">
                                        <h3 className="text-[28px] leading-[2.25rem] text-midnight_text dark:text-white font-bold">
                                            187
                                        </h3>
                                        <p className="text-base text-grey ">Max guests</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSub;