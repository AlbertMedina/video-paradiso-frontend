import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function SortSelector({
  options = [],
  value,
  ascending,
  onValueChange,
  onToggleOrder,
  minWidth = 150,
  height = 40,
  fontSize = 16,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (option) => {
    onValueChange(option);
    handleClose();
  };

  const currentOption = options.find((opt) => opt.value === value);
  const Icon = ascending ? ArrowUpwardIcon : ArrowDownwardIcon;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        bgcolor: "#3e0b00",
        minWidth,
        height,
      }}
    >
      <Button
        onClick={handleOpen}
        sx={{
          flex: 1,
          textTransform: "none",
          color: "#f5f5f5",
          "&:hover": { bgcolor: "#6A1F0F" },
          whiteSpace: "nowrap",
        }}
      >
        <Typography
          sx={{ fontSize, fontWeight: 500, textAlign: "center", flex: 1 }}
        >
          {currentOption ? currentOption.label : "Select..."}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#6A1F0F",
            color: "#f5f5f5",
            minWidth,
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            sx={{
              fontSize,
              "&:hover": { bgcolor: "#3e0b00" },
              bgcolor:
                opt.value === value ? "rgba(255,255,255,0.1)" : "transparent",
            }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Menu>

      <Button
        onClick={onToggleOrder}
        sx={{
          px: 1.5,
          color: "#f5f5f5",
          "&:hover": { bgcolor: "#6A1F0F" },
        }}
      >
        <Icon sx={{ fontSize: fontSize * 1.3 }} />
      </Button>
    </Box>
  );
}
