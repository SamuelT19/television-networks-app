import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import {
  Favorite,
  WatchLater,
  PlayCircle,
  FavoriteBorder,
  AccessTime,
} from "@mui/icons-material";
import { useProgramsContext } from "@/app/context/ProgramsContext";

interface MovieCardProps {
  title: string;
  length: string;
  poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, length, poster }) => {
  const { state, dispatch } = useProgramsContext();
  const isFavorite = state.favorites.includes(title);
  const isWatchLater = state.watchLater.includes(title);

  const handleFavoriteClick = () => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: title });
  };

  const handleWatchLaterClick = () => {
    dispatch({ type: "TOGGLE_WATCH_LATER", payload: title });
  };

  return (
    <Card
      sx={{
        width: 260,
        position: "relative",
        margin: "16px",
        display: "inline-block",
        "&:hover .MuiCardMedia-root": {
          filter: "brightness(0.8)",
        },
        "@media (max-width: 600px)": {
          position: "relative",
          width: "100%",
        },
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "250px",
        }}
      >
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "4px 8px",
            borderRadius: 1,
            color: "white",
          }}
        >
          {length}
        </Typography>
      </Box>
      <CardContent>
        <Typography variant="h6" component="div" fontWeight="600">
          {title}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "0 0 4px 4x",
          "@media (max-width: 600px)": {
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "80px",
            flexDirection: "column",
            justifyContent: "center",
          },
        }}
      >
        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
          {isFavorite ? (
            <Favorite color="error" />
          ) : (
            <FavoriteBorder sx={{ color: "white" }} />
          )}
        </IconButton>
        <IconButton aria-label="watch later" onClick={handleWatchLaterClick}>
          {isWatchLater ? (
            <WatchLater color={isWatchLater ? "primary" : "inherit"} />
          ) : (
            <AccessTime sx={{ color: "white" }} />
          )}
        </IconButton>
        <IconButton aria-label="play">
          <PlayCircle />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
