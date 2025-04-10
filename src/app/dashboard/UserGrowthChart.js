import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserGrowthChart = () => {
  const [data, setData] = useState([]);
  const [averageUserCount, setAverageUserCount] = useState(0);
  const [currentUserCount, setCurrentUserCount] = useState(0);
  const [chartHeight, setChartHeight] = useState(450); // Initial height

  // Function to fetch user data
  const fetchData = async () => {
    try {
      // Fetch all users to get the historical data
      const response = await axios.get('/api/user');
      const users = response.data.users;

      // Set the total user count (current number of users in the database)
      setCurrentUserCount(users.length);

      // Get the current month and year
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear, currentMonth, 1); // Start of the current month
      const endDate = new Date(currentYear, currentMonth + 1, 0); // End of the current month

      // Calculate the number of users created before the 1st of the current month
      const initialUserCount = users.filter(user => {
        const userDate = new Date(user.createdAt);
        return userDate < startDate;
      }).length;

      // Reduce the users to count them per day in the current month
      const userCounts = users.reduce((acc, user) => {
        const userDate = new Date(user.createdAt);
        if (userDate >= startDate && userDate <= endDate) {
          const dateStr = userDate.toISOString().split('T')[0]; // Full date format (YYYY-MM-DD)
          acc[dateStr] = (acc[dateStr] || 0) + 1;
        }
        return acc;
      }, {});

      const allDates = [];
      let totalUserCount = initialUserCount; // Start with the count of users before the 1st of April

      const todayStr = new Date().toISOString().split('T')[0];

      // Loop through each day of the current month and filter out future dates
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const fullDateStr = d.toISOString().split('T')[0]; 
        const displayDateStr = fullDateStr.slice(5); 

        if (fullDateStr > todayStr) continue;

        const countForDay = userCounts[fullDateStr] || 0; // Count of users created on this day
        totalUserCount += countForDay; // Add the daily new users to the total count

        // Push the current day and the total count up until this day
        allDates.push({ date: displayDateStr, count: totalUserCount });
      }

      setAverageUserCount(totalUserCount / allDates.length);
      setData(allDates);

      // Dynamically adjust the chart height based on the maximum user count
      const maxUserCount = Math.max(...allDates.map(item => item.count));
      setChartHeight(450 + maxUserCount * 2); // Adjust multiplier as necessary
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch data initially on component mount
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Refresh data every minute

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const maxCount = Math.max(...data.map(item => item.count));
  const yAxisDomain = [0, maxCount + Math.ceil(maxCount * 0.1)];
  const yTickStep = Math.ceil(maxCount / 5);

  return (
    <div className="w-full">
      <div className="mb-4">
        <h5>Current Number of Users: {currentUserCount}</h5>
      </div>

      {data.length === 0 ? (
        <div>No user data available for this month.</div>
      ) : (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart data={data} margin={{ left: 30, right: 30, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ angle: -45, textAnchor: 'end' }} interval={0} height={60} />
            <YAxis domain={yAxisDomain} ticks={Array.from({ length: Math.floor(maxCount / yTickStep) + 1 }, (_, i) => i * yTickStep)} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default UserGrowthChart;
