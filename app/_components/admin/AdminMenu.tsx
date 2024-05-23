import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { Box, Button, Container } from "@mui/material";
import Link from "next/link";

function AdminMenu() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 50px)",
        textAlign: "start",
        p: 0,
        mt: 1,
      }}
    >
      <Link href="/dashboard" style={{ width: "100%" }} passHref>
        <Button
          variant="text"
          startIcon={<DashboardIcon />}
          sx={{
            width: "100%",
            "&:hover": {
              backgroundColor:"#053d75",
              color: "#fff",
              variant: "contained",
            },
          }}
        >
          Dashboard
        </Button>
      </Link>
      <Link href="/channels" style={{ width: "100%" }}>
        <Button
          variant="text"
          startIcon={<LiveTvIcon />}
          sx={{
            width: "inherit",
            "&:hover": {
              backgroundColor:"#053d75",
              color: "#fff",
              variant: "contained",
            },
          }}
        >
          Channels
        </Button>
      </Link>
      <Link href="/programs" style={{ width: "100%" }}>
        <Button
          variant="text"
          startIcon={<MovieFilterIcon />}
          sx={{
            width: "inherit",
            "&:hover": {
              backgroundColor:"#053d75",
              color: "#fff",
              variant: "contained",
            },
          }}
        >
          Programs
        </Button>
      </Link>
    </Box>
  );
}

export default AdminMenu;
