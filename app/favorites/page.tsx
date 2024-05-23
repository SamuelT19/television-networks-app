import React from "react";
import Navigate from "../_components/customer/Navigate";
import { Box } from "@mui/material";
import MoviesList from "../_components/customer/MoviesList";
import LogoBack from "../_components/customer/LogoBack";

function Favorites() {
  return (
    <>
      <Box sx={{ display: "flex", backgroundColor: "#121f4d" }}>
      <LogoBack />

        <Navigate />
        <MoviesList data="favorites" />
      </Box>
    </>
  );
}

export default Favorites;
