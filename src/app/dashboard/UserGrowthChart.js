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
        // We are only interested in users created in the current month
        if (userDate >= startDate && userDate <= endDate) {
          const dateStr = userDate.toISOString().split('T')[0]; // Full date format (YYYY-MM-DD)
          acc[dateStr] = (acc[dateStr] || 0) + 1; // Increment count for that date
        }
        return acc;
      }, {});

      const allDates = [];
      let prevCount = initialUserCount; // Start with the count of users before the 1st of April
      let totalUserCount = 0;

      // Get today's date to filter out future dates
      const todayStr = new Date().toISOString().split('T')[0];

      // Loop through each day of the current month and filter out future dates
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const fullDateStr = d.toISOString().split('T')[0]; // Full date for lookup (YYYY-MM-DD)
        const displayDateStr = fullDateStr.slice(5); // Only MM-DD for display (to show on the chart)

        // Skip future days (we only want past days and today)
        if (fullDateStr > todayStr) {
          continue;
        }

        // Get the user count for the current day, falling back to previous count if no new users
        const count = userCounts[fullDateStr] || prevCount;

        // If today, update it with the correct total user count
        if (fullDateStr === todayStr) {
          allDates.push({ date: displayDateStr, count: users.length });
        } else {
          allDates.push({ date: displayDateStr, count: count });
        }

        totalUserCount += count;
        prevCount = count; // Set the previous count for next day aggregation
      }

      // Calculate average user count
      setAverageUserCount(totalUserCount / allDates.length);
      setData(allDates);

      // Dynamically adjust the chart height based on the maximum user count
      const maxUserCount = Math.max(...allDates.map(item => item.count));
      // Update the chart height based on the max user count (increase height proportionally)
      setChartHeight(450 + maxUserCount * 2); // You can adjust the multiplier to suit your needs
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch data initially on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Get the maximum user count from the data to dynamically set Y-Axis domain
  const maxCount = Math.max(...data.map(item => item.count));
  const yAxisDomain = [0, maxCount + Math.ceil(maxCount * 0.1)]; // Add 10% buffer to max value

  // Calculate the tick step
  const yTickStep = Math.ceil(maxCount / 5); // You can adjust this divisor to control how many ticks are displayed

  return (
    <div className="w-full">
      <div className="mb-4">
        {/* Display the current number of users */}
        <h5>Current Number of Users: {currentUserCount}</h5>
      </div>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <LineChart 
          data={data} 
          margin={{ left: 30, right: 30, bottom: 60 }} // Spacing fix
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ angle: -45, textAnchor: 'end' }} 
            interval={0} 
            height={60} 
          />
          <YAxis 
            domain={yAxisDomain} 
            ticks={Array.from({ length: Math.floor(maxCount / yTickStep) + 1 }, (_, i) => i * yTickStep)}
          />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthChart;
