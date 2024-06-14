"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  SelectChangeEvent,
  Tooltip,
  IconButton,
  lighten,
} from "@mui/material";
import axiosBase from "@/app/endPoints/axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  MRT_ColumnDef,
  MRT_ColumnFilterFnsState,
  MRT_ColumnFiltersState,
  MRT_FilterOption,
  MRT_GlobalFilterTextField,
  MRT_PaginationState,
  MRT_SortingState,
  MRT_ToggleFiltersButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { validateProgram, Program } from "./programType";
import io from "socket.io-client";

interface Setter {
  id: number;
  name: string;
}

type UserApiResponse = {
  data: {
    programs: Array<Program>;
  };
  meta: {
    totalRowCount: number;
  };
};

const ENDPOINT =
  process.env.TV_APP_BACKEND_URL ||
  "http://localhost:5000" ||
  "https://tv-networks-server.onrender.com";

const socket = io(ENDPOINT);

const ProgramManagement = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string | number, string | number | undefined>
  >({});
  const [programs, setPrograms] = useState<Program[]>([]);
  const [channels, setChannels] = useState<Setter[]>([]);
  const [types, setTypes] = useState<Setter[]>([]);
  const [categories, setCategories] = useState<Setter[]>([]);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [newProgram, setNewProgram] = useState<Partial<Program>>({});

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  const [rowCount, setRowCount] = useState(0);

  // table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [columnFilterFns, setColumnFilterFns] =
    useState<MRT_ColumnFilterFnsState>({
      id: "equals",
      title: "startsWith",
      duration: "between",
      description: "contains",
      type_name: "equals",
      channel_name: "notEquals",
      category_name: "equals",
      airDate: "between",
    });
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchPrograms = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        start: `${pagination.pageIndex}`,
        size: `${pagination.pageSize}`,
        filters: JSON.stringify(columnFilters ?? []),
        // filtersFn: JSON.stringify(columnFilterFns ?? []),
        globalFilter: globalFilter ?? "",
        sorting: JSON.stringify(sorting ?? []),
      };
      const response = await axiosBase.get<UserApiResponse>("/api/programs", {
        params,
      });
      setPrograms(response.data.data.programs);
      setRowCount(response.data.meta.totalRowCount);
    } catch (error) {
      console.error("Error fetching programs:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [
    columnFilters,
    columnFilterFns,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
  ]);
  useEffect(() => {
    fetchPrograms();
    socket.on("programsUpdated", fetchPrograms);

    return () => {
      socket.off("programsUpdated", fetchPrograms);
    };
  }, [fetchPrograms]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axiosBase.get("/api/channels");
        setChannels(response.data.data.channels);
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
    setNewProgram(program ? { ...program,isActive: true } : {});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditingProgram(null);
    setNewProgram({});
    setOpenDialog(false);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewProgram({
      ...newProgram,
      [name]: name === "duration" ? Number(value) : value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    setNewProgram({ ...newProgram, [name]: value });
  };

  const handleSaveProgram = async () => {
    const validationErrors = validateProgram(newProgram);
    if (Object.values(validationErrors).some((error) => error)) {
      setValidationErrors(validationErrors);
      console.log(validationErrors);
      return;
    }
    console.log(isSaving);
    setIsSaving(true);
    setIsError(false);
    console.log(isSaving);

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
      "greaterThanOrEqualTo",
      "lessThan",
      "lessThanOrEqualTo",
    ],
    dateTime: [
      "fuzzy",
      "contains",
      "startsWith",
      "endsWith",
      "equals",
      "notEquals",
    ],
    range:[
      "between",
      "betweenInclusive",
    ]
  };

  const columns = useMemo<MRT_ColumnDef<Program>[]>(
    () => [
      {
        header: "Id ",
        accessorKey: "id",
        columnFilterModeOptions: filteringMethods.numeric as MRT_FilterOption[],
        size: 100,
      },
      {
        header: "Title",
        accessorKey: "title",
        filterVariant: "autocomplete",
      },
      {
        header: "Duration",
        accessorKey: "duration",
        filterVariant: "range-slider",
        muiFilterSliderProps: {
          max: 10_000_000,
          min: 100_000,
          marks: true,
          step: 200_000,
        },
      },
      {
        header: "Description",
        accessorKey: "description",
        filterVariant: "text",
        size:300
      },
      {
        accessorFn: (row) => row.channel?.name || "",
        id: "channel_name",
        header: "Channel",
        filterVariant: "select",
        // enableColumnFilterModes: false,
        size: 100,
      },
      {
        accessorFn: (row) => row.type?.name || "",
        id: "type_name",
        header: "Type",
        filterVariant: "select",
        // enableColumnFilterModes: false,
        size: 50,

      },

      {
        accessorFn: (row) => row.category?.name || "",
        id: "category_name",
        header: "Category",
        filterVariant: "multi-select",
        filterFn: "notEquals",
        columnFilterModeOptions: ["equals", "notEquals"],
        // enableColumnFilterModes: false,
        size: 100,

      },
      {
        accessorFn: (row) => (row.airDate ? new Date(row.airDate) : new Date()),
        id: "airDate",
        header: "Air Date",
        filterVariant: "datetime",
        filterFn: "between",
        columnFilterModeOptions:
          filteringMethods.numeric as MRT_FilterOption[],
        Cell: ({ cell }) =>
          `${cell.getValue<Date>().toLocaleDateString()} ${cell
            .getValue<Date>()
            .toLocaleTimeString()}`,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: programs,
    getRowId: (row) => String(row.id),
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
    },
    enableRowActions: true,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
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
          <IconButton onClick={() => handleOpenDialog(row.original)}>
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
          onClick={() => handleOpenDialog()}
          startIcon={<AddIcon />}
        >
          Add Program
        </Button>
        <Box
          sx={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            marginRight: "5%",
          }}
        >
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
        maxWidth: "calc(100vw - 18vw)",
        boxShadow: "2px 2px 10px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <MaterialReactTable table={table} />
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
                  error={!!validationErrors?.channelId}
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
                  error={!!validationErrors?.typeId}
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
                <InputLabel id="category-select-label">Categories</InputLabel>
                <Select
                  labelId="category-select-label"
                  name="categoryId"
                  value={newProgram.categoryId || ""}
                  error={!!validationErrors?.categoryId}
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
    </Box>
  );
};

export default ProgramManagement;
