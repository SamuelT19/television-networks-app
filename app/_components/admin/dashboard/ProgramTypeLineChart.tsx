"use client";

import axiosBase from "@/app/endPoints/axios";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import socketIOClient from "socket.io-client";

interface Program {
  id: number;
  airDate: string;
  typeId: number;
  typeName: string;
}

const ENDPOINT = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";

const ProgramTypeLineChart: React.FC = () => {
  const [programTypeData, setProgramTypeData] = useState<
    Array<{ [key: string]: string | number }>
  >([]);

  const [dataCount, setDataCount]= useState<Program[]>([])
  const types = [
    { id: 1, name: "Live TV" },
    { id: 2, name: "Movies" },
    { id: 3, name: "TV Shows" },
    { id: 4, name: "Sports" },
  ];

  const COLORS = ["#f2281d", "#48f21d", "#1d2bf2", "#eff21d"];

  const getPeriod = (day: number) => {
    if (day <= 6) return "1-6";
    if (day <= 12) return "7-12";
    if (day <= 18) return "13-18";
    if (day <= 24) return "19-24";
    return "25-30";
  };

  const aggregateProgramData = (programData: Array<Program>) => {
    const aggregatedData: Array<{ [key: string]: string | number }> = [
      { period: "1-6" },
      { period: "7-12" },
      { period: "13-18" },
      { period: "19-24" },
      { period: "25-30" },
    ];


    
    aggregatedData.forEach((data) => {
      types.forEach((type) => {
        data[type.name] = 0;
      });
    });

    programData.forEach((program) => {
      const day = new Date(program.airDate).getDate();
      const period = getPeriod(day);
      const index = aggregatedData.findIndex((item) => item.period === period);
      types.forEach((type) => {
        if (program.typeId === type.id) {
          aggregatedData[index][type.name] =
            (aggregatedData[index][type.name] as number) + 1;
        }
      });
    });

    return aggregatedData;
  };

  const getTypeCounts = () => {
    const typeCounts = new Map<string, number>();
    types.forEach((type) => {
      typeCounts.set(type.name, 0);
    });

    dataCount.forEach((program) => {
        const typeName = program.typeName;
      const currentCount = typeCounts.get(typeName) || 0;
      typeCounts.set(typeName, currentCount + 1);
    });

    return Array.from(typeCounts.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  };

  const data = getTypeCounts();


  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    axiosBase
      .get<Array<Program>>("/api/programs")
      .then((response) => {
        const programData = response.data;
        setProgramTypeData(aggregateProgramData(programData));
        setDataCount(programData)
      })
      .catch((error) => {
        console.error("Error fetching program types:", error);
      });

    socket.on("programDataUpdate", (data: Array<Program>) => {
      setProgramTypeData(aggregateProgramData(data));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Card sx={{ marginTop:"20px",boxShadow: "4px 4px 2px 4px rgba(0, 0, 0, 0.2)" }}>
      <CardContent>
      <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            display: "inline-block",
            padding: "20px",
            color: "white",
            backgroundColor: "black",
            borderRadius: "5px"
          }}
        >
          Programs by Category
        </Typography>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <LineChart
          width={600}
          height={400}
          data={programTypeData}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="period"
            label={{
              value: "Days of the Month (1-30)",
              position: "insideBottom",
              marginTop:"29px"
            }}
          />
          <YAxis
            label={{
              value: "Total Programs",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend style={{marginTop:"50px"}}/>
          {types.map((type, index) => (
            <Line
              key={type.id}
              type="monotone"
              dataKey={type.name}
              stroke={COLORS[index]}
            />
          ))}
        </LineChart>

        <Box>
            {data.map((entry, index) => (
              <Box
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: COLORS[index % COLORS.length],
                    marginRight: "10px",
                  }}
                ></div>
                <span>
                  {entry.name}: {entry.count}
                </span>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  //   return (
  //     <LineChart
  //       width={500}
  //       height={300}
  //       data={programTypeData}
  //       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  //     >
  //       <CartesianGrid strokeDasharray="3 3" />
  //       <XAxis dataKey="period" />
  //       <YAxis />
  //       <Tooltip />
  //       <Legend />
  //       {types.map((type, index) => (
  //         <Line key={type.id} type="monotone" dataKey={type.name} stroke={colors[index]} />
  //       ))}
  //     </LineChart>
  //   );
};

export default ProgramTypeLineChart;
















// "use client"

// import axiosBase from '@/app/endPoints/axios';
// import React, { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import socketIOClient from "socket.io-client";

// interface Program {
//   id: number;
//   airDate: string; // Changed from created_at to airDate
//   typeId: number;
// }

// const ENDPOINT = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";

// const ProgramTypeLineChart: React.FC = () => {
//   const [programTypeData, setProgramTypeData] = useState<Array<{ [key: string]: string | number }>>([]);
//   const types = [
//     { id: 1, name: "Live TV" },
//     { id: 2, name: "Movies" },
//     { id: 3, name: "TV Shows" },
//     { id: 4, name: "Sports" },
//   ];

//   // Define colors for each type
//   const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e'];

//   const aggregateProgramData = (programData: Array<Program>) => {
//     // Initialize aggregated data for each day
//     const aggregatedData: Array<{ [key: string]: string | number }> = [];

//     // Aggregate program data by program type and day
//     programData.forEach(program => {
//       const day = new Date(program.airDate).toLocaleDateString(); // Extract day of the month from airDate
//       const index = aggregatedData.findIndex(item => item.day === day);
//       if (index === -1) {
//         const newData: { [key: string]: string | number } = { day: day, total: 1 };
//         types.forEach(type => {
//           newData[type.name] = program.typeId === type.id ? 1 : 0;
//         });
//         aggregatedData.push(newData);
//       } else {
//         aggregatedData[index].total += 1; // Increment total count for the day
//         types.forEach(type => {
//           if (program.typeId === type.id) {
//             aggregatedData[index][type.name] = (aggregatedData[index][type.name] || 0) + 1;
//           }
//         });
//       }
//     });

//     return aggregatedData;
//   };

//   useEffect(() => {
//     const socket = socketIOClient(ENDPOINT);
//     axiosBase.get<Array<Program>>('/api/programs')
//       .then(response => {
//         const programData = response.data;
//         setProgramTypeData(aggregateProgramData(programData));
//       })
//       .catch(error => {
//         console.error('Error fetching program types:', error);
//       });

//     socket.on("programDataUpdate", (data: Array<Program>) => {
//       // When program data is updated, recalculate aggregated data
//       setProgramTypeData(aggregateProgramData(data));
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <LineChart
//       width={500}
//       height={300}
//       data={programTypeData}
//       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="day" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Line type="monotone" dataKey="total" stroke="#8884d8" />
//     </LineChart>
//   );
// };

// export default ProgramTypeLineChart;

// "use client"
// import axiosBase from '@/app/endPoints/axios';
// import React, { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import socketIOClient from "socket.io-client";

// interface Program {
//   id: number;
//   airDate: string; // Changed from created_at to airDate
//   typeId: number;
// }

// const ENDPOINT = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";

// const ProgramTypeLineChart: React.FC = () => {
//   const [programTypeData, setProgramTypeData] = useState<Array<{ [key: string]: string | number }>>([]);
//   const types = [
//     { id: 1, name: "Live TV", color: "#8884d8" },
//     { id: 2, name: "Movies", color: "#82ca9d" },
//     { id: 3, name: "TV Shows", color: "#ffc658" },
//     { id: 4, name: "Sports", color: "#ff7f0e" },
//   ];

//   const aggregateProgramData = (programData: Array<Program>) => {
//     // Initialize aggregated data for each day
//     const aggregatedData: { [key: string]: { [key: string]: number } } = {};

//     // Aggregate program data by day and type
//     programData.forEach(program => {
//       const day = new Date(program.airDate).toLocaleDateString(); // Extract day of the month from airDate
//       if (!aggregatedData[day]) {
//         aggregatedData[day] = {};
//         types.forEach(type => {
//           aggregatedData[day][type.name] = 0;
//         });
//       }
//       const typeName = types.find(type => type.id === program.typeId)?.name;
//       if (typeName) {
//         aggregatedData[day][typeName] = (aggregatedData[day][typeName] || 0) + 1;
//       }
//     });

//     // Convert aggregated data to array format
//     const dataArray = Object.entries(aggregatedData).map(([day, counts]) => ({ day, ...counts }));
//     return dataArray;
//   };

//   useEffect(() => {
//     const socket = socketIOClient(ENDPOINT);

//     const fetchProgramData = async () => {
//       try {
//         const response = await axiosBase.get<Array<Program>>('/api/programs');
//         const programData = response.data;
//         const aggregatedData = aggregateProgramData(programData);
//         setProgramTypeData(aggregatedData);
//       } catch (error) {
//         console.error('Error fetching program data:', error);
//       }
//     };

//     fetchProgramData();

//     socket.on("programDataUpdate", () => {
//       // When program data is updated, refetch program data
//       fetchProgramData();
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <LineChart
//       width={500}
//       height={300}
//       data={programTypeData}
//       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="day" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       {types.map((type, index) => (
//         <Line key={type.id} type="monotone" dataKey={type.name} stroke={type.color} />
//       ))}
//     </LineChart>
//   );
// };

// export default ProgramTypeLineChart;
