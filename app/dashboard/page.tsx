import React from "react";
import AdminNav from "../_components/admin/AdminNav";
import AdminMenu from "../_components/admin/AdminMenu";
import { Box } from "@mui/material";
import Dashboards from "../_components/admin/dashboard/Dashboards";

const Dashboard: React.FC = () => {
  return (
    <>
      <Box>
        <AdminNav title="Dashboard"/>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "15%",
            boxShadow: "10px 0px 5px -5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <AdminMenu />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Dashboards />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
