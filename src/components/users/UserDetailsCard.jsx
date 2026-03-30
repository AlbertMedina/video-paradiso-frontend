import { Box, Typography, Grid, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import userAvatar from "../../assets/user-avatar.webp";
import { capitalizeWords } from "../../utils/stringUtils";

export default function UserDetailsCard({ user, canDelete, onDelete }) {
  return (
    <Box
      sx={{
        bgcolor: "#3e0b00",
        borderRadius: 3,
        boxShadow: 4,
        minWidth: 1200,
        maxWidth: 1400,
        width: "100%",
        position: "relative",
      }}
    >
      {canDelete && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
          }}
        >
          <IconButton
            onClick={onDelete}
            size="medium"
            sx={{ color: "#f5f5f5" }}
          >
            <DeleteIcon fontSize="medium" />
          </IconButton>
        </Box>
      )}

      <Grid container spacing={2} alignItems="center">
        <Grid>
          <Box
            sx={{
              width: "100%",
              overflow: "hidden",
              borderRadius: 2,
              maxWidth: 250,
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
                objectPosition: "center",
                display: "block",
              }}
            />
          </Box>
        </Grid>

        <Grid sx={{ flex: 1, minWidth: 300 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              color: "#f5f5f5",
            }}
          >
            <Typography
              gutterBottom
              sx={{ fontSize: 32, wordBreak: "break-word" }}
            >
              {capitalizeWords(user.name)} {capitalizeWords(user.surname)}
            </Typography>

            <Typography sx={{ fontSize: 18, wordBreak: "break-word" }}>
              <strong>Username:</strong> {user.username}
            </Typography>
            <Typography sx={{ fontSize: 18, wordBreak: "break-word" }}>
              <strong>Email:</strong> {user.email}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
