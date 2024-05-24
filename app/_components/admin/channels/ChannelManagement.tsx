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
  Icon,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { z } from "zod"; 
import axiosBase from "@/app/endPoints/axios"

// Define a Zod schema for channel data
const channelSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
});

interface Channel {
  id: number;
  name: string;
}

const ChannelManagement = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [open, setOpen] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [validationError, setValidationError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axiosBase.get("/api/channels")
      .then((response) => setChannels(response.data))
      .catch((error) => console.error("Error fetching channels:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleOpen = (channel = null) => {
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
            handleClose();
          });
      } else {
        axiosBase
          .post("/api/channels", { name: channelName })
          .then((response) => {
            setChannels([...channels, response.data]);
            handleClose();
          });
      }
    } catch (error) {
      setValidationError(error.message);
    }
  };

  const handleDelete = (id: number) => {
    axiosBase.delete(`/api/channels/${id}`).then(() => {
      setChannels(channels.filter((ch) => ch.id !== id));
    });
  };

  return (
    <Box sx={{ position: "relative" }}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
        <Box sx={{position: "relative"}}>

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
                      <IconButton color="error" onClick={() => handleDelete(row.original.id)}>
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
