import HeroSub from "@/components/SharedComponent/HeroSub";
import PackageCard from "@/components/SharedComponent/PackageCard";
import Filter from "@/components/Tours/Filter";
import { Icon } from "@iconify/react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Packages / Avenue",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/tours", text: "Tour Packages" },
  ];
  return (
    <>
      <HeroSub
        title="Tour Packages"
        description="Discover a wealth of insightful materials meticulously crafted to provide you with a comprehensive understanding of the latest trends."
        breadcrumbLinks={breadcrumbLinks}
      />

      <section className=" dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4">
          <div className="grid grid-cols-12 lg:gap-9 gap-6">
            <div className="lg:col-span-4 col-span-12">
              <Filter />
            </div>
            <div className="lg:col-span-8 col-span-12">
              <div className="flex w-full sm:flex-row flex-col justify-between items-center pb-8">
                <div className="flex w-full justify-between px-4 flex-1">
                  <h5 className="text-xl dark:text-white">
                    8 Properties Found
                  </h5>
                  <p className="flex text-grey gap-2 items-center">
                    Sort by
                    <span>
                      <Icon
                        icon="fa6-solid:arrow-trend-up"
                        width="20"
                        height="20"
                        className=""
                      />
                    </span>
                  </p>
                </div>
                <div className="sm:flex-1 sm:w-auto w-full flex gap-3 px-4">
                  <select
                    name="short"
                    className="border border-border dark:border-dark_border dark:bg-semidark text-midnight_text dark:text-white focus:border-primary rounded-lg p-3 pr-9"
                  >
                    <option value="Title">Title</option>
                    <option value="...">...</option>
                  </select>
                  <button className="bg-primary p-3 text-white rounded-lg hover:bg-blue-700 text-base">
                    <span>
                      <Icon
                        icon="solar:checklist-linear"
                        width="21"
                        height="21"
                        className=""
                      />
                    </span>
                  </button>
                  <button className="bg-transparent border border-primary p-3 hover:text-white text-primary rounded-lg hover:bg-primary text-base">
                    <span>
                      <Icon
                        icon="solar:hamburger-menu-linear"
                        width="21"
                        height="21"
                        className=""
                      />
                    </span>
                  </button>
                </div>
              </div>
              <PackageCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
