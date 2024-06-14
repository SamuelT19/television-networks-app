// "use client";
// import React, { useState, useEffect } from "react";
// import { MaterialReactTable } from "material-react-table";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   TextField,
//   Tooltip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import { z, ZodError } from "zod";
// import axiosBase from "@/app/endPoints/axios";
// import { io } from "socket.io-client";

// const channelSchema = z.object({
//   id: z.number(),
//   name: z.string().min(1).max(20),
// });

// interface Channel {
//   id: number;
//   name: string;
// }

// const ENDPOINT = process.env.TV_APP_BACKEND_URL || "http://localhost:5000";

// const socket = io(ENDPOINT);

// const ChannelManagement = () => {
//   const [channels, setChannels] = useState<Channel[]>([]);
//   const [open, setOpen] = useState(false);
//   const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
//   const [channelName, setChannelName] = useState("");
//   const [validationError, setValidationError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchChannels = async () => {
//       try {
//         const response = await axiosBase.get("/api/channels");
//         setChannels(response.data);
//       } catch (error) {
//         console.error("Error fetching channels:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchChannels();

//     socket.on("channelsUpdated", fetchChannels);

//     return () => {
//       socket.off("channelsUpdated", fetchChannels);
//     };
//   }, []);

//   const handleOpen = (channel: Channel | null = null) => {
//     setCurrentChannel(channel);
//     setChannelName(channel ? channel.name : "");
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentChannel(null);
//     setChannelName("");
//     setValidationError(null);
//   };

//   const handleSubmit = () => {
//     const newChannel = {
//       id: currentChannel ? currentChannel.id : 0,
//       name: channelName,
//     };

//     try {
//       channelSchema.parse(newChannel);
//       if (currentChannel) {
//         axiosBase
//           .put(`/api/channels/${currentChannel.id}`, {
//             name: channelName,
//           })
//           .then(() => {
//             setChannels(
//               channels.map((ch) =>
//                 ch.id === currentChannel.id ? { ...ch, name: channelName } : ch
//               )
//             );
//             socket.emit("updateChannels");
//             handleClose();
//           });
//       } else {
//         axiosBase
//           .post("/api/channels", { name: channelName })
//           .then((response) => {
//             setChannels([...channels, response.data]);
//             socket.emit("updateChannels");
//             handleClose();
//           });
//       }
//     } catch (error) {
//       if (error instanceof ZodError) {
//         setValidationError(error.message);
//       } else {
//         console.error("Unexpected error:", error);
//       }
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Are you sure you want to delete this channel?")) {
//       try {
//         await axiosBase.delete(`/api/channels/${id}`).then(() => {
//           setChannels(channels.filter((ch) => ch.id !== id));
//           socket.emit("updateChannels");
//         });
//       } catch (error) {
//         console.error("Error deleting channel:", error);
//       }
//     }
//   };

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         overflow: "auto",
//         maxWidth: "calc(100vw - 15vw)",
//         boxShadow: "2px 2px 10px 5px rgba(0, 0, 0, 0.2)"
//       }}
//     >
//       {isLoading ? (
//         <Box>Loading...</Box>
//       ) : (
//         <>
//           <Box sx={{ position: "relative" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => handleOpen()}
//               sx={{ position: "absolute", top: 0, zIndex: 10 }}
//               startIcon={<AddIcon />}
//             >
//               Add Channel
//             </Button>
//             <MaterialReactTable
//               columns={[
//                 { accessorKey: "id", header: "ID" },
//                 { accessorKey: "name", header: "Name" },
//                 {
//                   accessorKey: "actions",
//                   header: "Actions",
//                   Cell: ({ row }) => (
//                     <>
//                       <Tooltip title="Edit">
//                         <IconButton onClick={() => handleOpen(row.original)}>
//                           <EditIcon />
//                         </IconButton>
//                       </Tooltip>

