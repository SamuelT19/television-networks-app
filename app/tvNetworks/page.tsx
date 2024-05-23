import React from "react";
import Navigate from "../_components/customer/Navigate";
import Channels from "../_components/customer/Channels";
import Poster from "../_components/customer/Poster";
import {Grid } from "@mui/material";
import LogoBack from "../_components/customer/LogoBack";

function page() {
  return (
    <>
      <Grid container>
      <LogoBack />

        <Navigate />
        <Channels />
        <Poster />
      </Grid>
    </>
  );
}

export default page;
