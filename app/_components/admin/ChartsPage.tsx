"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Container, Typography } from '@mui/material';

const ChartsPage = () => {
  const [programCategories, setProgramCategories] = useState([]);
  const [programTypesData, setProgramTypesData] = useState([]);

  useEffect(() => {
    axios.get('/api/programByCategory')
      .then(response => setProgramCategories(response.data))
      .catch(error => console.error('Error fetching programs by category:', error));

    axios.get('/api/programByType')
      .then(response => setProgramTypesData(response.data))
      .catch(error => console.error('Error fetching programs by type over time:', error));
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>Pie Chart for Program Categories</Typography>
      <PieChart width={400} height={400}>
        <Pie data={programCategories} dataKey="count" nameKey="categoryName" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
        <Tooltip />
      </PieChart>
      
      <Typography variant="h4" align="center" gutterBottom>Line Chart for Program Types Over Time</Typography>
      <LineChart width={500} height={300} data={programTypesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdAt" />
        <YAxis />
        <Tooltip />
        <Legend />
        {['Movies', 'Live TV', 'TV Shows', 'Sports'].map((type, index) => (
          <Line key={index} type="monotone" dataKey={type} stroke={index === 0 ? '#8884d8' : index === 1 ? '#82ca9d' : index === 2 ? '#ffc658' : '#ff7300'} />
        ))}
      </LineChart>
    </Container>
  );
}

export default ChartsPage;
