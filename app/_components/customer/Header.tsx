import React from "react";
import { Box, Typography, Container } from "@mui/material";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";
import { Movie } from "@/app/context/types";

interface HeaderProps {
  movies: Movie[];
  setFilteredMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  data: string;
}

function Header({ movies, setFilteredMovies, data }: HeaderProps) {
  const title = data.charAt(0).toUpperCase() + data.slice(1);
  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "75px",

        }}
      >
        <Container
          sx={{
            position: "absolute",
            top: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "50px",
            mt: 1,
            color: "white",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "20px",
              paddingRight: "50px",
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

            <SearchBar movies={movies} setFilteredMovies={setFilteredMovies} />
            <UserProfile />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Header;
