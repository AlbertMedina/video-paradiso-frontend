import { Box, Typography } from "@mui/material";
import BrokenImageIcon from "@mui/icons-material/ImageNotSupported";

export default function ImageFallback() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        bgcolor: "#f5f5f5",
        color: "#3e0b00",
        textAlign: "center",
        p: 2,
      }}
    >
      <BrokenImageIcon sx={{ fontSize: 48, mb: 1 }} />
      <Typography
        variant="caption"
        sx={{ fontSize: "large", fontWeight: "bold" }}
      >
        Error loading image
      </Typography>
    </Box>
  );
}
