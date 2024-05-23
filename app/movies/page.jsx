import React from 'react'
import Navigate from '../_components/customer/Navigate'
import MoviesList from '../_components/customer/MoviesList'
import { Box } from '@mui/material'
import LogoBack from '../_components/customer/LogoBack'

function Movies() {
  return (
    <>
    <Box sx={{display:"flex",backgroundColor:"#121f4d"}}>
      <LogoBack />
      <Navigate/>
      <MoviesList data="movies"/>
    </Box>
    
    </>
  )
}

export default Movies