// "use client";

// import React, { useEffect, useState, useMemo } from "react";
// import {
//   MaterialReactTable,
//   MRT_ColumnDef,
//   MRT_Row,
// } from "material-react-table";
// import {
//   Box,
//   Button,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";
// import { Program, validateProgram } from "./programType";

// const ProgramManagement = () => {
//   const [programs, setPrograms] = useState<Program[]>([]);
//   const [validationErrors, setValidationErrors] = useState<
//     Record<string, string | undefined>
//   >({});
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   // Fetch programs
//   useEffect(() => {
//     const fetchPrograms = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/programs");
//         setPrograms(response.data);
//       } catch (error) {
//         console.error("Error fetching programs:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchPrograms();
//   }, []);

//   // Save program
//   const saveProgram = async (program: Program, isNew: boolean) => {
//     try {
//       if (isNew) {
//         const response = await axios.post(
//           "http://localhost:5000/api/programs",
//           program
//         );
//         setPrograms((prev) => [...prev, response.data]);
//       } else {
//         const response = await axios.put(
//           `http://localhost:5000/api/programs/${program.id}`,
//           program
//         );
//         setPrograms((prev) =>
//           prev.map((p) => (p.id === program.id ? response.data : p))
//         );
//       }
//     } catch (error) {
//       console.error("Error saving program:", error);
//     }
//   };

//   // Delete program
//   const deleteProgram = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/programs/${id}`);
//       setPrograms((prev) => prev.filter((p) => p.id !== id));
//     } catch (error) {
//       console.error("Error deleting program:", error);
//     }
//   };

//   const columns = useMemo<MRT_ColumnDef<Program>[]>(
//     () => [
//       { accessorKey: "id", header: "Id", enableEditing: false, size: 80 },
//       {
//         accessorKey: "title",
//         header: "Title",
//         muiEditTextFieldProps: {
//           required: true,
//           error: !!validationErrors?.title,
//           helperText: validationErrors?.title,
//           onFocus: () =>
//             setValidationErrors((prev) => ({ ...prev, title: undefined })),
//         },
//       },
//       {
//         accessorKey: "duration",
//         header: "Duration",
//         muiEditTextFieldProps: {
//           type: "number",
//           required: true,
//           error: !!validationErrors?.duration,
//           helperText: validationErrors?.duration,
//           onFocus: () =>
//             setValidationErrors((prev) => ({ ...prev, duration: undefined })),
//         },
//       },
//       {
//         accessorKey: "description",
//         header: "Description",
//         muiEditTextFieldProps: {
//           required: true,
//           error: !!validationErrors?.description,
//           helperText: validationErrors?.description,
//           onFocus: () =>
//             setValidationErrors((prev) => ({
//               ...prev,
//               description: undefined,
//             })),
//         },
//       },
//       {
//         accessorKey: "channelId",
//         header: "Channel ID",
//         muiEditTextFieldProps: {
//           required: true,
//           error: !!validationErrors?.channelId,
//           helperText: validationErrors?.channelId,
//           onFocus: () =>
//             setValidationErrors((prev) => ({ ...prev, channelId: undefined })),
//         },
//       },
//       {
//         accessorKey: "typeId",
//         header: "Type ID",
//         muiEditTextFieldProps: {
//           required: true,
//           error: !!validationErrors?.typeId,
//           helperText: validationErrors?.typeId,
//           onFocus: () =>
//             setValidationErrors((prev) => ({ ...prev, typeId: undefined })),
//         },
//       },
//       {
//         accessorKey: "categoryId",
//         header: "Category ID",
//         muiEditTextFieldProps: {
//           required: true,
//           error: !!validationErrors?.categoryId,
//           helperText: validationErrors?.categoryId,
//           onFocus: () =>
//             setValidationErrors((prev) => ({
//               ...prev,
//               categoryId: undefined,
//             })),
//         },
//       },
//     ],
//     [validationErrors]
//   );

//   const handleSaveRow = async ({
//     exitEditingMode,
//     row,
//     values,
//   }: MRT_Row<Program>) => {
//     const errors = validateProgram(values);
//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }

//     await saveProgram(values as Program, row.isNew);
//     exitEditingMode(); // Required to exit editing mode and close modal
//   };

//   const handleDeleteRow = (row: MRT_Row<Program>) => {
//     deleteProgram(row.original.id);
//   };

