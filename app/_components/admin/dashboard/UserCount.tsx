'use client'

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axiosBase from '@/app/endPoints/axios';
import DashboardCountCard from './DashboardCountCard';

const ENDPOINT = process.env.TV_APP_BACKEND_URL || "https://tv-networks-server.onrender.com";

const socket = io(ENDPOINT);

const UserCount: React.FC = () => {
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axiosBase.get('/api/users');
        setUserCount(response.data.count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();

    socket.on('usersUpdated', fetchUserCount);

    return () => {
      socket.off('usersUpdated', fetchUserCount);
    };
  }, []);

  return (
    
  <DashboardCountCard
  title="System Users"
  value={userCount}
  change="+12% This Month"
/>
  );
};

export default UserCount;
