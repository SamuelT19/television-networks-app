"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Grid, useMediaQuery,useTheme } from "@mui/material";

import MovieCard from "./MovieCard";
import Header from "./Header";
import { Movie } from "@/app/context/types";
import { fetchMovies } from "./FetchMovies";
import { useProgramsContext } from "@/app/context/ProgramsContext";

interface MoviesListProps {
  data: string;
}

const MoviesList: React.FC<MoviesListProps> = ({ data }) => {
  
  const { state } = useProgramsContext();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await fetchMovies();
        if (data === "movies") {
          setMovies(moviesData);
        } else if (data === "favorites") {
          const favoriteMovies = moviesData.filter((movie: Movie) =>
            state.favorites.includes(movie.Title)
          );
          setFilteredMovies(favoriteMovies);
        } else if (data === "watchLater") {
          const watchLaterMovies = moviesData.filter((movie: Movie) =>
            state.watchLater.includes(movie.Title)
          );
          setFilteredMovies(watchLaterMovies);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchData();
  }, [data, state]);

  const convertMinutesToHours = (minutes: string) => {
    let match = minutes.match(/^(\d+)/);

    if (match) {
      let numericPart = match[1];
      let timeInMinutes = parseInt(numericPart, 10);
      if (timeInMinutes < 60) {
        return `${timeInMinutes}m`;
      }
      const hours = Math.floor(timeInMinutes / 60);
      const mins = timeInMinutes % 60;
      return `${hours}h ${mins}m`;
    } else {
      return minutes;
    }
  };

  return (
    <>
      <Container
        sx={{
          position: "relative",
          backgroundColor: "#121f4d",
          mt: 2,
          minHeight: "100vh",
          paddingTop: "50px",
          "@media (min-width:600px)": {
            width: "90%",
          },
        }}
      >
        <Header
          movies={movies}
          setFilteredMovies={setFilteredMovies}
          data={data}
        />
        {data === "movies" && (
          <Container sx={{ height: "50px" }}>
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
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "95%",
            height: "470px",
            overflowY: "auto",
            whiteSpace: "nowrap",
            padding: "10px",
            "@media (max-width:600px)": {
              minHeight: "calc(100vh - 50px)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              "@media (max-width:600px)": {
                flexDirection: "column",
                width: "80%",
                margin: "auto",
              },
            }}
          >
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.Title}
                title={movie.Title}
                length={convertMinutesToHours(movie.Runtime)}
                poster={movie.Poster}
              />
            ))}
          </Box>
        </Box>
        {isSmallScreen&& 
        <Box
          sx={{
            height: "40%",
            width: "100%",
            position: "absolute",
            bottom: 0,
            background: "linear-gradient(to top, black, transparent)",
            
          }}
        ></Box>
        }
        
      </Container>
    </>
  );
};

export default MoviesList;
