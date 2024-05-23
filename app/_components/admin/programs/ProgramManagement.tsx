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
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Program, validateProgram } from "./programType";

const ProgramManagement = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch programs
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

  // Save program
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

  // Delete program
  const deleteProgram = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/programs/${id}`);
      setPrograms((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  const columns = useMemo<MRT_ColumnDef<Program>[]>(
    () => [
      { accessorKey: "id", header: "Id", enableEditing: false, size: 80 },
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
        accessorKey: "description",
        header: "Description",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          onFocus: () =>
            setValidationErrors((prev) => ({
              ...prev,
              description: undefined,
            })),
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
            setValidationErrors((prev) => ({ ...prev, channelId: undefined })),
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
            setValidationErrors((prev) => ({ ...prev, typeId: undefined })),
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
            setValidationErrors((prev) => ({
              ...prev,
              categoryId: undefined,
            })),
        },
      },
    ],
    [validationErrors]
  );

  const handleSaveRow = async ({
    exitEditingMode,
    row,
    values,
  }: MRT_Row<Program>) => {
    const errors = validateProgram(values);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    await saveProgram(values as Program, row.isNew);
    exitEditingMode(); // Required to exit editing mode and close modal
  };

  const handleDeleteRow = (row: MRT_Row<Program>) => {
    deleteProgram(row.original.id);
  };

  return (
    <Box>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={programs}
          editingMode="modal"
          enableEditing
          onEditingRowSave={handleSaveRow}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
      )}
    </Box>
  );
};

export default ProgramManagement;
