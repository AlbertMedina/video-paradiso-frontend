import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function ErrorDialog({ open, onClose, message, fontSize = 16 }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          pt: 2,
          pb: 4,
          pr: 4,
          pl: 4,
        }}
      >
        <Button
          onClick={onClose}
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
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