//                       <Tooltip title="Delete">
//                         <IconButton
//                           color="error"
//                           onClick={() => handleDelete(row.original.id)}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </>
//                   ),
//                 },
//               ]}
//               data={channels}
//             />
//             <Dialog open={open} onClose={handleClose} fullWidth>
//               <DialogTitle>
//                 {currentChannel ? "Edit Channel" : "Add Channel"}
//               </DialogTitle>
//               <DialogContent>
//                 <TextField
//                   label="Channel Name"
//                   value={channelName}
//                   onChange={(e) => setChannelName(e.target.value)}
//                   fullWidth
//                 />
//                 {validationError && (
//                   <p style={{ color: "red" }}>{validationError}</p>
//                 )}{" "}
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleClose}>Cancel</Button>
//                 <Button onClick={handleSubmit}>
//                   {currentChannel ? "Update" : "Add"}
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

// export default ChannelManagement;



// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   MaterialReactTable,
//   MRT_ColumnDef,
//   MRT_PaginationState,
//   MRT_SortingState,
// } from "material-react-table";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   TextField,
//   Tooltip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import { z, ZodError } from "zod";
// import axiosBase from "@/app/endPoints/axios";
// import { io } from "socket.io-client";

// const channelSchema = z.object({
//   id: z.number(),
//   name: z.string().min(1).max(20),
// });

// interface Channel {
//   id: number;
//   name: string;
// }

// const ENDPOINT =
//   process.env.TV_APP_BACKEND_URL || "https://tv-networks-server.onrender.com";

// const socket = io(ENDPOINT);

// const ChannelManagement = () => {
//   const [channels, setChannels] = useState<Channel[]>([]);
//   const [open, setOpen] = useState(false);
//   const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
//   const [channelName, setChannelName] = useState("");
//   const [validationError, setValidationError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("id");
//   const [order, setOrder] = useState<"asc" | "desc">("asc");

//   const fetchChannels = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axiosBase.get("/api/channels", {
//         params: { page, pageSize, search, sort, order },
//       });
//       setChannels(response.data.channels);
//       setTotal(response.data.total);
//     } catch (error) {
//       console.error("Error fetching channels:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChannels();
//     socket.on("channelsUpdated", fetchChannels);
//     return () => {
//       socket.off("channelsUpdated", fetchChannels);
//     };
//   }, [page, pageSize, search, sort, order]);

//   const handleOpen = (channel: Channel | null = null) => {
//     setCurrentChannel(channel);
//     setChannelName(channel ? channel.name : "");
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentChannel(null);
//     setChannelName("");
//     setValidationError(null);
//   };

//   const handleSubmit = () => {
//     const newChannel = {
//       id: currentChannel ? currentChannel.id : 0,
//       name: channelName,
//     };

//     try {
//       channelSchema.parse(newChannel);
//       if (currentChannel) {
//         axiosBase
//           .put(`/api/channels/${currentChannel.id}`, {
//             name: channelName,
//           })
//           .then(() => {
//             fetchChannels();
//             handleClose();
//           });
//       } else {
//         axiosBase
//           .post("/api/channels", { name: channelName })
//           .then((response) => {
//             fetchChannels();
//             handleClose();
//           });
//       }
//     } catch (error) {
//       if (error instanceof ZodError) {
//         setValidationError(error.message);
//       } else {
//         console.error("Unexpected error:", error);
//       }
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Are you sure you want to delete this channel?")) {
//       try {
//         await axiosBase.delete(`/api/channels/${id}`).then(() => {
//           fetchChannels();
//         });
//       } catch (error) {
//         console.error("Error deleting channel:", error);
//       }
//     }
//   };

//   const columns = useMemo<MRT_ColumnDef<Channel>[]>(
//     () => [
//       { accessorKey: "id", header: "ID" },
//       { accessorKey: "name", header: "Name" },
//       {
//         accessorKey: "actions",
//         header: "Actions",
//         Cell: ({ row }) => (
//           <>
//             <Tooltip title="Edit">
//               <IconButton onClick={() => handleOpen(row.original)}>
//                 <EditIcon />
//               </IconButton>
//             </Tooltip>

