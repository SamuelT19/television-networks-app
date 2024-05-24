"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
  MRT_EditActionButtons,
  useMaterialReactTable,
  MRT_Row,
} from "material-react-table";
import {
  Box,
  Button,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Program, validateProgram } from "./programType";

interface Setter {
  id: number;
  name: string;
}
const ProManag = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  // State variables with specified types
  const [channels, setChannels] = useState<Setter[]>([]);
  const [types, setTypes] = useState<Setter[]>([]);
  const [categories, setCategories] = useState<Setter[]>([]);

  useEffect(() => {
    // Fetch channels, types, and categories
    axios
      .get("http://localhost:5000/api/channels")
      .then((response) => setChannels(response.data))
      .catch((error) => console.error("Error fetching channels:", error));

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

  const columns = useMemo<MRT_ColumnDef<Program>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "title",
        header: "Title",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.title,
          helperText: validationErrors?.title,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, title: undefined }),
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
            setValidationErrors({ ...validationErrors, duration: undefined }),
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
        },
      },
      {
        accessorKey: "channelId",
        header: "Channel ID",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.channelId,
          helperText: validationErrors?.channelId,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, channelId: undefined }),
        },
      },
      {
        accessorKey: "typeId",
        header: "Type ID",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.typeId,
          helperText: validationErrors?.typeId,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, typeId: undefined }),
        },
      },
      {
        accessorKey: "categoryId",
        header: "Category ID",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.categoryId,
          helperText: validationErrors?.categoryId,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, categoryId: undefined }),
        },
      },
      {
        accessorKey: "videoUrl",
        header: "Video URL",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.videoUrl,
          helperText: validationErrors?.videoUrl,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, videoUrl: undefined }),
        },
      },
    ],
    [validationErrors]
  );

  const { mutateAsync: createProgram, isPending: isCreatingProgram } =
    useCreateProgram();
  const {
    data: fetchedPrograms = [],
    isError: isLoadingProgramsError,
    isFetching: isFetchingPrograms,
    isLoading: isLoadingPrograms,
  } = useGetPrograms();
  const { mutateAsync: updateProgram, isPending: isUpdatingProgram } =
    useUpdateProgram();
  const { mutateAsync: deleteProgram, isPending: isDeletingProgram } =
    useDeleteProgram();

  const handleCreateProgram: MRT_TableOptions<Program>["onCreatingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateProgram(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await createProgram(values);
      table.setCreatingRow(null);
    };

  const handleSaveProgram: MRT_TableOptions<Program>["onEditingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateProgram(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await updateProgram(values);
      table.setEditingRow(null);
    };

  const openDeleteConfirmModal = (row: MRT_Row<Program>) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      deleteProgram(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedPrograms,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingProgramsError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateProgram,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveProgram,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Program</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={internalEditComponents.}
                  onChange={(e) =>
                    table.setCreatingRow({ ...row, title: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  variant="outlined"
                  name="duration"
                  type="number"
                  value={row.duration}
                  onChange={(e) =>
                    table.setCreatingRow({ ...row, duration: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Video URL"
                  variant="outlined"
                  name="videoUrl"
                  type="url"
                  value={row.videoUrl}
                  onChange={(e) =>
                    table.setCreatingRow({ ...row, videoUrl: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="select1">Select Channels</InputLabel>
                  <Select
                    labelId="select1"
                    id="1"
                    value={row.channelId}
                    onChange={(e) =>
                      table.setCreatingRow({
                        ...row,
                        channelId: e.target.value,
                      })
                    }
                    label="Channel"
                    name="channel"
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
                  <InputLabel id="select2">Select Type</InputLabel>
                  <Select
                    labelId="select2"
                    id="2"
                    value={row.typeId}
                    onChange={(e) =>
                      table.setCreatingRow({ ...row, typeId: e.target.value })
                    }
                    label="Type"
                    name="type"
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
                  <InputLabel id="select3">Select Category</InputLabel>
                  <Select
                    labelId="select3"
                    id="3"
                    value={row.categoryId}
                    onChange={(e) =>
                      table.setCreatingRow({
                        ...row,
                        categoryId: e.target.value,
                      })
                    }
                    label="Category"
                    name="category"
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
          </Container>


        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit Program</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <Select
            label="Channel"
            value={row.channelId}
            onChange={(e) =>
              table.setCreatingRow({ ...row, channelId: e.target.value })
            }
          >
            {channels.map((channel) => (
              <MenuItem key={channel.id} value={channel.id}>
                {channel.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            label="Type"
            value={row.typeId}
            onChange={(e) =>
              table.setCreatingRow({ ...row, typeId: e.target.value })
            }
          >
            {types.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            label="Category"
            value={row.categoryId}
            onChange={(e) =>
              table.setCreatingRow({ ...row, categoryId: e.target.value })
            }
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New Program
      </Button>
    ),
    state: {
      isLoading: isLoadingPrograms,
      isSaving: isCreatingProgram || isUpdatingProgram || isDeletingProgram,
      showAlertBanner: isLoadingProgramsError,
      showProgressBars: isFetchingPrograms,
    },
  });

  return <MaterialReactTable table={table} />;
};

function useCreateProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (program: Program) => {
      const response = await axios.post(
        "http://localhost:5000/api/programs",
        program
      );
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["programs"] }),
  });
}

function useGetPrograms() {
  return useQuery<Program[]>({
    queryKey: ["programs"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/api/programs");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}

function useUpdateProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (program: Program) => {
      const response = await axios.put(
        `http://localhost:5000/api/programs/${program.id}`,
        program
      );
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["programs"] }),
  });
}

function useDeleteProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (programId: string) => {
      await axios.delete(`http://localhost:5000/api/programs/${programId}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["programs"] }),
  });
}

export default ProManag;
