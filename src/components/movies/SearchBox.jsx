import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";

export default function SearchBox({
  value,
  onChange,
  placeholder = "Search...",
  width = 200,
  height = 40,
  fontSize = 16,
  debounceTime = 400,
}) {
  const [internalValue, setInternalValue] = useState(value || "");

  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  useEffect(() => {
    if (internalValue === value) return;

    const handler = setTimeout(() => {
      onChange(internalValue);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [internalValue, value, onChange, debounceTime]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        px: 1.5,
        borderRadius: 2,
        bgcolor: "#f7f7f7",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        border: "1px solid #3e0b00",
        "&:hover": { bgcolor: "#eaeaea" },
        width,
        height,
      }}
    >
      <SearchIcon sx={{ color: "#3e0b00", fontSize: fontSize * 1.3 }} />
      <InputBase
        placeholder={placeholder}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        sx={{
          ml: 1,
          flex: 1,
          "& .MuiInputBase-input": {
            fontSize,
            py: 0,
            color: "#3e0b00",
          },
        }}
      />
    </Box>
  );
}
