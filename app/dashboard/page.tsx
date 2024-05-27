"use client";

import React from "react";
import AdminNav from "../_components/admin/AdminNav";
import AdminMenu from "../_components/admin/AdminMenu";
import { Box } from "@mui/material";
import Dashboards from "../_components/admin/dashboard/Dashboards";
import { useRouter } from "next/navigation";
import { useProgramsContext } from "../context/ProgramsContext";

const Dashboard: React.FC = () => {
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
        <AdminNav title="Dashboard" />
      </Box>
      <Box sx={{ display: "flex" }}>
        <AdminMenu />
        <Box sx={{ flex: 1 }}>
          <Dashboards />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