//             <Tooltip title="Delete">
//               <IconButton
//                 color="error"
//                 onClick={() => handleDelete(row.original.id)}
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </Tooltip>
//           </>
//         ),
//       },
//     ],
//     []
//   );

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         overflow: "auto",
//         maxWidth: "calc(100vw - 15vw)",
//         boxShadow: "2px 2px 10px 5px rgba(0, 0, 0, 0.2)",
//       }}
//     >
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <Box sx={{ position: "relative" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => handleOpen()}
//               sx={{ position: "absolute", top: 0, zIndex: 10 }}
//               startIcon={<AddIcon />}
//             >
//               Add Channel
//             </Button>
//             <MaterialReactTable
//               columns={columns}
//               data={channels}
//               manualPagination
//               manualSorting
//               manualFiltering
//               pageCount={Math.ceil(total / pageSize)}
//               onPaginationChange={(updaterOrValue) => {
//                 const paginationState = typeof updaterOrValue === "function" ? updaterOrValue({ pageIndex: page - 1, pageSize }) : updaterOrValue;
//                 setPage(paginationState.pageIndex + 1);
//                 setPageSize(paginationState.pageSize);
//               }}
//               onSortingChange={(updaterOrValue) => {
//                 const sortingState = typeof updaterOrValue === "function" ? updaterOrValue([{ id: sort, desc: order === "desc" }]) : updaterOrValue;
//                 setSort(sortingState[0]?.id || "id");
//                 setOrder(sortingState[0]?.desc ? "desc" : "asc");
//               }}
//               onGlobalFilterChange={(filterValue) => {
//                 setSearch(filterValue || "");
//                 setPage(1);
//               }}
//               state={{
//                 pagination: { pageIndex: page - 1, pageSize },
//                 sorting: [{ id: sort, desc: order === "desc" }],
//                 globalFilter: search,
//               }}
//             />
//             <Dialog open={open} onClose={handleClose} fullWidth>
//               <DialogTitle>
//                 {currentChannel ? "Edit Channel" : "Add Channel"}
//               </DialogTitle>
//               <DialogContent>
//                 <TextField
//                   label="Channel Name"
//                   value={channelName}
//                   onChange={(e) => setChannelName(e.target.value)}
//                   fullWidth
//                 />
//                 {validationError && (
//                   <p style={{ color: "red" }}>{validationError}</p>
//                 )}
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleClose}>Cancel</Button>
//                 <Button onClick={handleSubmit}>
//                   {currentChannel ? "Update" : "Add"}
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

// export default ChannelManagement;



// "use client";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import {
//   MaterialReactTable,
//   MRT_ColumnDef,
//   MRT_PaginationState,
//   MRT_SortingState,
// } from "material-react-table";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   TextField,
//   Tooltip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import { z, ZodError } from "zod";
// import axiosBase from "@/app/endPoints/axios";
// import { io } from "socket.io-client";

// const channelSchema = z.object({
//   id: z.number(),
//   name: z.string().min(1).max(20),
// });

// interface Channel {
//   id: number;
//   name: string;
// }

// const ENDPOINT =
//   process.env.TV_APP_BACKEND_URL || "https://tv-networks-server.onrender.com";

// const socket = io(ENDPOINT);

// const ChannelManagement = () => {
//   const [channels, setChannels] = useState<Channel[]>([]);
//   const [open, setOpen] = useState(false);
//   const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
//   const [channelName, setChannelName] = useState("");
//   const [validationError, setValidationError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("id");
//   const [order, setOrder] = useState<"asc" | "desc">("asc");

//   const fetchChannels = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await axiosBase.get("/api/channels", {
//         params: { page: page + 1, pageSize, search, sort, order },
//       });
//       setChannels(response.data.channels);
//       setTotal(response.data.total);
//     } catch (error) {
//       console.error("Error fetching channels:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [page, pageSize, search, sort, order]);

//   useEffect(() => {
//     fetchChannels();
//     socket.on("channelsUpdated", fetchChannels);
//     return () => {
//       socket.off("channelsUpdated", fetchChannels);
//     };
//   }, [fetchChannels]);

//   const handleOpen = (channel: Channel | null = null) => {
//     setCurrentChannel(channel);
//     setChannelName(channel ? channel.name : "");
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentChannel(null);
//     setChannelName("");
//     setValidationError(null);
//   };

