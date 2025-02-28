"use client"
import React from 'react';
import { Package } from '@/app/api/data';
import HeroSub from '@/components/Package_Detail/herosub';
import Detail from '@/components/Package_Detail/Details';
import PackageSlider from '@/components/Package_Detail/slider';
import Journy from '@/components/SharedComponent/journyInfo';
import { useParams } from "next/navigation";


export default function Details() {
    const { slug } = useParams();

    const item = Package.find((item) => item.slug === slug);

    return (
        <>
            <HeroSub
                duration={item?.duration}
                title={item?.name}
                location={item?.location}
                review={item?.review}
                rating={item?.rating}
                price={item?.price}
            />
            <Detail />
            <PackageSlider />
            <Journy />
        </>
    );
}
