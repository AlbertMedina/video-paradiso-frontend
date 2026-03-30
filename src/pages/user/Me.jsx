import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import { getMe, getMyRentals } from "../../services/api";
import AuthContext from "../../services/auth.context";

import UserDetailsCard from "../../components/users/UserDetailsCard";
import RentalCard from "../../components/rentals/RentalCard";
import ErrorDialog from "../../components/shared/ErrorDialog";

export default function Me() {
  const { token, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMyDetails = async () => {
    try {
      setLoading(true);
      const data = await getMe(token);
      setUser(data);
    } catch (err) {
      setErrorMessage(err.message || "Error fetching user");
      setErrorDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMyDetails();
  }, [token]);

  const fetchMyRentals = async () => {
    try {
      const data = await getMyRentals(token);
      setRentals(data);
    } catch (err) {
      setErrorMessage(err.message || "Error fetching rentals");
      setErrorDialogOpen(true);
    }
  };

  useEffect(() => {
    if (token) fetchMyRentals();
  }, [token]);

  const handleRentalClick = (movieId) => {
    navigate(`/movies/${movieId}`);
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

  if (!user) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 5,
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
        <UserDetailsCard user={user} canDelete={false} onDelete={null} />

        <ErrorDialog
          open={errorDialogOpen}
          onClose={() => setErrorDialogOpen(false)}
          message={errorMessage}
        />

        <Box
          sx={{
            bgcolor: "#3e0b00",
            p: 4,
            borderRadius: 3,
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          {rentals.length > 0 ? (
            rentals.map((r) => (
              <RentalCard
                key={r.id}
                rental={r}
                onClick={() => handleRentalClick(r.movieId)}
              />
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 50,
              }}
            >
              <Typography sx={{ color: "#f5f5f5", fontWeight: "bold" }}>
                No movies rented
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
