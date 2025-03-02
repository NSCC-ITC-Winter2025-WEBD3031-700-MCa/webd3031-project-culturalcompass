import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative pt-24 bg-white  dark:bg-gray-900 bg-contain text-white ">
      <div className="container mx-auto lg:max-w-screen-2xl md:max-w-screen-md lg:px-0 px-4 relative z-10">
      <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
        <div className="bg-[url('/images/hero/travel-bg.jpg')] bg-no-repeat bg-cover sm:p-24 p-10 px-4 bg-center rounded-3xl grid grid-cols-12">
          <div className="2xl:col-span-8 lg:col-span-6 col-span-12">
            <div className="flex flex-col h-full justify-end">
              <h1
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="1000"
                className="text-white sm:text-[70px] sm:leading-[4.75rem] xl:text-[100px] xl:leading-[6.37rem] text-[58px] leading-[5.3rem] font-bold lg:text-left text-center sm:mb-8"
              >
                 Your New Destination<span className="text-primary">.</span>
              </h1>
              <div
                className="flex lg:justify-start justify-center gap-4"
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="1000"
              >
               
              </div>
            </div>
          </div>
          <div className="2xl:col-span-4 lg:col-span-6 col-span-12 lg:mt-0 mt-8">
            <div
              className="bg-white dark:bg-darklight rounded-3xl p-8"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <h4 className="text-midnight_text text-2xl font-bold dark:text-white">
                Plan your Vacation
              </h4>
              <form>
                <div className="py-4 border-b border-border dark:border-dark_border">
                  <label
                    htmlFor="destination"
                    className="text-grey text-base font-normal "
                  >
                    Destination*
                  </label>
                  <select
                    id="destination"
                    className="focus:outline-none w-full text-midnight_text dark:text-white text-xl font-medium dark:bg-darklight"
                  >
                    <option value="" className="text-base">
                      Reykjavík, Iceland
                    </option>
                    <option value="" className="text-base">
                      Vancouver, Canada
                    </option>
                    <option value="" className="text-base">
                      Kyoto, Japan
                    </option>
                    <option value="" className="text-base">
                      Lisbon, Portugal
                    </option>
                    <option value="" className="text-base">
                      Barcelona, Spain
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="py-3 bg-primary hover:bg-blue-700 text-white text-base font-medium w-full rounded-lg"
                >
                  Search Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
