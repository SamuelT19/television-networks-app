import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Container,
  Avatar,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import posterM from "../../../public/movies/test-movie.jpg";
import hboLogo from "../../../public/channels/hbo-logo.png";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import avatar from "../../../public/avatar_profile.jpg";
import SearchIcon from "@mui/icons-material/Search";

import Types from "./Types";
import Image from "next/image";

function Poster() {
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const playedTime = 32 * 60 + 23;
  const totalTime = 1 * 3600 + 32 * 60 + 23;
  const progress = (playedTime / totalTime) * 100;

  const description =
    "In the small, fog-covered town of Raventhorne, strange occurrences have become a part of daily life. When a young journalist named Emily moves to the town to escape her past, she quickly finds herself entangled in its enigmatic allure. ";

  return (
    <Box
      flex={1}
      bgcolor="#121F4D"
      color="white"
      sx={{ position: "relative", minHeight: "600px" }}
    >
      <Box
        sx={{
          display: "flex",
          position: "relative",
          height: "500px",
          marginBottom: 2,
          backgroundImage: `url(${posterM.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <Container
          sx={{
            position: "absolute",
            top: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "50px",
            mt: 2,
          }}
        >
          <Image src={hboLogo} alt="hbo-logo" width="80" />
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Typography component="p" sx={{ fontSize: "14px", opacity: 0.8 }}>
              12:30PM
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", opacity: 0.8 }}>
              <WbSunnyIcon />
              <Typography variant="h6" sx={{ fontSize: "14px" }}>
                32°
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "40px",
                height: "40px",
                backgroundColor: "#5f5f61",
                borderRadius: "50%",
              }}
            >
              <SearchIcon />
            </Box>

            <Avatar alt="Remy Sharp" src={avatar.src} />
            <Box
              sx={{
                width: "50px",
                borderRadius: "50%",
                backgroundImage: `url(${avatar.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
          </Box>
        </Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: { md: "60%", sm: "80%" },
              height: "185px",
              mt: "15vh",
              ml: "2%",
              color: "seashell",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="p"
              sx={{ color: "#bdc9c8" }}
            >
              Now Playing
            </Typography>
            <Typography
              component="h3"
              variant="h4"
              sx={{ color: "#fff", fontWeight: "600", letterSpacing: "-1px" }}
            >
              Grey's Anatomy
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="p"
              sx={{ color: "#bdc9c8", lineHeight: "1.5" }}
            >
              {truncate(description, 150)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", height: "100px" }}>
            <Box
              sx={{
                width: "50%",
                height: "350px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingLeft: 1,
                paddingBottom: 1,
              }}
            >
              <Box sx={{ width: "100%", paddingX: 1, paddingBottom: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{ height: 6, borderRadius: 5 }}
                />
              </Box>

              <Box
                sx={{
                  width: "95%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  sx={{ color: "white" }}
                >
                  32:23
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  sx={{ marginLeft: "auto", color: "white" }}
                >
                  01:32:23
                </Typography>
              </Box>
            </Box>
            <Box>
              <PlayCircleOutlineIcon
                sx={{ marginLeft: 1, color: "white", fontSize: "40px", mt: -2 }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            height: "35%",
            width: "100%",
            position: "absolute",
            bottom: 0,
            background: "linear-gradient(to top, #121F4D, transparent)",
          }}
        ></Box>
      </Box>

      <Types />
    </Box>
  );
}

export default Poster;
