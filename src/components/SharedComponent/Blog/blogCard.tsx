import React, { FC } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
    const { title, coverImage, excerpt, date, slug } = blog;
    return (
        <>
            <div className="group mb-0 relative">
                <Link href={`/blog/${slug}`} aria-label="blog cover" className="group">
                    <div className="mb-8 rounded-3xl overflow-hidden">
                        <Image
                            src={coverImage!}
                            alt="image"
                            className="w-full transition group-hover:scale-125"
                            width={408}
                            height={272}
                            style={{ width: '100%', height: 'auto' }}
                            quality={100}
                        />

                    </div >
                    <div>
                        <h3 className="mb-4 inline-block font-semibold text-midnight_text group-hover:text-primary dark:text-white dark:hover:text-primary text-[22px] leading-[2rem]">
                            {title}
                        </h3>
                        <span className="text-sm font-semibold leading-loose text-SereneGray">
                            {format(new Date(date), "dd MMM yyyy")}
                        </span>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default BlogCard;