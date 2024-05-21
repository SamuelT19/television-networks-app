import React from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import tmoviesLogo from "../../public/t_movie_logo.png";
import Image from "next/image";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

interface LoginProps {
  // Add any necessary props here
}

const Login: React.FC<LoginProps> = () => {
  return (
    <Container
      sx={{
        mt: 3,
        maxWidth: {
          xs: 350,
          sm: 450,
          md: 650,
          lg: 850,
          xl: 1050,
        },
        minHeight: 600
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: { xs: "column",sm: "column", md: "row" }, 
          borderRadius: 8,
          boxShadow: "0 2px 4px rgba(0, 0, 0)",
          textAlign: "center",
          minHeight: "75vh",
        }}
      >
        <Box
          sx={{
            background: "#000",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap:"20px",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: 32,
            borderBottomLeftRadius: { sm: 0, md: 32 },
            borderTopRightRadius: { xs:32, sm: 32, md: 0 },
          }}
        >
          <Image src={tmoviesLogo} width="100" alt="T-Movie Logo" />
          <Typography
            sx={{
              fontSize: {
                xs: 30,
                sm: 40,
                md: 60,
                lg: 80,
                xl: 100,
              },
              color: "#FFF",
            }}
          >
            T-Movie
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: "40px",
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            LOGIN
          </Typography>
          <TextField
            label="Phone number"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PermIdentityIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpenIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: "#007bff",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            LOGIN
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
