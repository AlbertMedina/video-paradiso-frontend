import { Box, Checkbox, Typography } from "@mui/material";

export default function LabelCheckbox({
  checked,
  onChange,
  label,
  minWidth = 150,
  height = 40,
  fontSize = 16,
}) {
  return (
    <Box
      sx={{
        minWidth,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 1.5,
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        bgcolor: "#3e0b00",
        "&:hover": { bgcolor: "#6A1F0F" },
        cursor: "pointer",
      }}
      onClick={() => onChange(!checked)}
    >
      <Checkbox
        checked={checked}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onChange(e.target.checked)}
        sx={{
          p: 0,
          color: "#f5f5f5",
          "&.Mui-checked": { color: "#f5f5f5" },
          "& .MuiSvgIcon-root": {
            fontSize: fontSize * 1.3,
          },
        }}
      />
      <Typography
        sx={{
          ml: 1,
          fontSize,
          fontWeight: 500,
          color: "#f5f5f5",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
