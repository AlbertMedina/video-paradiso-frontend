import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import { getAllUsers } from "../../services/api";
import AuthContext from "../../services/auth.context";

import UserCard from "../../components/users/UserCard";
import ErrorDialog from "../../components/shared/ErrorDialog";

export default function Users() {
  const { token, loading: authLoading } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers(token);
      setUsers(data);
    } catch (err) {
      setErrorMessage(err.message || "Error fetching users");
      setErrorDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  if (loading || authLoading) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "transparent",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!users) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {users.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                md: "repeat(3, 1fr)",
              },
              rowGap: 8,
              columnGap: 16,
              width: "100%",
            }}
          >
            {users.map((u) => (
              <UserCard
                key={u.id}
                user={u}
                onClick={() => handleUserClick(u.id)}
              />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Typography sx={{ color: "#3e0b00", fontWeight: "bold" }}>
              No users registered
            </Typography>
          </Box>
        )}

        <ErrorDialog
          open={errorDialogOpen}
          onClose={() => setErrorDialogOpen(false)}
          message={errorMessage}
        />
      </Box>
    </Box>
  );
}
