import React from "react";
import Link from "next/link";
import BlogCard from "./blogCard";
import { getAllPosts } from "@/utils/markdown";

const Blog: React.FC = () => {
  const posts = getAllPosts([
    "title",
    "date",
    "excerpt",
    "coverImage",
    "slug",
  ]).slice(0, 3);

  return (
    <section className="flex flex-wrap justify-center dark:bg-semidark">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4">
        <div className="flex items-baseline justify-center flex-wrap">
          <h2 className="sm:mb-11 mb-3 text-4xl font-bold text-midnight_text dark:text-white">
            Recent Blog
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-7">
          {posts.map((blog, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={`${i * 400}`}
              data-aos-duration="1000"
              className="w-full lg:col-span-4 sm:col-span-6 col-span-12"
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