//   return (
//     <Box>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <MaterialReactTable
//           columns={columns}
//           data={programs}
//           editingMode="modal"
//           enableEditing
//           onEditingRowSave={handleSaveRow}
//           renderRowActions={({ row, table }) => (
//             <Box sx={{ display: "flex", gap: "1rem" }}>
//               <Tooltip arrow placement="left" title="Edit">
//                 <IconButton onClick={() => table.setEditingRow(row)}>
//                   <EditIcon />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip arrow placement="right" title="Delete">
//                 <IconButton color="error" onClick={() => handleDeleteRow(row)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           )}
//         />
//       )}
//     </Box>
//   );
// };

// export default ProgramManagement;

"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Program, validateProgram } from "./programType";

const ProgramManagement = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [channels, setChannels] = useState<{ id: number; name: string }[]>([]);
  const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/programs");
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/channels");
        setChannels(response.data);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };
    fetchChannels();
  }, []);

  useEffect(() => {
    setTypes([
      { id: 1, name: "Live TV" },
      { id: 2, name: "Movies" },
      { id: 3, name: "TV Shows" },
      { id: 4, name: "Sports" },
    ]);

    setCategories([
      { id: 1, name: "Recommended" },
      { id: 2, name: "Popular" },
      { id: 3, name: "Featured" },
      { id: 4, name: "Favorites" },
      { id: 5, name: "Watch Later" },
    ]);
  }, []);

  const saveProgram = async (program: Program, isNew: boolean) => {
    try {
      if (isNew) {
        const response = await axios.post(
          "http://localhost:5000/api/programs",
          program
        );
        setPrograms((prev) => [...prev, response.data]);
      } else {
        const response = await axios.put(
          `http://localhost:5000/api/programs/${program.id}`,
          program
        );
        setPrograms((prev) =>
          prev.map((p) => (p.id === program.id ? response.data : p))
        );
      }
    } catch (error) {
      console.error("Error saving program:", error);
    }
  };

  const deleteProgram = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/programs/${id}`);
      setPrograms((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  const handleEditClick = (program: Program) => {
    setEditingProgram(program);
    setIsDialogOpen(true);
  };

  const handleCreateClick = () => {
    setEditingProgram(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setValidationErrors({});
  };

  const handleSaveClick = () => {
    if (editingProgram) {
      const validation = validateProgram(editingProgram);
      if (Object.keys(validation).length > 0) {
        setValidationErrors(validation);
      } else {
        saveProgram(editingProgram, !editingProgram.id);
        handleDialogClose();
      }
    }
  };

  const columns = useMemo<MRT_ColumnDef<Program>[]>(
    () => [
      { accessorKey: "id", header: "Id", enableEditing: false },
      {
        accessorKey: "title",
        header: "Title",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.title,
          helperText: validationErrors?.title,
          onFocus: () =>
            setValidationErrors((prev) => ({ ...prev, title: undefined })),
        },
      },
      {
        accessorKey: "duration",
        header: "Duration",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.duration,
          helperText: validationErrors?.duration,
          onFocus: () =>
            setValidationErrors((prev) => ({ ...prev, duration: undefined })),
        },
      },
      {
        accessorKey: "channelId",
        header: "Channel",
        Cell: ({ cell }) =>
          channels.find((channel) => channel.id === cell.getValue())?.name ??
          "",
        muiEditTextFieldProps: {
          select: true,
          children: channels.map((channel) => (
            <MenuItem key={channel.id} value={channel.id}>
              {channel.name}
            </MenuItem>
          )),
        },
      },
      {
        accessorKey: "typeId",
        header: "Type",
        Cell: ({ cell }) =>
          types.find((type) => type.id === cell.getValue())?.name ?? "",
        muiEditTextFieldProps: {
          select: true,
          children: types.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          )),
        },
      },
      {
        accessorKey: "categoryId",
        header: "Category",
        Cell: ({ cell }) =>
          categories.find((category) => category.id === cell.getValue())
            ?.name ?? "",
        muiEditTextFieldProps: {
          select: true,
          children: categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          )),
        },
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <Box display="flex" justifyContent="center">
            <Tooltip title="Edit">
              <IconButton onClick={() => handleEditClick(row.original)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => deleteProgram(row.original.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [channels, types, categories, validationErrors]
  );

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
        >
          Add Program
        </Button>
      </Box>
      <MaterialReactTable
        columns={columns}
        data={programs}
        isLoading={isLoading}
        enableEditing
      />
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {editingProgram ? "Edit Program" : "Create Program"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={editingProgram?.title || ""}
            onChange={(e) =>
              setEditingProgram((prev) =>
                prev ? { ...prev, title: e.target.value } : null
              )
            }
            fullWidth
            margin="dense"
            error={!!validationErrors?.title}
            helperText={validationErrors?.title}
          />
          <TextField
            label="Duration"
            type="number"
            value={editingProgram?.duration || ""}
            onChange={(e) =>
              setEditingProgram((prev) =>
                prev
                  ? { ...prev, duration: parseInt(e.target.value, 10) }
                  : null
              )
            }
            fullWidth
            margin="dense"
            error={!!validationErrors?.duration}
            helperText={validationErrors?.duration}
          />
          <Select
            label="Channel"
            value={editingProgram?.channelId || ""}
            onChange={(e) =>
              setEditingProgram((prev) =>
                prev
                  ? { ...prev, channelId: parseInt(e.target.value, 10) }
                  : null
              )
            }
            fullWidth
            margin="dense"
            error={!!validationErrors?.channelId}
          >
            {channels.map((channel) => (
              <MenuItem key={channel.id} value={channel.id}>
                {channel.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            label="Type"
            value={editingProgram?.typeId || ""}
            onChange={(e) =>
              setEditingProgram((prev) =>
                prev ? { ...prev, typeId: parseInt(e.target.value, 10) } : null
              )
            }
            fullWidth
            margin="dense"
            error={!!validationErrors?.typeId}
          >
            {types.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            label="Category"
            value={editingProgram?.categoryId || ""}
            onChange={(e) =>
              setEditingProgram((prev) =>
                prev
                  ? { ...prev, categoryId: parseInt(e.target.value, 10) }
                  : null
              )
            }
            fullWidth
            margin="dense"
            error={!!validationErrors?.categoryId}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveClick} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProgramManagement;




// "use client";

// import React, { useEffect, useState, useMemo } from "react";
// import {
//   MaterialReactTable,
//   MRT_ColumnDef,
//   MRT_Row,
// } from "material-react-table";
// import {
//   Box,
//   Button,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   MenuItem,
//   Select,
//   Tooltip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";
// import { Program, validateProgram } from "./programType";

// const ProgramManagement = () => {
//   const [programs, setPrograms] = useState<Program[]>([]);
//   const [channels, setChannels] = useState<{ id: number; name: string }[]>([]);
//   const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
//   const [categories, setCategories] = useState<{ id: number; name: string }[]>(
//     []
//   );
//   const [validationErrors, setValidationErrors] = useState<
//     Record<string, string | undefined>
//   >({});
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchPrograms = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/programs");
//         setPrograms(response.data);
//       } catch (error) {
//         console.error("Error fetching programs:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchPrograms();
//   }, []);

//   useEffect(() => {
//     const fetchChannels = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/channels");
//         setChannels(response.data);
//       } catch (error) {
//         console.error("Error fetching channels:", error);
//       }
//     };
//     fetchChannels();
//   }, []);

//   useEffect(() => {
//     setTypes([
//       { id: 1, name: "Live TV" },
//       { id: 2, name: "Movies" },
//       { id: 3, name: "TV Shows" },
//       { id: 4, name: "Sports" },
//     ]);

//     setCategories([
//       { id: 1, name: "Recommended" },
//       { id: 2, name: "Popular" },
//       { id: 3, name: "Featured" },
//       { id: 4, name: "Favorites" },
//       { id: 5, name: "Watch Later" },
//     ]);
//   }, []);

//   const saveProgram = async (program: Program, isNew: boolean) => {
//     try {
//       if (isNew) {
//         const response = await axios.post(
//           "http://localhost:5000/api/programs",
//           program
//         );
//         setPrograms((prev) => [...prev, response.data]);
//       } else {
//         const response = await axios.put(
//           `http://localhost:5000/api/programs/${program.id}`,
//           program
//         );
//         setPrograms((prev) =>
//           prev.map((p) => (p.id === program.id ? response.data : p))
//         );
//       }
//     } catch (error) {
//       console.error("Error saving program:", error);
//     }
//   };

