"use client";

import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GradeIcon from "@mui/icons-material/Grade";
import CastIcon from "@mui/icons-material/Cast";
import tMoviesLogo from "../../../public/t_movie_logo.png";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { ArrowBackIos } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navigate() {
  const pathname = usePathname();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(pathname);

  const iconStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#1e3264",
    color: "#fff",
    transition: "background-color 0.3s, transform 0.3s",
    "&:hover": {
      backgroundColor: "#0165FE",
      transform: "scale(1.1)",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "row" : "column",
        alignItems: "center",
        justifyContent: isSmallScreen ? "space-around" : "flex-start",
        width: isSmallScreen ? "100%" : "15%",
        backgroundColor: "#121f4d",
        minHeight: isSmallScreen ? "auto" : "100vh",
        position: isSmallScreen ? "absolute" : "relative",
        bottom: isSmallScreen ? 0 : "auto",
        padding: isSmallScreen ? "10px 0" : "0",
      }}
    >
      {pathname === "/movies" && (
        <Box sx={{ height: isSmallScreen ? "auto" : "200px", pt: "50px" }}>
          <Box sx={iconStyles}>
            <Link
              href="/tvNetworks"
              passHref
              style={{
                marginLeft: "5px",
                marginTop: "3px",
              }}
            >
              <ArrowBackIos sx={{}} />
            </Link>
          </Box>
        </Box>
      )}
      {pathname === "/tvNetworks" && (
        <Box sx={{ height: isSmallScreen ? "auto" : "200px", pt: "50px" }}>
          <Image src={tMoviesLogo} width={60} height={60} alt="T-Movie Logo" />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "row" : "column",
          gap: "25px",
          alignItems: "center",
        }}
      >
        <Box sx={iconStyles}>
          <CastIcon />
        </Box>
        <Box sx={iconStyles}>
          <GradeIcon />
        </Box>
        <Box sx={iconStyles}>
          <AccessTimeIcon />
        </Box>
      </Box>
    </Box>
  );
}

export default Navigate;
