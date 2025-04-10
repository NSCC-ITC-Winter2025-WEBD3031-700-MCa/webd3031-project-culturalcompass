'use client'; // Tells Next.js this is a client-side component

import { useState, useEffect } from 'react';
import UserGrowthChart from './UserGrowthChart';

export default function Dashboard({ session, users }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false); // Assume data is ready after the first render
  }, []);

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  const calculateAverageUserCount = () => {
    if (users.length === 0) return 0;
    const userCount = users.length;
    const days = 7; 
    return (userCount / days).toFixed(2);
  };

  // Count paying (premium) users
  const getPayingUsersCount = () => {
    return users.filter(user => user.is_premium).length;
  };

  // Count basic (non-premium) users
  const getBasicUsersCount = () => {
    return users.filter(user => !user.is_premium).length;
  };

  const getGoogleUsersCount = () => {
    return users.filter(user => user.google_id && user.google_id !== "" && user.google_id !== "null").length;
  };

  const getGitHubUsersCount = () => {
    return users.filter(user => user.github_id && user.github_id !== "" && user.github_id !== "null").length;
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="dark:bg-darkmode" id="destination">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-0 px-4 mt-12">
        <br />
        <h2 className="text-[30px] leading-[3rem] text-midnight_text dark:text-white font-bold mb-9 mt-16">
          Welcome to the Admin Dashboard!, {session.user?.name} 🎉
        </h2>

        <div className="grid grid-cols-12 gap-7 mt-12">
          <div className="lg:col-span-6 col-span-12 rounded-3xl bg-white dark:bg-darklight p-8 sm:ps-8 ps-4 relative shadow-2xl">
            <div className="relative">
              <div className="text-white py-2 px-4 rounded-full mb-4 inline-block">
                <h3 className="text-black dark:text-white">Users List</h3>
                <br />
                <div className="overflow-y-auto max-h-96">
                <table className="min-w-full table-auto">
                <thead className="border-b-2 border-black dark:border-white">
                <tr>
                  <th className="py-2 px-4 text-left dark:text-white text-black"><b>Name</b></th>
                  <th className="py-2 px-4 text-left dark:text-white text-black"><b>Email</b></th>
                  <th className="py-2 px-4 text-left dark:text-white text-black"><b>Type</b></th>
                </tr>
              </thead>

              <tbody>
  {users.length > 0 ? (
    users.map((user, index) => (
      <tr key={index} className="border-b-2 border-gray-300">
        <td className="py-2 px-4 dark:text-white text-black">{user.name}</td>
        <td className="py-2 px-4 dark:text-white text-black">{user.email}</td>
        <td className="py-2 px-4 dark:text-white text-black">{user.is_premium ? 'Premium' : 'Free'}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={3} className="py-2 px-4 text-center dark:text-white text-black">
        No users found.
      </td>
    </tr>
  )}
</tbody>

                </table>

                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 col-span-12 flex flex-col gap-7">
            <div className="relative rounded-3xl bg-white dark:bg-darklight p-8 sm:ps-8 ps-4 shadow-2xl">
              <h3 className='mb-10 text-black dark:text-white'>Users Stats</h3>
              <h3 className="font-semibold text-midnight_text dark:text-white">Average Users Per Day 👤</h3>
              <p className="text-midnight_text dark:text-white mb-4">
                {users.length > 0 ? `${calculateAverageUserCount()} users/day` : "No users available."}
              </p>

              <hr className="border-b-2 border-black dark:border-white" />
              <h3 className="font-semibold text-midnight_text dark:text-white mt-4">Premium Users ✈️</h3>
              <p className="text-midnight_text dark:text-white mb-4">
                {users.length > 0 ? `${getPayingUsersCount()} premium users` : "No users available."}
              </p>
              
              <hr className="border-b-2 border-black dark:border-white" />
              <h3 className="font-semibold text-midnight_text dark:text-white mt-4">Basic Users 🚲</h3>
              <p className="text-midnight_text dark:text-white mb-4">
                {users.length > 0 ? `${getBasicUsersCount()} basic users` : "No users available."}
              </p>
              
              <hr className="border-b-2 border-black dark:border-white" />
              <h3 className="font-semibold text-midnight_text dark:text-white mt-4">Google Users 🌍</h3>
              <p className="text-midnight_text dark:text-white mb-4">
                {users.length > 0 ? `${getGoogleUsersCount()} Google users` : "No users available."}
              </p>

              <hr className="border-b-2 border-black dark:border-white" />
              <h3 className="font-semibold text-midnight_text dark:text-white mt-4">Github Users 🐙</h3>
              <p className="text-midnight_text dark:text-white mb-4">
                {users.length > 0 ? `${getGitHubUsersCount()} GitHub users` : "No users available."}
              </p>


            </div>
          </div>

          <div className="col-span-12 w-full mt-7">
            <div className="rounded-3xl bg-white dark:bg-darklight p-8 sm:ps-8 ps-4 relative shadow-2xl">
              <h3 className="text-black dark:text-white">User Growth Chart For {currentMonth}</h3>
              <br />
              <UserGrowthChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
