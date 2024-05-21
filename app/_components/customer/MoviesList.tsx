import React from "react";
import { Box, Typography, Container, Avatar, Grid } from "@mui/material";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import avatar from "../../../public/avatar_profile.jpg";
import SearchIcon from "@mui/icons-material/Search";

function MoviesList() {
 
  return (
    <>
      <Container
        sx={{ position: "relative", backgroundColor: "#121f4d", mt: 4 }}
      >
        <Box>
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
              color: "white",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Movies
            </Typography>

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
        </Box>
        <Container sx={{ height: "50px", marginTop: "80px" }}>
  <Grid container gap="40px" color="white" mb={1}>
    {["Recommended", "Popular", "Featured"].map((text) => (
      <Typography
        key={text}
        variant="h3"
        sx={{
          fontSize: "1rem",
          fontWeight: 500,
          opacity: 0.8,
          "&:hover": {
            opacity: 1,
            transform: "scale(1.1)",
            transition: "all 0.3s ease",
          },
        }}
      >
        {text}
      </Typography>
    ))}
  </Grid>
  <hr />
</Container>
        <Box></Box>
      </Container>
    </>
  );
}

export default MoviesList;
