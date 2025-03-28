import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserGrowthChart = () => {
  const [data, setData] = useState([]);
  const [averageUserCount, setAverageUserCount] = useState(0); // State for the average count

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/user');
        const users = response.data.users;

        // Process data to get user count per day
        const userCounts = users.reduce((acc, user) => {
          const date = new Date(user.createdAt).toISOString().split('T')[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        // Generate a range of dates from the earliest to the latest date
        const allDates = [];
        const startDate = new Date(Math.min(...users.map(user => new Date(user.createdAt))));
        const endDate = new Date(); // Current date

        let prevCount = 0;
        let totalUserCount = 0; // To calculate total user count
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split('T')[0];
          const count = userCounts[dateStr] || prevCount; // Use previous count if no users on the current date
          allDates.push({ date: dateStr, count: count });
          totalUserCount += count; // Add count to total user count
          prevCount = count; // Store current count to use as previous for the next iteration
        }

        // Calculate the average user count
        const average = totalUserCount / allDates.length;
        setAverageUserCount(average); // Update state with the calculated average

        setData(allDates);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-4xl">
    

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ angle: -45, textAnchor: 'end' }} // Rotate the timestamps to avoid overlap
            interval={0} // Show all timestamps
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
