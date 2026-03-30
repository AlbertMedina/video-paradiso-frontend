import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, CircularProgress, Grid, Button } from "@mui/material";

import { getMyFavourites } from "../../services/api";
import AuthContext from "../../services/auth.context";

import MovieCard from "../../components/movies/MovieCard";

export default function Favourites() {
  const { token, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFavourites = async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError("");

      const data = await getMyFavourites(token);

      setFavourites(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, [token]);

  const handleFavouriteClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const handleExploreMoviesClick = () => {
    navigate(`/movies`);
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

  if (!favourites) return null;

  return favourites.length > 0 ? (
    <Box
      sx={{
        maxWidth: "80%",
        mx: "auto",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ columnGap: 16 }}
      >
        {favourites.map((f) => (
          <Grid key={f.id}>
            <MovieCard
              movie={f.movie}
              onClick={() => handleFavouriteClick(f.movie.id)}
              width={180}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        height: 50,
      }}
    >
      <Typography sx={{ color: "#3e0b00", fontWeight: "bold" }}>
        No movies added to favourites
      </Typography>
      <Button
        onClick={handleExploreMoviesClick}
        variant="contained"
        sx={{
          bgcolor: "#3e0b00",
          color: "#f5f5f5",
          "&:hover": {
            bgcolor: "#2e0800",
          },
        }}
      >
        Start exploring movies
      </Button>
    </Box>
  );
}