//   const handleSubmit = () => {
//     const newChannel = {
//       id: currentChannel ? currentChannel.id : 0,
//       name: channelName,
//     };

//     try {
//       channelSchema.parse(newChannel);
//       if (currentChannel) {
//         axiosBase
//           .put(`/api/channels/${currentChannel.id}`, {
//             name: channelName,
//           })
//           .then(() => {
//             fetchChannels();
//             handleClose();
//           });
//       } else {
//         axiosBase
//           .post("/api/channels", { name: channelName })
//           .then(() => {
//             fetchChannels();
//             handleClose();
//           });
//       }
//     } catch (error) {
//       if (error instanceof ZodError) {
//         setValidationError(error.message);
//       } else {
//         console.error("Unexpected error:", error);
//       }
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Are you sure you want to delete this channel?")) {
//       try {
//         await axiosBase.delete(`/api/channels/${id}`).then(() => {
//           fetchChannels();
//         });
//       } catch (error) {
//         console.error("Error deleting channel:", error);
//       }
//     }
//   };

//   const columns = useMemo<MRT_ColumnDef<Channel>[]>(
//     () => [
//       { accessorKey: "id", header: "ID" },
//       { accessorKey: "name", header: "Name" },
//       {
//         accessorKey: "actions",
//         header: "Actions",
//         Cell: ({ row }) => (
//           <>
//             <Tooltip title="Edit">
//               <IconButton onClick={() => handleOpen(row.original)}>
//                 <EditIcon />
//               </IconButton>
//             </Tooltip>

//             <Tooltip title="Delete">
//               <IconButton
//                 color="error"
//                 onClick={() => handleDelete(row.original.id)}
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </Tooltip>
//           </>
//         ),
//       },
//     ],
//     []
//   );

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         overflow: "auto",
//         maxWidth: "calc(100vw - 15vw)",
//         boxShadow: "2px 2px 10px 5px rgba(0, 0, 0, 0.2)",
//       }}
//     >
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <Box sx={{ position: "relative" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => handleOpen()}
//               sx={{ position: "absolute", top: 0, zIndex: 10 }}
//               startIcon={<AddIcon />}
//             >
//               Add Channel
//             </Button>
//             <MaterialReactTable
//               columns={columns}
//               data={channels}
//               manualPagination
//               manualSorting
//               manualFiltering
//               pageCount={Math.ceil(total / pageSize)}
//               onPaginationChange={(updaterOrValue) => {
//                 const paginationState = typeof updaterOrValue === "function"
//                   ? updaterOrValue({ pageIndex: page, pageSize })
//                   : updaterOrValue;
//                 setPage(paginationState.pageIndex);
//                 setPageSize(paginationState.pageSize);
//               }}
//               onSortingChange={(updaterOrValue) => {
//                 const sortingState = typeof updaterOrValue === "function"
//                   ? updaterOrValue([{ id: sort, desc: order === "desc" }])
//                   : updaterOrValue;
//                 setSort(sortingState[0]?.id || "id");
//                 setOrder(sortingState[0]?.desc ? "desc" : "asc");
//               }}
//               onGlobalFilterChange={(filterValue) => {
//                 setSearch(filterValue || "");
//                 setPage(0);
//               }}
//               state={{
//                 pagination: { pageIndex: page, pageSize },
//                 sorting: [{ id: sort, desc: order === "desc" }],
//                 globalFilter: search,
//               }}
//             />
//             <Dialog open={open} onClose={handleClose} fullWidth>
//               <DialogTitle>
//                 {currentChannel ? "Edit Channel" : "Add Channel"}
//               </DialogTitle>
//               <DialogContent>
//                 <TextField
//                   label="Channel Name"
//                   value={channelName}
//                   onChange={(e) => setChannelName(e.target.value)}
//                   fullWidth
//                 />
//                 {validationError && (
//                   <p style={{ color: "red" }}>{validationError}</p>
//                 )}
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleClose}>Cancel</Button>
//                 <Button onClick={handleSubmit}>
//                   {currentChannel ? "Update" : "Add"}
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

// export default ChannelManagement;






