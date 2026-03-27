import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";

import { getAllMovies } from "../../services/api";
import AuthContext from "../../services/auth.context";

import MovieCarousel from "../../components/home/MovieCarouselButton";
import ImageButton from "../../components/shared/ImageButton";
import ErrorDialog from "../../components/shared/ErrorDialog";

import logo from "../../assets/logo-dark.png";
import users from "../../assets/users-button.webp";

export default function AdminHome() {
  const { token, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMovies = async () => {
    if (!token) return;
    try {
      setLoading(true);

      const data = await getAllMovies({
        token,
        page: 0,
        size: 10,
        genre: "",
        onlyAvailable: false,
        title: "",
        sortBy: "TITLE",
        ascending: true,
      });

      setMovies(data.content);
    } catch (err) {
      setErrorMessage(err.message || "Error fetching movies");
      setErrorDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [token]);

  const handleMoviesCarouselClick = () => {
    navigate(`/movies`);
  };

  const handleUsersButtonClick = () => {
    navigate(`/users`);
  };

  if (loading || authLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
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

  if (!movies) return null;

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 7,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Video Paradiso Logo"
          sx={{
            aspectRatio: "7 / 2",
            width: 900,
            objectFit: "cover",
            maxWidth: "100%",
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <MovieCarousel
            movies={movies}
            movieWidth={230}
            text={"Manage movies"}
            onClick={handleMoviesCarouselClick}
          />

          <ImageButton
            width={230}
            aspectRatio={"2 / 3"}
            image={users}
            text={"Manage users"}
            onClick={handleUsersButtonClick}
          />
        </Box>
      </Box>

      <ErrorDialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        message={errorMessage}
      />
    </Box>
  );
}
