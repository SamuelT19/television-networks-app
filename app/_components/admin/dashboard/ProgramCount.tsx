'use client'

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axiosBase from '@/app/endPoints/axios';
import DashboardCountCard from './DashboardCountCard';

const ENDPOINT = process.env.TV_APP_BACKEND_URL || "https://tv-networks-server.onrender.com";

const socket = io(ENDPOINT);

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

    socket.on('updatePrograms', fetchProgramCount);

    return () => {
      socket.off('updatePrograms', fetchProgramCount);
    };
  }, []);

  return (
   
  <DashboardCountCard
  title="Programs"
  value={programCount}
  change="+12% This Month"
/>
  );
};

export default ProgramCount;
