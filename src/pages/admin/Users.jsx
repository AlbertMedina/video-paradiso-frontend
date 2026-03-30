import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, Grid } from "@mui/material";

import { getAllUsers } from "../../services/api";
import AuthContext from "../../services/auth.context";

import UserCard from "../../components/users/UserCard";
import ErrorDialog from "../../components/shared/ErrorDialog";

export default function Users() {
  const { token, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

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
    fetchUsers();
  }, [token]);

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  if (loading || authLoading) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", p: 4 }}>
      {users.length > 0 ? (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ columnGap: 10, rowGap: 5 }}
        >
          {users.map((u) => (
            <Grid key={u.id}>
              <UserCard user={u} onClick={() => handleUserClick(u.id)} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 200,
          }}
        >
          <Typography
            sx={{ color: "#3e0b00", fontWeight: "bold", fontSize: 20 }}
          >
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
  );
}
