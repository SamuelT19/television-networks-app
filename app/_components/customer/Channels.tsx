// "use client";

// import React, { useRef, useEffect } from "react";
// import { Box, Typography } from "@mui/material";
// import Image from "next/image";
// import hboLogo from "../../../public/channels/hbo-logo.png";
// import abcLogo from "../../../public/channels/abc-logo.png";
// import disneyLogo from "../../../public/channels/disney-logo.png";
// import foxLogo from "../../../public/channels/fox-tv-logo.png";
// import cnnLogo from "../../../public/channels/cnn-logo.png";
// import espnLogo from "../../../public/channels/espn-hd-logo.png";
// import netflixLogo from "../../../public/channels/netflixx-logo.png";
// import nbcLogo from "../../../public/channels/nbc-logo.png";
// import bbcLogo from "../../../public/channels/bbc-logo.png";

// const channels = [
//   { name: "HBO", logo: hboLogo },
//   { name: "ABC", logo: abcLogo },
//   { name: "Disney", logo: disneyLogo },
//   { name: "Fox", logo: foxLogo },
//   { name: "CNN", logo: cnnLogo },
//   { name: "ESPN", logo: espnLogo },
//   { name: "Netflix", logo: netflixLogo },
//   { name: "NBC", logo: nbcLogo },
//   { name: "BBC", logo: bbcLogo },
// ];
// function Channels() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       const container = containerRef.current;
//       if (container) {
//         const children = container.children;
//         const containerRect = container.getBoundingClientRect();

//         Array.from(children).forEach((child) => {
//           const childRect = child.getBoundingClientRect();
//           const isMiddle =
//             childRect.left >= containerRect.left + containerRect.width / 3 &&
//             childRect.right <=
//               containerRect.left + (2 * containerRect.width) / 3;
//           if (isMiddle) {
//             child.classList.add("middle");
//           } else {
//             child.classList.remove("middle");
//           }
//         });
//       }
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener("scroll", handleScroll);
//     }

//     return () => {
//       if (container) {
//         container.removeEventListener("scroll", handleScroll);
//       }
//     };
//   }, []);

//   return (
//     <Box
//       ref={containerRef}
//       sx={{
//         position: "sticky",
//         left: "15%",
//         top: 0,
//         backgroundColor: "#121F4D",
//         display: "flex",
//         flexDirection: "column",
//         height: "100vh",
//         width: "200px",
//         padding: 2,
//         gap: 6,
//         overflowY: "scroll",
//         scrollbarWidth: "none",
//         "&::before, &::after": {
//           content: '""',
//           position: "sticky",
//           width: "100%",
//           height: "20px",
//           backgroundColor: "inherit",
//           zIndex: 1,
//         },
//         "&::before": {
//           top: 0,
//           boxShadow: "0px -5px 10px rgba(0, 0, 0, 0.5)",
//         },
//         "&::after": {
//           bottom: 0,
//           boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
//         },
//         "@media (max-width:600px)": {
//           position: "absolute",
//           top: "47vh",
//           left: "4%",
//           flexDirection: "row",
//           height: "135px",
//           width: "90%",
//           zIndex: 100,
//           overflowX: "scroll",
//           gap: 4,
//         },
//       }}
//     >
//       {channels.map((channel, index) => (
//         <Box
//           key={index}
//           className="channel-box"
//           sx={{
//             display: "flex",
//             justifyContent: "space-evenly",
//             alignItems: "center",
//             textAlign: "center",
//             transition: "transform 0.3s ease-in-out",
//             "&:hover": {
//               transform: "scale(1.1)",
//             },
//             "@media (max-width:600px)": {
//               flexDirection: "column",
//             },
//             "&.middle": {
//               transform: "scale(1.3)",
//             },
//           }}
//         >
//           <Box
//             sx={{
//               width: "50px",
//               height: "50px",
//               position: "relative",
//               borderRadius: "50%",
//               p: 2,
//               backgroundColor: "#1e3264",
//               transition: "transform 0.2s ease-in-out",
//               "&:hover": {
//                 transform: "scale(1.3)",
//                 border: "2px solid #121F4D",
//                 // padding: "10px",
//               },
//               "&::after": {
//                 content: '""',
//                 position: "absolute",
//                 top: "-10px",
//                 left: "-10px",
//                 width: "calc(100% + 40px)",
//                 height: "calc(100% + 40px)",
//                 borderRadius: "50%",
//                 border: "2px solid rgba(255, 255, 255, 0.5)",
//               },
//             }}
//           >
//             <Image
//               src={channel.logo}
//               alt={`${channel.name} logo`}
//               style={{
//                 position: "absolute",
//                 inset: "5px",
//                 color: "transparent",
//                 height: "80%",
//                 width: "80%",
//                 objectFit: "contain",
//                 transition: "all 0.2s ease-in-out",
//               }}
//             />
//           </Box>

