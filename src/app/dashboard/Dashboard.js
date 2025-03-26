'use client'; // Tells Next.js this is a client-side component

import { useState, useEffect } from 'react';
import UserGrowthChart from './UserGrowthChart';

export default function Dashboard({ session, users }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Handle any client-side logic here if necessary
    setLoading(false); // Assume data is ready after the first render
  }, []);

  // Calculate average user count per day for a week (or any other period)
  const calculateAverageUserCount = () => {
    if (users.length === 0) return 0;
    // Assuming a week is 7 days; adjust accordingly for different periods
    const userCount = users.length;
    const days = 7; // You can change this to any other number if you want a different period
    return (userCount / days).toFixed(2); // Calculate average
  };

  // Get the current number of paying users
  const getPayingUsersCount = () => {
    const payingUsers = users.filter(user => user.is_premium); // Filter users who are paying (is_premium = true)
    return payingUsers.length;
  };

  // Handle loading and error states
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
          Welcome to the Admin Dashboard, {session.user?.name} 🎉
        </h2>

        <div className="grid grid-cols-12 gap-7 mt-12">
          {/* First Column */}
          <div className="lg:col-span-6 col-span-12 rounded-3xl bg-white dark:bg-darklight p-8 sm:ps-8 ps-4 relative shadow-2xl">
            <div className="relative">
              <div className="text-white py-2 px-4 rounded-full mb-4 inline-block">
                <h3>Users List</h3>
                <table className="min-w-full table-auto">
                  <thead className="border-b-2 border-black dark:border-white">
                    <tr>
                      <th className="py-2 px-4 text-left"><b>Name</b></th>
                      <th className="py-2 px-4 text-left"><b>Email</b></th>
                      <th className="py-2 px-4 text-left"><b>Type</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={index} className="border-b-2 border-gray-300 dark:border-gray-700">
                          <td className="py-2 px-4">{user.name}</td>
                          <td className="py-2 px-4">{user.email}</td>
                          <td className="py-2 px-4">{user.is_premium ? 'Premium' : 'Free'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="py-2 px-4 text-center">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div className="lg:col-span-6 col-span-12 flex flex-col gap-7">
            <div className="lg:col-span-6 col-span-12 rounded-3xl bg-white dark:bg-darklight p-8 sm:ps-8 ps-4 relative shadow-2xl">
              <h3>User Growth Over Time</h3>
              <UserGrowthChart />
              <br />
            </div>

            <div className="grid grid-cols-1 gap-7">
              {/* Third Column - Average User Count */}
              <div className="relative rounded-3xl bg-white dark:bg-darklight p-8 sm:ps-8 ps-4 shadow-2xl">
                <div className="text-white py-2 px-4 rounded-full mb-4 inline-block">
                  <h3 className="font-semibold text-midnight_text dark:text-white">
                    Average Users 👤
                  </h3>
                  <p className="text-midnight_text dark:text-white mb-4">
                    {/* Display the average user count here */}
                    {users.length > 0 ? (
                      `${calculateAverageUserCount()} users/day`
                    ) : (
                      "No users available."
                    )}
                  </p>
                </div>

<hr className="border-b-2 border-black dark:border-white"></hr>
<br></br>

                <div className="text-white py-2 px-4 rounded-full mb-4 inline-block">
                  <h3 className="font-semibold text-midnight_text dark:text-white">
                    Premium Users 💳
                  </h3>
                  <p className="text-midnight_text dark:text-white mb-4">
                    {/* Display the number of paying users */}
                    {users.length > 0 ? (
                      `${getPayingUsersCount()} premium users`
                    ) : (
                      "No users available."
                    )}
                  </p>
                </div>



              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
