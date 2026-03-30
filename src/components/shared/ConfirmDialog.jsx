import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function ConfirmDialog({
  open,
  message,
  fontSize = 16,
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(0, 0, 0, 0.6)",
          },
        },
      }}
    >
      <DialogContent
        sx={{
          pt: 4,
          pb: 2,
          pr: 4,
          pl: 4,
        }}
      >
        <DialogContentText
          sx={{ color: "#3e0b00", textAlign: "center", fontSize }}
        >
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          gap: 2,
          pt: 2,
          pb: 4,
          pr: 4,
          pl: 4,
        }}
      >
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            fontSize: fontSize * 0.8,
            color: "#3e0b00",
            borderColor: "#3e0b00",
            bgcolor: "#f5f5f5",
            "&:hover": {
              bgcolor: "#f5f5f5",
              borderColor: "#3e0b00",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            fontSize: fontSize * 0.8,
            bgcolor: "#3e0b00",
            color: "#f5f5f5",
            "&:hover": {
              bgcolor: "#2e0800",
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
