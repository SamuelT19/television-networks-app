"use client";

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
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\+[0-9]{9,}$/i, "Invalid phone number format")
    .min(10, "Phone number must be at least 10 digits long")
    .max(15, "Phone number must be at most 15 digits long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = (data: any) => {
    router.push("/dashboard");
  };
  const onClick = () => {
    router.push("/tvNetworks");
  };

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
        height: 700,
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
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
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: 32,
            borderBottomLeftRadius: { sm: 0, md: 32 },
            borderTopRightRadius: { xs: 32, sm: 32, md: 0 },
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
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: "40px",
            marginBlock: { xs: "40px" },
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            LOGIN
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone number"
                  variant="outlined"
                  placeholder="+0123456789"
                  fullWidth
                  margin="normal"
                  error={!!errors.phoneNumber}
                  helperText={String(errors.phoneNumber?.message)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermIdentityIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  placeholder="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={String(errors.phoneNumber?.message)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpenIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Button
              type="submit"
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
          </form>

          <Box
            sx={{
              display: "inline-block",
              color: "white",
              marginTop: "50px",
              bottom: 10,
              right: 45,
              backgroundColor: "#3c3e42",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#252b2b",
              },
            }}
          >
            <Button
              onClick={onClick}
              sx={{
                color: "white",
               
              }}
            >
              for customer
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
