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
    width: 220,
    margin: "0 8px",
    position: "relative",
    transition: "transform 0.2s",
    overflow: "hidden",
    backgroundColor: "#2c2d4a",
    "&:hover, &:focus": {
      transform: "scale(1.05)",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(45deg, #000000, #ffffff)",
        zIndex: -1,
      },
    },
    "@media (max-width:600px)": {
      width: 140,
      margin: "0 4px",
    },
  };

  const iconStyles = {
    color: "white",
    fontSize: 50,
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
        overflowX: "auto",
        whiteSpace: "nowrap",
        scrollbarWidth: "thin",
        
        "@media (max-width:600px)": {
          bottom: "4px",
        },
      }}
    >
      {types.map((type, index) => (
        <Card key={index} sx={cardStyles}>
          <Link href={type.link} passHref>
            <CardActionArea>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100,
                    backgroundColor: "#121f4d",
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
      ))}
    </Box>
  );
}

export default Types;
