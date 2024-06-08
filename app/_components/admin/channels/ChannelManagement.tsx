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
  IconButton,
  MenuItem,
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
  id: z.number(),
  name: z.string().min(1).max(20),
});

type Channel = {
  id: number;
  name: string;
};

// type filterData = {
//   id: string;
//   value: unknown;
//   type: string;
// };

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
  const [channelName, setChannelName] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  // data and fetching state
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  // table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [columnFilterFns, setColumnFilterFns] =
    useState<MRT_ColumnFilterFnsState>({ id: "equals", name: "startsWith" });
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // console.log(columnFilterFns);

  const updateColumnFiltersWithType = useCallback(() => {
    const updatedColumnFilters = columnFilters.map((filter) => {
      const filterFn = columnFilterFns[filter.id];
      return {
        ...filter,
        type: filterFn ? filterFn : "contains",
      };
    });

    // Check if columnFilters actually changed before updating
    if (
      JSON.stringify(updatedColumnFilters) !== JSON.stringify(columnFilters)
    ) {
      setColumnFilters(updatedColumnFilters);
    }
  }, [columnFilters, columnFilterFns]);

  useEffect(() => {
    updateColumnFiltersWithType();
  }, [updateColumnFiltersWithType]);

  // console.log(columnFilters);
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
  }, [
    columnFilters,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
  ]);

  useEffect(() => {
    fetchChannels();
    socket.on("channelsUpdated", fetchChannels);
    return () => {
      socket.off("channelsUpdated", fetchChannels);
    };
  }, [fetchChannels]);

  const handleOpen = (channel: Channel | null = null) => {
    setCurrentChannel(channel);
    setChannelName(channel ? channel.name : "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentChannel(null);
    setChannelName("");
    setValidationError(null);
  };

  const handleSubmit = async () => {
    const newChannel = {
      id: currentChannel ? currentChannel.id : 0,
      name: channelName,
    };

    try {
      channelSchema.parse(newChannel);
      if (currentChannel) {
        await axiosBase
          .put(`/api/channels/${currentChannel.id}`, {
            name: channelName,
          })
          .then(() => {
            fetchChannels();
            handleClose();
          });
      } else {
        await axiosBase
          .post("/api/channels", { name: channelName })
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

  const filteringMethods = {
    numeric: [
      "equals",
      "notEquals",
      "between",
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
        columnFilterModeOptions: filteringMethods.numeric as MRT_FilterOption[],
      },
      {
        accessorKey: "name",
        header: "Name",
        filterFn: "startsWith",
        columnFilterModeOptions:
          filteringMethods.character as MRT_FilterOption[],
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
    onColumnFiltersChange: setColumnFilters,
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
          <IconButton
            color="error"
            onClick={() => handleDelete(row.original.id)}
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
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              fullWidth
            />
            {validationError && (
              <p style={{ color: "red" }}>{validationError}</p>
            )}
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
