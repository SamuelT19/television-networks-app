import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Input,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import IosShareIcon from "@mui/icons-material/IosShare";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ProgramCount from "./ProgramCount";
import ChannelCount from "./ChannelCount";
import ProgramCategoryPieChart from "./ProgramCategoryPieChart";
import ProgramTypeLineChart from "./ProgramTypeLineChart";

interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
}) => {
  return (
    <Card sx={{ marginBottom: 2, boxShadow: 3, position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          backgroundColor: "#053d75",
          color: "#fff",
          p: 1.5,
          borderRadius: "6px",
        }}
      >
        <PeopleOutlineIcon
          sx={{
            color: "#fff",
          }}
        />
      </Box>

      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography color="textSecondary" sx={{ marginBottom: 1.5 }}>
          {value}
        </Typography>
        <Typography variant="body2">{change}</Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        mt: 10,
        ml: "auto",
        mr: "auto",
        borderRadius: "5px",
        p: 4,
        pt: 2,
        boxShadow: "4px 4px 5px 4px rgba(0, 0, 0, 0.2)",
        width: "95%",
      }}
    >
      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <Grid item xs={12} md={6}>
          <Input
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{
              width: "100%",
              backgroundColor: "#c9d2dbb0",
              opacity: 1,
            }}
          />
        </Grid>
        <Grid item>
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              gap: "3px",
              fontSize: "14px",
            }}
          >
            <IosShareIcon sx={{ fontSize: "20px" }} />
            Export
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              gap: "3px",
              fontSize: "14px",
            }}
          >
            <FilterListIcon sx={{ fontSize: "20px" }} />
            Add Filter
          </Box>
        </Grid>

        <Grid item sx={{ fontSize: "10px" }}>
          <Button variant="contained" sx={{ backgroundColor: "#053d75" }}>
            Add Filter
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            title="System User"
            value="37"
            change="+12% This Month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ProgramCount />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ChannelCount />
        </Grid>

      </Grid>
      <ProgramCategoryPieChart />
      <ProgramTypeLineChart/>
    </Box>
  );
};

export default Dashboard;
