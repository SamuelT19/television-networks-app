"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  SelectChangeEvent,
  TableCell,
  Tooltip,
  IconButton,
} from "@mui/material";
import axiosBase from "@/app/endPoints/axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { MaterialReactTable } from "material-react-table";
import { validateProgram, Program } from "./programType";
import io from "socket.io-client";

interface Setter {
  id: number;
  name: string;
}

const ENDPOINT = process.env.TV_APP_BACKEND_URL || "https://tv-networks-server.onrender.com";

const socket = io(ENDPOINT);

const ProgramManagement = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string | number, string | number | undefined>
  >({});
  const [programs, setPrograms] = useState<Program[]>([]);
  const [channels, setChannels] = useState<Setter[]>([]);
  const [types, setTypes] = useState<Setter[]>([]);
  const [categories, setCategories] = useState<Setter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [newProgram, setNewProgram] = useState<Partial<Program>>({});

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axiosBase.get("/api/programs");
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
    socket.on("programsUpdated", fetchPrograms);

    return () => {
      socket.off("programsUpdated", fetchPrograms);
    };
  }, []);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axiosBase.get("/api/channels");
        setChannels(response.data);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();
    socket.on("channelsUpdated", fetchChannels);

    return () => {
      socket.off("channelsUpdated", fetchChannels);
    };
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
    ]);
  }, []);

  const handleOpenDialog = (program: Program | null = null) => {
    setEditingProgram(program);
    setNewProgram(program ? { ...program } : {});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditingProgram(null);
    setNewProgram({});
    setOpenDialog(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProgram({
      ...newProgram,
      [name]: name === "duration" ? Number(value) : value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    setNewProgram({ ...newProgram, [name as string]: value });
  };

  const handleSaveProgram = async () => {
    const validationErrors = validateProgram(newProgram);
    if (Object.values(validationErrors).some((error) => error)) {
      setValidationErrors(validationErrors);
      return;
    }

    setIsSaving(true);

    try {
      if (editingProgram) {
        await axiosBase.put(`/api/programs/${editingProgram.id}`, newProgram);
      } else {
        await axiosBase.post("/api/programs", newProgram);
      }
      socket.emit("programsUpdated");
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving program:", error);
      setIsError(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProgram = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await axiosBase.delete(`/api/programs/${id}`);
        socket.emit("programsUpdated");
      } catch (error) {
        console.error("Error deleting program:", error);
        setIsError(true);
      }
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
            sx={{ position: "absolute", top: 0, zIndex: 10 }}
            startIcon={<AddIcon />}
          >
            Add Program
          </Button>
          {/* </Box> */}
          {isError && <Typography color="error">Error loading data</Typography>}
          <MaterialReactTable
            columns={[
              { header: "Id", accessorKey: "id", size: 5 },
              { header: "Title", accessorKey: "title", size: 5 },
              { header: "Duration", accessorKey: "duration", size: 5 },
              { header: "Description", accessorKey: "description", size: 5 },
              { header: "Channel", accessorKey: "channelName", size: 5 },
              { header: "Type", accessorKey: "typeName", size: 5 },
              { header: "Category", accessorKey: "categoryName", size: 5 },
              {
                header: "Actions",
                accessorKey: "actions",
                Cell: ({ row }) => (
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => handleOpenDialog(row.original)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() =>
                          row.original.id !== undefined &&
                          handleDeleteProgram(row.original.id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                ),
              },
            ]}
            data={programs}
          />

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>
              {editingProgram ? "Edit Program" : "Create New Program"}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Title"
                    variant="standard"
                    name="title"
                    value={newProgram.title || ""}
                    onChange={handleChange}
                    error={!!validationErrors?.title}
                    helperText={validationErrors?.title}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Duration"
                    variant="standard"
                    name="duration"
                    type="number"
                    value={newProgram.duration?.toString() || ""}
                    onChange={handleChange}
                    error={!!validationErrors?.duration}
                    helperText={validationErrors?.duration}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    variant="standard"
                    name="description"
                    value={newProgram.description || ""}
                    onChange={handleChange}
                    error={!!validationErrors?.description}
                    helperText={validationErrors?.description}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Video URL"
                    variant="standard"
                    name="videoUrl"
                    type="url"
                    value={newProgram.videoUrl || ""}
                    onChange={handleChange}
                    error={!!validationErrors?.videoUrl}
                    helperText={validationErrors?.videoUrl}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="channel-select-label">Channels</InputLabel>
                    <Select
                      labelId="channel-select-label"
                      name="channelId"
                      value={newProgram.channelId || ""}
                      onChange={handleSelectChange}
                      label="Channels"
                    >
                      {channels.map((channel) => (
                        <MenuItem key={channel.id} value={channel.id}>
                          {channel.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="type-select-label">Types</InputLabel>
                    <Select
                      labelId="type-select-label"
                      name="typeId"
                      value={newProgram.typeId || ""}
                      onChange={handleSelectChange}
                      label="Types"
                    >
                      {types.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="category-select-label">
                      Categories
                    </InputLabel>
                    <Select
                      labelId="category-select-label"
                      name="categoryId"
                      value={newProgram.categoryId || ""}
                      onChange={handleSelectChange}
                      label="Categories"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={handleSaveProgram}
                color="primary"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default ProgramManagement;