// "use client";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import {
//   MaterialReactTable,
//   MRT_ColumnDef,
//   MRT_PaginationState,
//   MRT_SortingState,
//   MRT_TableInstance,
// } from "material-react-table";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   TextField,
//   Tooltip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import { z, ZodError } from "zod";
// import axiosBase from "@/app/endPoints/axios";
// import { io } from "socket.io-client";

// const channelSchema = z.object({
//   id: z.number(),
//   name: z.string().min(1).max(20),
// });

// interface Channel {
//   id: number;
//   name: string;
// }

// const ENDPOINT =
//   process.env.TV_APP_BACKEND_URL || "https://tv-networks-server.onrender.com";

// const socket = io(ENDPOINT);

// const ChannelManagement = () => {
//   const [channels, setChannels] = useState<Channel[]>([]);
//   const [open, setOpen] = useState(false);
//   const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
//   const [channelName, setChannelName] = useState("");
//   const [validationError, setValidationError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("id");
//   const [order, setOrder] = useState<"asc" | "desc">("asc");

//   const fetchChannels = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await axiosBase.get("/api/channels", {
//         params: { page: page + 1, pageSize, search, sort, order },
//       });
//       setChannels(response.data.channels);
//       setTotal(response.data.total);
//     } catch (error) {
//       console.error("Error fetching channels:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [page, pageSize, search, sort, order]);

//   useEffect(() => {
//     fetchChannels();
//     socket.on("channelsUpdated", fetchChannels);
//     return () => {
//       socket.off("channelsUpdated", fetchChannels);
//     };
//   }, [fetchChannels]);

//   const handleOpen = (channel: Channel | null = null) => {
//     setCurrentChannel(channel);
//     setChannelName(channel ? channel.name : "");
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentChannel(null);
//     setChannelName("");
//     setValidationError(null);
//   };

//   const handleSubmit = () => {
//     const newChannel = {
//       id: currentChannel ? currentChannel.id : 0,
//       name: channelName,
//     };

//     try {
//       channelSchema.parse(newChannel);
//       if (currentChannel) {
//         axiosBase
//           .put(`/api/channels/${currentChannel.id}`, {
//             name: channelName,
//           })
//           .then(() => {
//             fetchChannels();
//             handleClose();
//           });
//       } else {
//         axiosBase
//           .post("/api/channels", { name: channelName })
//           .then(() => {
//             fetchChannels();
//             handleClose();
//           });
//       }
//     } catch (error) {
//       if (error instanceof ZodError) {
//         setValidationError(error.message);
//       } else {
//         console.error("Unexpected error:", error);
//       }
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Are you sure you want to delete this channel?")) {
//       try {
//         await axiosBase.delete(`/api/channels/${id}`).then(() => {
//           fetchChannels();
//         });
//       } catch (error) {
//         console.error("Error deleting channel:", error);
//       }
//     }
//   };

//   const columns = useMemo<MRT_ColumnDef<Channel>[]>(
//     () => [
//       { accessorKey: "id", header: "ID" },
//       { accessorKey: "name", header: "Name" },
//       {
//         accessorKey: "actions",
//         header: "Actions",
//         Cell: ({ row }) => (
//           <>
//             <Tooltip title="Edit">
//               <IconButton onClick={() => handleOpen(row.original)}>
//                 <EditIcon />
//               </IconButton>
//             </Tooltip>

