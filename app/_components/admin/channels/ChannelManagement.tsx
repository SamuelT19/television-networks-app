"use client";
import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { z, ZodError } from "zod";
import axiosBase from "@/app/endPoints/axios";
import { io } from "socket.io-client";

const channelSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
});

interface Channel {
  id: number;
  name: string;
}

const ENDPOINT =
  process.env.TV_APP_BACKEND_URL || "http://localhost:5000";

const socket = io(ENDPOINT);

const ChannelManagement = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [open, setOpen] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [channelName, setChannelName] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axiosBase.get("/api/channels");
        setChannels(response.data);
      } catch (error) {
        console.error("Error fetching channels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannels();

    socket.on("channelsUpdated", fetchChannels);

    return () => {
      socket.off("channelsUpdated", fetchChannels);
    };
  }, []);

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

  const handleSubmit = () => {
    const newChannel = {
      id: currentChannel ? currentChannel.id : 0,
      name: channelName,
    };

    try {
      channelSchema.parse(newChannel);
      if (currentChannel) {
        axiosBase
          .put(`/api/channels/${currentChannel.id}`, {
            name: channelName,
          })
          .then(() => {
            setChannels(
              channels.map((ch) =>
                ch.id === currentChannel.id ? { ...ch, name: channelName } : ch
              )
            );
            socket.emit("updateChannels");
            handleClose();
          });
      } else {
        axiosBase
          .post("/api/channels", { name: channelName })
          .then((response) => {
            setChannels([...channels, response.data]);
            socket.emit("updateChannels");
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
          setChannels(channels.filter((ch) => ch.id !== id));
          socket.emit("updateChannels");
        });
      } catch (error) {
        console.error("Error deleting channel:", error);
      }
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Box sx={{ position: "relative" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpen()}
              sx={{ position: "absolute", top: 0, zIndex: 10 }}
            >
              <AddIcon /> Add Channel
            </Button>
            <MaterialReactTable
              columns={[
                { accessorKey: "id", header: "ID" },
                { accessorKey: "name", header: "Name" },
                {
                  accessorKey: "actions",
                  header: "Actions",
                  Cell: ({ row }) => (
                    <>
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
                    </>
                  ),
                },
              ]}
              data={channels}
            />
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
                )}{" "}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>
                  {currentChannel ? "Update" : "Add"}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ChannelManagement;
