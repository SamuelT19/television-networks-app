'use client'

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Box, Card, CardContent, Typography } from '@mui/material';
import axiosBase from '@/app/endPoints/axios';
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

const socket = io('http://localhost:5000');

const ProgramCount: React.FC = () => {
  const [programCount, setProgramCount] = useState<number>(0);

  useEffect(() => {
    const fetchProgramCount = async () => {
      try {
        const response = await axiosBase.get('/api/programs/count');
        setProgramCount(response.data.count);
      } catch (error) {
        console.error('Error fetching program count:', error);
      }
    };

    fetchProgramCount();

    socket.on('programCountUpdate', fetchProgramCount);

    return () => {
      socket.off('programCountUpdate', fetchProgramCount);
    };
  }, []);

  return (
    <Card sx={{ marginBottom: 2, boxShadow: 3, position: "relative" }}>
    <Box
      sx={{
        position: "absolute",
        top: 12,
        right: 12,
        backgroundColor: "#053d75",
        color: "#fff",
        p: 1.5,
        borderRadius: "6px"
      }}
    >
      <PeopleOutlineIcon
        sx={{
          color: "#fff",
        }}
      />
    </Box>

    <CardContent>
      <Typography variant="h5" component="div">
        Programs
      </Typography>
      <Typography color="textSecondary" sx={{ marginBottom: 1.5 }}>
        {programCount}
      </Typography>
      <Typography variant="body2">+12% This Month(fake)</Typography>
    </CardContent>
  </Card>
  );
};

export default ProgramCount;