//             <Tooltip title="Delete">
//               <IconButton
//                 color="error"
//                 onClick={() => handleDelete(row.original.id)}
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </Tooltip>
//           </>
//         ),
//       },
//     ],
//     []
//   );

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         overflow: "auto",
//         maxWidth: "calc(100vw - 15vw)",
//         boxShadow: "2px 2px 10px 5px rgba(0, 0, 0, 0.2)",
//       }}
//     >
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <Box sx={{ position: "relative" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => handleOpen()}
//               sx={{ position: "absolute", top: 0, zIndex: 10 }}
//               startIcon={<AddIcon />}
//             >
//               Add Channel
//             </Button>
//             <MaterialReactTable
//               columns={columns}
//               data={channels}
//               manualPagination
//               manualSorting
//               manualFiltering
//               pageCount={Math.ceil(total / pageSize)}
//               onPaginationChange={(updaterOrValue) => {
//                 const paginationState =
//                   typeof updaterOrValue === "function"
//                     ? updaterOrValue({ pageIndex: page, pageSize })
//                     : updaterOrValue;
//                 setPage(paginationState.pageIndex);
//                 setPageSize(paginationState.pageSize);
//               }}
//               onSortingChange={(updaterOrValue) => {
//                 const sortingState =
//                   typeof updaterOrValue === "function"
//                     ? updaterOrValue([{ id: sort, desc: order === "desc" }])
//                     : updaterOrValue;
//                 if (sortingState[0]) {
//                   setSort(sortingState[0].id);
//                   setOrder(sortingState[0].desc ? "desc" : "asc");
//                 }
//               }}
//               onGlobalFilterChange={(filterValue) => {
//                 setSearch(filterValue || "");
//                 setPage(0);
//               }}
//               state={{
//                 pagination: { pageIndex: page, pageSize },
//                 sorting: [{ id: sort, desc: order === "desc" }],
//                 globalFilter: search,
//               }}
//             />
//             <Dialog open={open} onClose={handleClose} fullWidth>
//               <DialogTitle>
//                 {currentChannel ? "Edit Channel" : "Add Channel"}
//               </DialogTitle>
//               <DialogContent>
//                 <TextField
//                   label="Channel Name"
//                   value={channelName}
//                   onChange={(e) => setChannelName(e.target.value)}
//                   fullWidth
//                 />
//                 {validationError && (
//                   <p style={{ color: "red" }}>{validationError}</p>
//                 )}
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleClose}>Cancel</Button>
//                 <Button onClick={handleSubmit}>
//                   {currentChannel ? "Update" : "Add"}
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

// export default ChannelManagement;



"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_SortingState,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  MRT_ColumnFiltersState,
  useMaterialReactTable,
  MRT_FilterOption,
  MRT_ColumnFilterFnsState,
} from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  MenuItem,
  Switch,
  TextField,
  Tooltip,
  lighten,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { z, ZodError } from "zod";
import axiosBase from "@/app/endPoints/axios";
import { io } from "socket.io-client";

const channelSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(20),
  isActive: z.boolean(),
});

type Channel = {
  id: number;
  name: string;
  isActive: boolean;
};

type UserApiResponse = {
  data: {
    channels: Array<Channel>;
  };
  meta: {
    totalRowCount: number;
  };
};

interface ColumnFilterFns {
  [key: string]: MRT_FilterOption;
}

const ENDPOINT =
  process.env.TV_APP_BACKEND_URL ||
  "http://localhost:5000" ||
  "https://tv-networks-server.onrender.com";

const socket = io(ENDPOINT);

