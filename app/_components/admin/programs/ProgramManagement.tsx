"use client";
import React, { useEffect, useMemo, useState } from "react";
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
import axiosBase from "@/app/endPoints/axios";

import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
  MRT_EditActionButtons,
  useMaterialReactTable,
  MRT_Row,
} from "material-react-table";
import { Program, validateProgram } from "./programType";
import io from "socket.io-client";
import { categories, types } from "./seedData";

interface Setter {
  id: number;
  name: string;
}
const socket = io("http://localhost:5000");

const ProgramManagement = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string | number, string | number | undefined>
  >({});

  // State variables with specified types
  const [programs, setPrograms] = useState<Program[]>([]);

  const [channels, setChannels] = useState<Setter[]>([]);
  const [types, setTypes] = useState<Setter[]>([]);
  const [categories, setCategories] = useState<Setter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axiosBase.get("/api/programs");
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
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
    setTypes(types);

    setCategories(categories);
  }, []);
  async function createProgram(program: Program) {
    await axiosBase.post("/api/programs", program);
    socket.emit("updatePrograms");
  }

  async function updateProgram(program: Program) {
    await axiosBase.put(`/api/programs/${program.id}`, program);
    socket.emit("updatePrograms");
  }

  async function deleteProgram(programId: string) {
    await axiosBase.delete(`/api/programs/${programId}`);
    socket.emit("updatePrograms");
  }
  const columns = useMemo<MRT_ColumnDef<Program>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 2,
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
        size: 5,
      },
      {
        accessorKey: "duration",
        header: "Duration",
        size: 5,
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
        size: 50,
      },

    ],
    [validationErrors]
  );

  const handleCreateProgram = async ({ values, table }: any) => {
    const newValidationErrors = validateProgram(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createProgram(values);
    table.setCreatingRow(null);
  };

  const handleSaveProgram = async ({ values, table }: any) => {
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
      deleteProgram(String(row.original.id));
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: programs,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => String(row.id),
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        height: "100%",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateProgram,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveProgram,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Create New Program</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents}
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
      isLoading,
      isSaving,
      showAlertBanner: isError,
      showProgressBars: isLoading,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default ProgramManagement;