//   const deleteProgram = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/programs/${id}`);
//       setPrograms((prev) => prev.filter((p) => p.id !== id));
//     } catch (error) {
//       console.error("Error deleting program:", error);
//     }
//   };

//   const columns = useMemo<MRT_ColumnDef<Program>[]>(
//     () => [
//       { accessorKey: "id", header: "Id", enableEditing: false, size: 80 },
//       {
//         accessorKey: "title",
//         header: "Title",
//         muiEditTextFieldProps: {
//           required: true,
//           error: !!validationErrors?.title,
//           helperText: validationErrors?.title,
//           onFocus: () =>
//             setValidationErrors((prev) => ({ ...prev, title: undefined })),
//         },
//       },
//       {
//         accessorKey: "duration",
//         header: "Duration",
//         muiEditTextFieldProps: {
//           type: "number",
//           required: true,
//           error: !!validationErrors?.duration,
//           helperText: validationErrors?.duration,
//           onFocus: () =>
//             setValidationErrors((prev) => ({ ...prev, duration: undefined })),
//         },
//       },
//       {
//         accessorKey: "description",
//         header: "Description",
//         muiEditTextFieldProps: {
//           required: true,
//           error: !!validationErrors?.description,
//           helperText: validationErrors?.description,
//           onFocus: () =>
//             setValidationErrors((prev) => ({
//               ...prev,
//               description: undefined,
//             })),
//         },
//       },
//       {
//         accessorKey: "channelId",
//         header: "Channel",
//         Cell: ({ cell }) => {
//           const channel = channels.find(
//             (ch) => ch.id === cell.getValue<number>()
//           );
//           return channel ? channel.name : "";
//         },
//         muiEditTextFieldProps: {
//           select: true,
//           children: channels.map((channel) => (
//             <MenuItem key={channel.id} value={channel.id}>
//               {channel.name}
//             </MenuItem>
//           )),
//           error: !!validationErrors?.channelId,
//           helperText: validationErrors?.channelId,
//           onFocus: () =>
//             setValidationErrors((prev) => ({ ...prev, channelId: undefined })),
//         },
//       },
//       {
//         accessorKey: "typeId",
//         header: "Type",
//         Cell: ({ cell }) => {
//           const type = types.find((t) => t.id === cell.getValue<number>());
//           return type ? type.name : "";
//         },
//         muiEditTextFieldProps: {
//           select: true,
//           children: types.map((type) => (
//             <MenuItem key={type.id} value={type.id}>
//               {type.name}
//             </MenuItem>
//           )),
//           error: !!validationErrors?.typeId,
//           helperText: validationErrors?.typeId,
//           onFocus: () =>
//             setValidationErrors((prev) => ({ ...prev, typeId: undefined })),
//         },
//       },
//       {
//         accessorKey: "categoryId",
//         header: "Category",
//         Cell: ({ cell }) => {
//           const category = categories.find(
//             (c) => c.id === cell.getValue<number>()
//           );
//           return category ? category.name : "";
//         },
//         muiEditTextFieldProps: {
//           select: true,
//           children: categories.map((category) => (
//             <MenuItem key={category.id} value={category.id}>
//               {category.name}
//             </MenuItem>
//           )),
//           error: !!validationErrors?.categoryId,
//           helperText: validationErrors?.categoryId,
//           onFocus: () =>
//             setValidationErrors((prev) => ({ ...prev, categoryId: undefined })),
//         },
//       },
//     ],
//     [channels, types, categories, validationErrors]
//   );

//  const handleSaveRow = async ({ exitEditingMode, row, values }: { exitEditingMode: () => void; row: MRT_Row<Program>; values: Program }) => {
//     const errors = validateProgram(values);
//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }

//     await saveProgram(values as Program, row.isNew);
//     exitEditingMode();
//   };

//   const handleDeleteRow = (row: MRT_Row<Program>) => {
//     deleteProgram(row.original.id);
//   };

//   return (
//     <Box>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <MaterialReactTable
//           columns={columns}
//           data={programs}
//           editingMode="modal"
//           enableEditing
//           onEditingRowSave={handleSaveRow}
//           renderRowActions={({ row, table }) => (
//             <Box sx={{ display: "flex", gap: "1rem" }}>
//               <Tooltip arrow placement="left" title="Edit">
//                 <IconButton onClick={() => table.setEditingRow(row)}>
//                   <EditIcon />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip arrow placement="right" title="Delete">
//                 <IconButton color="error" onClick={() => handleDeleteRow(row)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           )}
//         />
//       )}
//     </Box>
//   );
// };

// export default ProgramManagement;
