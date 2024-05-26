'use client'

import React from "react";
import AdminNav from "../_components/admin/AdminNav";
import AdminMenu from "../_components/admin/AdminMenu";
import { Box, Container } from "@mui/material";
import ChannelManagement from "../_components/admin/channels/ChannelManagement";
import { useRouter } from "next/navigation";
import { useProgramsContext } from "../context/ProgramsContext";

const Channel: React.FC = () => {

  const { state } = useProgramsContext();

  const { user } = state;

  const router = useRouter(); 

  if (!user) {
    router.push("/login");
    return null; 
  }

  return (
    <>
      <Box>
        <AdminNav title="Channels" />
      </Box>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            width: "15%",
            boxShadow: "10px 0px 5px -5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <AdminMenu />
        </Box>
        <Box sx={{ flex: 1, margin: " 10px 30px" }}>
          <ChannelManagement />
        </Box>
      </Box>
    </>
  );
};

export default Channel;
