import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserGrowthChart = () => {
  const [data, setData] = useState([]);
  const [averageUserCount, setAverageUserCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/user');
        const users = response.data.users;

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const startDate = new Date(currentYear, currentMonth, 1);
        const endDate = new Date(currentYear, currentMonth + 1, 0);

        const userCounts = users.reduce((acc, user) => {
          const userDate = new Date(user.createdAt);
          if (userDate >= startDate && userDate <= endDate) {
            const dateStr = userDate.toISOString().split('T')[0]; // Keep full date format
            acc[dateStr] = (acc[dateStr] || 0) + 1;
          }
          return acc;
        }, {});

        const allDates = [];
        let prevCount = 0;
        let totalUserCount = 0;

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          const fullDateStr = d.toISOString().split('T')[0]; // Full date for lookup
          const displayDateStr = fullDateStr.slice(5); // Only MM-DD for display
          
          const count = userCounts[fullDateStr] || prevCount;
          allDates.push({ date: displayDateStr, count: count });

          totalUserCount += count;
          prevCount = count;
        }

        setAverageUserCount(totalUserCount / allDates.length);
        setData(allDates);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
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
