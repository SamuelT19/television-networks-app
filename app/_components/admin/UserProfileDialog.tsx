'use client'

import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Avatar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface UserProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({ open, onClose }) => {

    const router = useRouter();

    const handleLogout = () => {
      router.push("/login");
    };
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{
        sx: {
          position: "absolute",
          top: 10,
          right: 10,
          margin: 0,
          width: "200px",
        },
      }}>
      <DialogContent sx={{display: 'flex',flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Avatar sx={{ width: 56, height: 56, marginBottom: "8px" }} />
        <Typography variant="h6" sx={{ marginBottom: "8px" }}>
          Username
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "16px" }}>
          user@example.com
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogout} color="warning">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfileDialog;
