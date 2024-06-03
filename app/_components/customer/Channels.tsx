"use client";

import React, { useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import hboLogo from "../../../public/channels/hbo-logo.png";
import abcLogo from "../../../public/channels/abc-logo.png";
import disneyLogo from "../../../public/channels/disney-logo.png";
import foxLogo from "../../../public/channels/fox-tv-logo.png";
import cnnLogo from "../../../public/channels/cnn-logo.png";
import espnLogo from "../../../public/channels/espn-hd-logo.png";
import netflixLogo from "../../../public/channels/netflixx-logo.png";
import nbcLogo from "../../../public/channels/nbc-logo.png";
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const children = container.children;
        const containerRect = container.getBoundingClientRect();

        Array.from(children).forEach((child) => {
          const childRect = child.getBoundingClientRect();
          const isMiddle =
            childRect.left >= containerRect.left + containerRect.width / 3 &&
            childRect.right <=
              containerRect.left + (2 * containerRect.width) / 3;
          if (isMiddle) {
            child.classList.add("middle");
          } else {
            child.classList.remove("middle");
          }
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "sticky",
        left: "10%",
        top: 0,
        backgroundColor: "#121F4D",
        height: "100vh",
        width: "220px",
        padding: 2,
        overflowY: "scroll",
        scrollbarWidth: "none",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50px",
          background: "linear-gradient(to bottom, #121F4D, transparent)",
          zIndex: 1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50px",
          background: "linear-gradient(to top, #121F4D, transparent)",
          zIndex: 1,
        },
        "@media (max-width:600px)": {
          position: "absolute",
          top: "47vh",
          left: "4%",
          flexDirection: "row",
          height: "165px",
          width: "90%",
          zIndex: 100,
          overflowX: "scroll",
          overflowY: "hidden",
          display: "flex",
          gap: 4,
          "&::before, &::after": {
            display: "none",
          },
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          paddingBlock: "50px",
          gap: 6,
          "@media (max-width:600px)": {
            flexDirection: "row",
            paddingBlock: "0",
            gap: 4,
            alignItems: "center",
          },
        }}
      >
        {channels.map((channel, index) => (
          <Box
            key={index}
            className="channel-box"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "center",
              transition: "transform 0.3s ease-in-out",
              gap: "20px",
              "@media (max-width:600px)": {
                flexDirection: "column",
                justifyContent: "center",
                width: "80px",
              },
              "&.middle": {
                transform: "scale(1.3)",
              },
              "&:hover": {
                transform: "scale(1.3) translateX(30px)",
                "@media (max-width:600px)": {
                  transform: "scale(1.3)",
                },
                "& .inner-box::after": {
                  content: '""',
                  position: "absolute",
                  top: "-12px",
                  left: "-11px",
                  width: "calc(100% + 17px)",
                  height: "calc(100% + 17px)",
                  borderRadius: "50%",
                  border: "3px solid rgba(255, 255, 255, 0.5)",
                },
              },
            }}
          >
            <Box
              className="inner-box"
              sx={{
                width: "50px",
                height: "50px",
                position: "relative",
                borderRadius: "50%",
                backgroundColor: "#1e3264",
                transition:
                  "transform 0.2s ease-in-out, border 0.2s ease-in-out, padding 0.2s ease-in-out",
              }}
            >
              <Image
                src={channel.logo}
                alt={`${channel.name} logo`}
                style={{
                  position: "absolute",
                  inset: "5px",
                  color: "transparent",
                  height: "80%",
                  width: "80%",
                  objectFit: "contain",
                  transition: "all 0.2s ease-in-out",
                }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                "@media (max-width:600px)": {
                  fontSize: "0.8rem",
                },
              }}
            >
              {channel.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Channels;
