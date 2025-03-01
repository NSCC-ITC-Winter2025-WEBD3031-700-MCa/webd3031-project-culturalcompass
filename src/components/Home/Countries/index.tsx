import { Countries } from "@/app/api/data";
import Image from "next/image";

const PopularCountries = () => {
  return (
    <section className="dark:bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4">
        <div className="flex items-center md:flex-row flex-col justify-between mb-5">
          <h2 className="text-[40px] leading-[3rem] text-midnight_text dark:text-white font-bold mb-5">
            Popular Countries
          </h2>
          <p className="text-lg text-grey font-medium">Adventure Place</p>
        </div>
        <div className="grid grid-cols-12 ">
          {Countries.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-offset="300"
              data-aos-delay={`${index * 200}`}
              data-aos-duration="1000"
              className={`${item.class} border-s border-border dark:border-dark_border ps-8 lg:col-span-2 md:col-span-4 col-span-6 h-fit relative`}
            >
              <Image
                src={item.flag}
                alt={item.name}
                width={0}
                height={0}
                style={{ width: "auto", height: "auto" }}
                className="mb-6"
              />
              <h3 className="text-midnight_text font-bold text-2xl mb-1 dark:text-white">
                {item.name}
              </h3>
              <p className="text-grey text-base">{item.offfers} Offers</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCountries;
