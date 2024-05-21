"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import hboLogo from "../../../public/channels/hbo-logo.png";
import abcLogo from "../../../public/channels/abc-logo.png";
import disneyLogo from "../../../public/channels/disney-logo.png";
import foxLogo from "../../../public/channels/fox-tv-logo.png";
import cnnLogo from "../../../public/channels/cnn-logo.png";
import espnLogo from "../../../public/channels/espn-logo.jpg";
import netflixLogo from "../../../public/channels/netflix-logo.png";
import nbcLogo from "../../../public/channels/nbc-logo-w.png";
import bbcLogo from "../../../public/channels/bbc-logo.png";

const channels = [
  { name: "HBO", logo: hboLogo },
  { name: "ABC", logo: abcLogo },
  { name: "Disney", logo: disneyLogo },
  { name: "Fox", logo: foxLogo },
  { name: "CNN", logo: cnnLogo },
  { name: "ESPN", logo: espnLogo },
  { name: "Netflix", logo: netflixLogo },
  { name: "NBC", logo: nbcLogo },
  { name: "BBC", logo: bbcLogo },
];

function Channels() {
  return (
    <Box
      sx={{
        position: "sticky",
        left: "15%",
        top: 0,
        backgroundColor: "#121F4D",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "200px",
        padding: 2,
        gap: 6,
        overflowY: "scroll",
        scrollbarWidth:"none", // Enable vertical scrolling
        // boxShadow: "0px -5px 10px rgba(0, 0, 0, 0.5), 10px 0px 10px rgba(0, 0, 0, 0.5)",
        "&::before, &::after": {
          content: '""',
          position: "sticky",
          width: "100%",
          height: "20px",
          backgroundColor: "inherit",
          zIndex: 1,
        },
        "&::before": {
          top: 0,
          boxShadow: "0px -5px 10px rgba(0, 0, 0, 0.5)", // Top shadow
        },
        "&::after": {
          bottom: 0,
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)", // Bottom shadow
        },
      }}
    >
      {channels.map((channel, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            textAlign: "center",
            transition: "transform 0.3s ease-in-out", // Add transition for hover effect
            "&:hover": {
              transform: "scale(1.1)", // Scale effect on hover
            },
          }}
        >
          <Box
            sx={{
              width: "50px",
              height: "50px",
              position: "relative",
              borderRadius: "50%",
              p: 2,
              backgroundColor: "#1e3264",
            transition: "transform 0.2s ease-in-out", // Add transition for hover effect
              "&:hover": {
                transform: "scale(1.3)", // Scale effect on hover
              },
            }}
          >
            <Image
              src={channel.logo}
              layout="fill"
              objectFit="contain"
              alt={`${channel.name} logo`}
            />
          </Box>
          <Typography variant="body1" sx={{ color: "#fff" }}>
            {channel.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default Channels;
