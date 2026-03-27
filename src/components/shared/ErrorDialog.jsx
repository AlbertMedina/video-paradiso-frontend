import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function ErrorDialog({ open, onClose, message }) {
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
        <DialogContentText sx={{ color: "#3e0b00", textAlign: "center" }}>
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
