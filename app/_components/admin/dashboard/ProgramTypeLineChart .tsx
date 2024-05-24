'use client'

import axiosBase from '@/app/endPoints/axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import socketIOClient from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";

const ProgramTypeLineChart = () => {
  const [programTypeData, setProgramTypeData] = useState([]);
  const types = [
    { id: 1, name: "Live TV" },
    { id: 2, name: "Movies" },
    { id: 3, name: "TV Shows" },
    { id: 4, name: "Sports" },
  ];

  // Define colors for each type
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e'];

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    axiosBase.get('/api/programs')
      .then(response => {
        const programData = response.data;

        // Aggregate program data by program type and day
        const aggregatedData: { day: string, [key: string]: number }[] = [];

        programData.forEach(program => {
          const day = new Date(program.created_at).toLocaleDateString(); // Assuming `created_at` field contains the date
          const index = aggregatedData.findIndex(item => item.day === day);
          if (index === -1) {
            const newData = { day: day };
            types.forEach(type => {
              newData[type.name] = program.typeId === type.id ? 1 : 0;
            });
            aggregatedData.push(newData);
          } else {
            types.forEach(type => {
              if (program.typeId === type.id) {
                aggregatedData[index][type.name] = (aggregatedData[index][type.name] || 0) + 1;
              }
            });
          }
        });

        setProgramTypeData(aggregatedData);
      })
      .catch(error => {
        console.error('Error fetching program types:', error);
      });

    socket.on("programDataUpdate", (data) => {
      // When program data is updated, recalculate aggregatAed data
      const aggregatedData = [];
      data.forEach(program => {
        const day = new Date(program.created_at).toLocaleDateString(); // Assuming `created_at` field contains the date
        const index = aggregatedData.findIndex(item => item.day === day);
        if (index === -1) {
          const newData = { day: day };
          types.forEach(type => {
            newData[type.name] = program.typeId === type.id ? 1 : 0;
          });
          aggregatedData.push(newData);
        } else {
          types.forEach(type => {
            if (program.typeId === type.id) {
              aggregatedData[index][type.name] = (aggregatedData[index][type.name] || 0) + 1;
            }
          });
        }
      });

      setProgramTypeData(aggregatedData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <LineChart
      width={700}
      height={300}
      data={programTypeData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      {types.map((type, index) => (
        <Line key={type.id} type="monotone" dataKey={type.name} stroke={colors[index]} />
      ))}
    </LineChart>
  );
};

export default ProgramTypeLineChart;

