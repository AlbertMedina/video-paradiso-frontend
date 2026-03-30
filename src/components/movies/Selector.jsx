import { useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";

export default function Selector({
  options = [],
  value,
  onChange,
  minWidth = 150,
  height = 40,
  fontSize = 16,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (val) => {
    onChange(val);
    handleClose();
  };

  const currentOption = options.find((opt) => opt.value === value);

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        bgcolor: "#3e0b00",
        overflow: "hidden",
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
          px: 2,
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
    </Box>
  );
}
