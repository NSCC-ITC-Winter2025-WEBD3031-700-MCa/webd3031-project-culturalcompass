import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserGrowthChart = () => {
  const [data, setData] = useState([]);
  const [averageUserCount, setAverageUserCount] = useState(0);
  const [currentUserCount, setCurrentUserCount] = useState(0);

  // Function to fetch user data
  const fetchData = async () => {
    try {
      // Fetch all users to get the historical data
      const response = await axios.get('/api/user');
      const users = response.data.users;

      // Set the total user count (current number of users in the database)
      setCurrentUserCount(users.length);

      // Calculate the start and end date for the current month
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear, currentMonth, 1);
      const endDate = new Date(currentYear, currentMonth + 1, 0);

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
      let prevCount = 0;
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
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch data initially on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle new user creation
  const handleNewUserCreation = async () => {
    try {
      // Create a new user (this is a mock, replace with actual API request)
      await axios.post('/api/user', { /* user data */ });

      // After creating a new user, re-fetch the data to update the chart
      fetchData();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        {/* Display the current number of users */}
        <h5>Current Number of Users: {currentUserCount}</h5>
      </div>
      
      <ResponsiveContainer width="100%" height={450}>
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
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthChart;