//           <Typography variant="body1" sx={{ color: "#fff" }}>
//             {channel.name}
//           </Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// }

// export default Channels;

"use client";

import React, { useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import hboLogo from "../../../public/channels/hbo-logo.png";
import abcLogo from "../../../public/channels/abc-logo.png";
import disneyLogo from "../../../public/channels/disney-logo.png";
import foxLogo from "../../../public/channels/fox-tv-logo.png";
import cnnLogo from "../../../public/channels/cnn-logo.png";
import espnLogo from "../../../public/channels/espn-hd-logo.png";
import netflixLogo from "../../../public/channels/netflixx-logo.png";
import nbcLogo from "../../../public/channels/nbc-logo.png";
import bbcLogo from "../../../public/channels/bbc-logo.png";

const channels = [
  { name: "HBO", logo: hboLogo },
  { name: "ABC", logo: abcLogo },
  { name: "Disney", logo: disneyLogo },
  { name: "Fox", logo: foxLogo },
  { name: "CNN", logo: cnnLogo },
  { name: "ESPN", logo: espnLogo },
  { name: "Netflix", logo: netflixLogo },
  { name: "NBC", logo: nbcLogo },
  { name: "BBC", logo: bbcLogo },
];

function Channels() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const children = container.children;
        const containerRect = container.getBoundingClientRect();

        Array.from(children).forEach((child) => {
          const childRect = child.getBoundingClientRect();
          const isMiddle =
            childRect.left >= containerRect.left + containerRect.width / 3 &&
            childRect.right <=
              containerRect.left + (2 * containerRect.width) / 3;
          if (isMiddle) {
            child.classList.add("middle");
          } else {
            child.classList.remove("middle");
          }
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "sticky",
        left: "10%",
        top: 0,
        backgroundColor: "#121F4D",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "220px",
        // padding: 2,
        gap: 6,
        overflowY: "scroll",
        scrollbarWidth: "none",
        "&::before, &::after": {
          content: '""',
          position: "sticky",
          width: "100%",
          height: "20px",
          backgroundColor: "inherit",
          zIndex: 1,
        },
        "&::before": {
          top: 0,
          boxShadow: "0px -5px 10px rgba(0, 0, 0, 0.5)",
        },
        "&::after": {
          bottom: 0,
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
        },
        "@media (max-width:600px)": {
          position: "absolute",
          top: "47vh",
          left: "4%",
          flexDirection: "row",
          height: "135px",
          width: "90%",
          zIndex: 100,
          overflowX: "scroll",
          gap: 4,
        },
      }}
    >
      {channels.map((channel, index) => (
        <Box
          key={index}
          className="channel-box"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            transition: "transform 0.3s ease-in-out",
            // paddingInline: "30px",
            gap: "20px",
            "@media (max-width:600px)": {
              flexDirection: "column",
            },
            "&.middle": {
              transform: "scale(1.3)",
            },

            "&:hover": {
              transform: "scale(1.3) translateX(10px)",
              "& .inner-box::after": {
                content: '""',
                position: "absolute",
                top: "-12px",
                left: "-11px",
                width: "calc(100% + 17px)",
                height: "calc(100% + 17px)",
                borderRadius: "50%",
                border: "3px solid rgba(255, 255, 255, 0.5)",
              },
            },
          }}
        >
          <Box
            className="inner-box"
            sx={{
              width: "50px",
              height: "50px",
              position: "relative",
              borderRadius: "50%",
              backgroundColor: "#1e3264",
              transition:
                "transform 0.2s ease-in-out, border 0.2s ease-in-out, padding 0.2s ease-in-out",
            }}
          >
            <Image
              src={channel.logo}
              alt={`${channel.name} logo`}
              style={{
                position: "absolute",
                inset: "5px",
                color: "transparent",
                height: "80%",
                width: "80%",
                objectFit: "contain",
                transition: "all 0.2s ease-in-out",
              }}
            />
          </Box>

          <Typography variant="body1" sx={{ color: "#fff" }}>
            {channel.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default Channels;
