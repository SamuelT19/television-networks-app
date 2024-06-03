import React from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { Box } from "@mui/material";

function Types() {
  const cardStyles = {
    width: 200,
    margin: "0 8px",
    position: "relative",
    transition: "transform 0.2s",
    overflow: "hidden",
    backgroundColor: "#2c2d4a",
    
    "@media (max-width:600px)": {
      width: 140,
      margin: "0 4px",
    },
  };

  const iconStyles = {
    color: "white",
    fontSize: 50,
  };

  const bottomBoxStyles = {
    position: "absolute",
    bottom: -10, 
    left: "50%",
    transform: "translateX(-50%)",
    width: "35%",
    height: 7,
    backgroundColor: "white",
    borderRadius: 2,
    zIndex: 1,
    opacity: 0, 
    transition: "opacity 0.2s",
  };

  const types = [
    {
      name: "Live's TV",
      icon: LiveTvIcon,
      count: "+5000 Channels",
      link: "/lives-tv",
    },
    {
      name: "Movies",
      icon: LocalMoviesIcon,
      count: "+800 Movies",
      link: "/movies",
    },
    {
      name: "TV Shows",
      icon: OnlinePredictionIcon,
      count: "+1200 Series",
      link: "/tv-shows",
    },
    {
      name: "Sports",
      icon: SportsSoccerIcon,
      count: "+400 Channels",
      link: "/sports",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        bottom: 20,
        whiteSpace: "nowrap",
        scrollbarWidth: "thin",
        "@media (max-width:600px)": {
          bottom: "70px",
        },
      }}
    >
      {types.map((type, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
            display: "flex",
            flexDirection:"column",
            "&:hover, &:focus": {
              "& .bottom-box": {
                opacity: 1,
              },
              "& .card-box": {
                transform: "scale(1.05)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(45deg, rgba(0, 0, 0,0.7), rgba(255, 255, 255,0.3))",
                  zIndex: -1,
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -15, 
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 75, 
                  height: 45, 
                  background:" rgba(255, 255, 255,0.3)",
                  borderRadius: "50% 50% 0 0",
                  zIndex: 10,
                  filter: "blur(13px)", 
                },
               
              }
            },
          }}
        >
          <Card sx={cardStyles} className="card-box">
            <Link href={type.link} passHref>
              <CardActionArea>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 100,
                      backgroundColor: "#101138",
                      "@media (max-width:600px)": {
                        height: 80,
                      },
                    }}
                  >
                    <type.icon sx={iconStyles} />
                  </Box>
                  <Box
                    sx={{
                      height: 130,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      justifyContent: "center",
                      "@media (max-width:600px)": {
                        height: 80,
                      },
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{ color: "white" }}
                    >
                      {type.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      component="p"
                      sx={{ color: "#a3a4b5" }}
                    >
                      {type.count}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
          <Box sx={bottomBoxStyles} className="bottom-box" />
        </Box>
      ))}
    </Box>
  );
}

export default Types;