import Image from 'next/image';

const Dashboard = () => {
  return (
    <section className="dark:bg-darkmode" id="destination">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4">
        <h2 className="text-[40px] leading-[3rem] text-midnight_text dark:text-white font-bold mb-9">
          Dashboard
        </h2>
        <div className="grid grid-cols-12 gap-7">
          {/* First Column */}
          <div className="lg:col-span-6 col-span-12 rounded-3xl bg-white dark:bg-darklight p-8 sm:ps-8 ps-4 relative shadow-2xl">
            <div className="relative">
              {/* Feature Name with Background */}
              <div className="text-white py-2 px-4 rounded-full mb-4 inline-block">
                <h3 className="font-semibold  text-midnight_text dark:text-white">The ability to scroll through and view every user...</h3>
                {/* Description */}
              <p className="text-midnight_text dark:text-white mb-4">
                This will include a name, an email, and whether the user is using the basic package or paying...
                and possibly a profile picture!
              </p>
              </div>
              
            </div>
          </div>

          {/* Second Column */}
          <div className="lg:col-span-6 col-span-12 flex flex-col gap-7">
            <div className="relative rounded-3xl bg-white dark:bg-darklight p-8 sm:ps-8 ps-4 shadow-2xl">
              <Image
                src="/images/dashboard/staticgraph.png"
                alt="static graph"
                width={200}
                height={100}
                style={{ width: '100%', height: 'auto' }}
                className="group-hover:scale-110 duration-300 rounded-3xl" // Add rounded-3xl here
              />
            </div>

            <div className="grid grid-cols-1 gap-7">
              {/* Fourth Column */}
              <div className="relative rounded-3xl bg-white dark:bg-darklight p-8 sm:ps-8 ps-4 shadow-2xl">
                {/* Feature Name with Background */}
                <div className="text-white py-2 px-4 rounded-full mb-4 inline-block">
                  <h3 className="font-semibold text-midnight_text dark:text-white">Little things here..</h3>
                  {/* Description */}
                <p className="text-midnight_text dark:text-white mb-4">
                  Average view count over the week
                </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
