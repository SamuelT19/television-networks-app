"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axiosBase from "@/app/endPoints/axios";
import DashboardCountCard from "./DashboardCountCard";

const ENDPOINT = process.env.TV_APP_BACKEND_URL || "https://tv-networks-server.onrender.com";

const socket = io(ENDPOINT);

const ChannelCount: React.FC = () => {
  const [channelCount, setChannelCount] = useState<number>(0);

  useEffect(() => {
    const fetchChannelCount = async () => {
      try {
        const response = await axiosBase.get("/api/channels/count");
        setChannelCount(response.data.count);
      } catch (error) {
        console.error("Error fetching channel count:", error);
      }
    };

    fetchChannelCount();

    socket.on("channelsUpdated", fetchChannelCount);

    return () => {
      socket.off("channelsUpdated", fetchChannelCount);
    };
  }, []);

  return (
    <DashboardCountCard
      title="Channels"
      value={channelCount}
      change="+12% This Month"
    />
  );
};

export default ChannelCount;
