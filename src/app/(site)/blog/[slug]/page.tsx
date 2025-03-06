import Blog from '@/components/SharedComponent/Blog'
import { getPostBySlug } from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";
import { format } from "date-fns";
import Image from "next/image";

// Define the correct type for the "params" object
interface PostParams {
  slug: string;
}

export async function generateMetadata({ params }: { params: PostParams }) {
  // Await the params object here
  const { slug } = await params; // Await the params object before using the properties
  // Fetch post data asynchronously
  const post = await getPostBySlug(slug, ["title", "author", "content", "metadata"]);

  const siteName = process.env.SITE_NAME || "Your Site Name";
  const authorName = process.env.AUTHOR_NAME || "Your Author Name";

  if (post) {
    const metadata = {
      title: `${post.title || "Single Post Page"} | ${siteName}`,
      author: authorName,
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };

    return metadata;
  } else {
    return {
      title: "Not Found",
      description: "No blog article has been found",
      author: authorName,
      robots: {
        index: false,
        follow: false,
        nocache: false,
        googleBot: {
          index: false,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }
}

export default async function Post({ params }: { params: PostParams }) {
  // Await the params object here
  const { slug } = await params; // Await the params object before using the properties
  // Fetch post data asynchronously
  const post = await getPostBySlug(slug, [
    "title",
    "author",
    "authorImage",
    "content",
    "coverImage",
    "date",
  ]);

  if (!post) {
    return <div>Post not found!</div>;
  }

  // Await the markdownToHtml function since it's asynchronous
  const content = await markdownToHtml(post.content || "");

  return (
    <>
      <section className="relative pt-44 bg-gradient-to-b from-white from-10% dark:from-darkmode to-herobg to-90% dark:to-semidark">
        <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto lg:px-0 px-4">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center">
            <div className="col-span-8">
              <div className="flex flex-col sm:flex-row">
                <span className="text-base text-midnight_text font-medium dark:text-white pr-7 w-fit">
                  {format(new Date(post.date), "dd MMM yyyy")}
                </span>
              </div>
              <h2 className="text-midnight_text dark:text-white md:text-[40px] md:leading-[3rem] sm:text-4xl text-[28px] leading-[2.25rem] font-bold pt-7">
                {post.title}
              </h2>
            </div>
            <div className="flex items-center md:justify-center justify-start gap-6 col-span-4 pt-4 md:pt-0">
              <span className="text-[22px] leading-[2rem] font-bold text-midnight_text dark:text-white">
                {post.author}
              </span>
              <p className="text-xl text-gray dark:text-white">Author</p>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-10 pt-20 dark:bg-darkmode lg:pb-20 lg:pt-32">
        <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto lg:px-0 px-4">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4">
              <div className="z-20 mb-16 h-80 overflow-hidden rounded md:h-25 lg:h-31.25">
                <Image
                  src={post.coverImage}
                  alt="image"
                  width={1170}
                  height={766}
                  quality={100}
                  className="h-full w-full object-cover object-center rounded-3xl"
                />
              </div>
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 lg:w-8/12">
                  <div className="blog-details xl:pr-10">
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-SnowySky dark:bg-darklight">
        <Blog />
      </div>
    </>
  );
}