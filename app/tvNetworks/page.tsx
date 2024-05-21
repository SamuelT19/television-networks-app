import React from 'react'
import Navigate from '../_components/customer/Navigate'
import Channels from '../_components/customer/Channels'
import Poster from '../_components/customer/Poster'
import { Box, Grid } from '@mui/material'

function page() {
  return (
    <>
    <Grid container>
    <Navigate/>
    <Channels/>
    <Poster/>
    </Grid>
    </>
  )
}

export default page