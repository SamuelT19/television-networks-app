import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import tmoviesLogo from "../../../public/t_movie_logo.png";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CircleIcon from "@mui/icons-material/Circle";

function AdminNav() {
  return (
    <Box sx={{ display: "flex", height: "50px",boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.2)"  }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          boxShadow: "4px 0px 0px rgba(0, 0, 0, 0.8)",
          justifyContent: "center",
          gap: "15px",
          width: "15%",
          backgroundColor: "#fff",
          zIndex: 10
        }}
      >
        <Image src={tmoviesLogo} width="30" alt="T-Movie Logo" />
        <Typography
          sx={{
            fontSize: {
              xs: 15,
              md: 25,
            },
            fontWeight: 500,
            color: "#000",
          }}
        >
          T-Movie
        </Typography>
      </Box>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#000",
          flex: 1,
        }}
      >
        <Typography sx={{ color: "#fff" }}>Dashboard</Typography>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <NotificationsNoneIcon sx={{ color: "#fff", right: 0 }} />
          <CircleIcon sx={{ color: "#fff", right: 0 }} />
        </Box>
      </Container>
    </Box>
  );
}

export default AdminNav;
