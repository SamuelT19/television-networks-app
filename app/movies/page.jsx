import React from 'react'
import Navigate from '../_components/customer/Navigate'
import MoviesList from '../_components/customer/MoviesList'
import { Box, Grid } from '@mui/material'

function Movies() {
  return (
    <>
    <Box sx={{display:"flex",backgroundColor:"#121f4d"}}>
      <Navigate/>
    <MoviesList/>
    </Box>
    
    </>
  )
}

export default Movies