const ChannelManagement = () => {
  const [open, setOpen] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [formData, setFormData] = useState<Partial<Channel>>({});
  const [validationError, setValidationError] = useState<string | null>(null);

  // data and fetching state
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  // table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [columnFilterFns, setColumnFilterFns] = useState<MRT_ColumnFilterFnsState>({ id: "equals", name: "startsWith" });
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 });

  const fetchChannels = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        start: `${pagination.pageIndex}`,
        size: `${pagination.pageSize}`,
        filters: JSON.stringify(columnFilters ?? []),
        filtersFn: JSON.stringify(columnFilterFns ?? []),
        globalFilter: globalFilter ?? "",
        sorting: JSON.stringify(sorting ?? []),
      };
      const response = await axiosBase.get<UserApiResponse>("/api/channels", {
        params,
      });
      setChannels(response.data.data.channels);
      setRowCount(response.data.meta.totalRowCount);
    } catch (error) {
      console.error("Error fetching channels:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting]);

  useEffect(() => {
    fetchChannels();
    socket.on("channelsUpdated", fetchChannels);
    return () => {
      socket.off("channelsUpdated", fetchChannels);
    };
  }, [fetchChannels]);

  const handleOpen = (channel: Channel | null = null) => {
    setCurrentChannel(channel);
    setFormData(channel ? { ...channel } : {});
    setOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, isActive: event.target.checked });
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentChannel(null);
    setFormData({});
    setValidationError(null);
  };

  const handleSubmit = async () => {
    const newChannel = { ...formData };

    try {
      channelSchema.parse(newChannel);
      if (currentChannel) {
        await axiosBase
          .put(`/api/channels/${currentChannel.id}`, newChannel)
          .then(() => {
            fetchChannels();
            handleClose();
          });
      } else {
        await axiosBase
          .post("/api/channels", newChannel)
          .then(() => {
            fetchChannels();
            handleClose();
          });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationError(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this channel?")) {
      try {
        await axiosBase.delete(`/api/channels/${id}`).then(() => {
          fetchChannels();
        });
      } catch (error) {
        console.error("Error deleting channel:", error);
      }
    }
  };


  const handleColumnFiltersChange = useCallback(
    (updaterOrValue: any) => {
      const newFilters =
        typeof updaterOrValue === "function"
          ? updaterOrValue(columnFilters)
          : updaterOrValue;
  
      const updatedFilters = newFilters.map((filter: any) => {
        const column = columns.find(
          (col) => col.accessorKey === filter.id || col.id === filter.id
        );
        const filterFn = columnFilterFns[filter.id];
  
        let filtervariant;
        if (["id"].includes(filter.id)) {
          filtervariant = "number";
        } else {
          filtervariant = column?.filterVariant;
        }
  
        return {
          ...filter,
          type: filterFn,
          ...(filtervariant && { filtervariant }),
          ...(column?.accessorFn && { filtervariant: filtervariant || "text" }),
        };
      });
  
      setColumnFilters(updatedFilters);
    },
    [columnFilters, columnFilterFns] 
  );

  const filteringMethods = {
    numeric: [
      "equals",
      "notEquals",
      "between",
      "betweenInclusive",
      "greaterThan",
      "greaterThanOrEqual",
      "lessThan",
      "lessThanOrEqual",
    ],
    character: [
      "fuzzy",
      "contains",
      "startsWith",
      "endsWith",
      "equals",
      "notEquals",
    ],
  };

  const columns = useMemo<MRT_ColumnDef<Channel>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        filterFn: "equals",
        filterVariant: "text",
        columnFilterModeOptions: filteringMethods.numeric as MRT_FilterOption[],
      },
      {
        accessorKey: "name",
        header: "Name",
        filterFn: "startsWith",
        filterVariant: "autocomplete",
      },
      {
        header: "Status",
        accessorFn: (row) => (row.isActive ? "true" : "false"),
        id: "isActive",
        filterVariant: "checkbox",
        enableColumnFilterModes: false,
        Cell: ({ cell }) => (cell.getValue() === "true" ? "Active" : "Inactive"),
        size: 170,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: channels,
    getRowId: (row) => String(row.id),
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
    },
    enableRowActions: true,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    enableFilterMatchHighlighting: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
      enableRowPinning: true,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnFilterFnsChange: setColumnFilterFns,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount,
    state: {
      columnFilters,
      columnFilterFns,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => handleOpen(row.original)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDelete(row.original.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbar: ({ table }) => (
      <Box
        sx={(theme) => ({
          backgroundColor: lighten(theme.palette.background.default, 0.05),
          display: "flex",
          gap: "0.5rem",
          p: "8px",
          justifyContent: "space-between",
        })}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
          startIcon={<AddIcon />}
        >
          Add Channel
        </Button>
        <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <MRT_GlobalFilterTextField table={table} />
          <MRT_ToggleFiltersButton table={table} />
        </Box>
      </Box>
    ),
  });

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "auto",
        maxWidth: "calc(100vw - 15vw)",
        boxShadow: "2px 2px 10px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <MaterialReactTable table={table} />
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>
            {currentChannel ? "Edit Channel" : "Add Channel"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Channel Name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              fullWidth
            />
            {currentChannel && (
              <Box mt={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive || false}
                      onChange={handleSwitchChange}
                      color="primary"
                    />
                  }
                  label="Active"
                />
              </Box>
            )}
            {validationError && <p style={{ color: "red" }}>{validationError}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>
              {currentChannel ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ChannelManagement;

