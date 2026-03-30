import { Box, Typography } from "@mui/material";

import userAvatar from "../../assets/user-avatar.webp";
import { capitalizeWords } from "../../utils/stringUtils";

export default function UserCard({ user, onClick, width = 300, height = 100 }) {
  if (!user) return null;

  return (
    <Box
      onClick={onClick}
      sx={{
        width,
        height,
        p: 1.5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 1,
        color: "#3e0b00",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          flexShrink: 0,
          overflow: "hidden",
          borderRadius: "50%",
        }}
      >
        <Box
          component="img"
          src={userAvatar}
          alt={user.username}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
          {capitalizeWords(user.name)} {capitalizeWords(user.surname)}
        </Typography>

        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          {user.username}
        </Typography>
      </Box>
    </Box>
  );
}
