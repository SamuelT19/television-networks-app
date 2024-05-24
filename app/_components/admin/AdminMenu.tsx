// 'use client'

// import React, { useState } from "react";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import LiveTvIcon from "@mui/icons-material/LiveTv";
// import MovieFilterIcon from "@mui/icons-material/MovieFilter";
// import { Box, Button } from "@mui/material";
// import Link from "next/link";

// function AdminMenu() {
//   const [activeButton, setActiveButton] = useState("dashboard");

//   const handleButtonClick = (buttonName) => {
//     setActiveButton(buttonName);
//   };

//   const buttonStyles = (buttonName) => ({
//     width: "100%",
//     backgroundColor: activeButton === buttonName ? "#053d75" :"inherit",
//     color: activeButton === buttonName ? "#fff" : "inherit",
//   });

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         minHeight: "calc(100vh - 50px)",
//         textAlign: "start",
//         p: 0,
//         mt: 1,
//       }}
//     >
//       <Link href="/dashboard" passHref>
//         <Button
//           onClick={() => handleButtonClick("dashboard")}
//           variant="text"
//           startIcon={<DashboardIcon />}
//           sx={buttonStyles("dashboard")}
//         >
//           Dashboard
//         </Button>
//       </Link>
//       <Link href="/channels" passHref>
//         <Button
//           onClick={() => handleButtonClick("channels")}
//           variant="text"
//           startIcon={<LiveTvIcon />}
//           sx={buttonStyles("channels")}
//         >
//           Channels
//         </Button>
//       </Link>
//       <Link href="/programs" passHref>
//         <Button
//           onClick={() => handleButtonClick("programs")}
//           variant="text"
//           startIcon={<MovieFilterIcon />}
//           sx={buttonStyles("programs")}
//         >
//           Programs
//         </Button>
//       </Link>
//     </Box>
//   );
// }

// export default AdminMenu;

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { Box, Button } from "@mui/material";
import Link from "next/link";

function AdminMenu() {

  const pathname = usePathname();

  const buttonStyles = (path:string) => ({
    width: "100%",
    backgroundColor: pathname === path ? "#053d75" : "transparent",
    color: pathname === path ? "#fff" : "inherit",
    "&:hover": {
      backgroundColor: "#869eb5",
      color: "#fff",
    },
  });

  return (
    <Box
      sx={{
        position:"fixed",
        top:50,
        left:0,
        width: "15%",

        minHeight: "calc(100vh - 50px)",
        textAlign: "start",
        p: 0,
        mt: 1,
      }}
    >
      <Link href="/dashboard" passHref>
        <Button
          variant="text"
          startIcon={<DashboardIcon />}
          sx={buttonStyles("/dashboard")}
        >
          Dashboard
        </Button>
      </Link>
      <Link href="/channels" passHref>
        <Button
          variant="text"
          startIcon={<LiveTvIcon />}
          sx={buttonStyles("/channels")}
        >
          Channels
        </Button>
      </Link>
      <Link href="/programs" passHref>
        <Button
          variant="text"
          startIcon={<MovieFilterIcon />}
          sx={buttonStyles("/programs")}
        >
          Programs
        </Button>
      </Link>
    </Box>
  );
}

export default AdminMenu;
