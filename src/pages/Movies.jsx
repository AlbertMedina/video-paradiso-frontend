import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { getAllMovies, getGenres } from "../services/api";
import AuthContext from "../services/auth.context";

import MovieCard from "../components/movies/MovieCard";
import GenreSelector from "../components/movies/GenreSelector";
import SearchBox from "../components/movies/SearchBox";
import SortToggle from "../components/movies/SortToggle";
import HideUnavailableCheckbox from "../components/movies/HideUnavailableCheckbox.jsx";
import AddMovieCard from "../components/admin/AddMovieCard";
import AddMovieModal from "../components/admin/AddMovieModal";
import ErrorDialog from "../components/shared/ErrorDialog";

export default function Movies() {
  const { token, role, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const adminPageSize = 9;
  const userPageSize = 10;

  const [totalPages, setTotalPages] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState("TITLE");
  const [ascending, setAscending] = useState(true);
  const [genres, setGenres] = useState([]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isAdmin = role === "ADMIN";

  const fetchGenres = async () => {
    try {
      const data = await getGenres(token);
      setGenres(data);
    } catch (err) {
      setErrorMessage(err.message || "Error fetching genres");
      setErrorDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchGenres();
  }, [token]);

  const fetchMovies = async () => {
    if (!token) return;
    try {
      setLoading(true);

      const data = await getAllMovies({
        token,
        page,
        size: isAdmin ? adminPageSize : userPageSize,
        genre: genreFilter,
        onlyAvailable,
        title: titleFilter,
        sortBy,
        ascending,
      });

      setMovies(data.content);
      setTotalPages(data.totalPages);
      setHasNext(data.hasNext);
    } catch (err) {
      setErrorMessage(err.message || "Error fetching movies");
      setErrorDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [token, page, titleFilter, genreFilter, onlyAvailable, sortBy, ascending]);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const handlePageChange = (newPage) => setPage(newPage);

  if (authLoading) {
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

  if (!movies) return null;

  return (
    <Box
      sx={{
        maxWidth: "80%",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        mx: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <SearchBox
            value={titleFilter}
            onChange={(newText) => {
              setTitleFilter(newText);
              setPage(0);
            }}
            placeholder="Search by title"
            width={300}
          />

          <GenreSelector
            genres={genres}
            value={genreFilter}
            onChange={(newGenre) => {
              setGenreFilter(newGenre);
              setPage(0);
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <SortToggle
            sortBy={sortBy}
            ascending={ascending}
            onSortByChange={(newSort) => setSortBy(newSort)}
            onToggleOrder={() => setAscending(!ascending)}
            width={150}
          />

          <HideUnavailableCheckbox
            checked={onlyAvailable}
            onChange={(newValue) => {
              setOnlyAvailable(newValue);
              setPage(0);
            }}
          />
        </Box>
      </Box>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ columnGap: 14 }}
      >
        {isAdmin && (
          <Grid>
            <AddMovieCard onClick={() => setOpenAddModal(true)} width={180} />
          </Grid>
        )}

        {loading ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          movies.map((movie) => (
            <Grid key={movie.id}>
              <MovieCard
                movie={movie}
                onClick={() => handleMovieClick(movie.id)}
                width={180}
              />
            </Grid>
          ))
        )}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
        }}
      >
        <IconButton
          disabled={page === 0}
          onClick={() => handlePageChange(page - 1)}
          sx={{ color: "#3e0b00" }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 24 }} />
        </IconButton>

        <Typography
          sx={{
            color: "#3e0b00",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          PAGE{" "}
          <Box component="span" sx={{ fontSize: 16 }}>
            {page + 1}
          </Box>{" "}
          OF{" "}
          <Box component="span" sx={{ fontSize: 16 }}>
            {Math.max(totalPages, 1)}
          </Box>
        </Typography>

        <IconButton
          disabled={!hasNext}
          onClick={() => handlePageChange(page + 1)}
          sx={{ color: "#3e0b00" }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>

      <AddMovieModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        token={token}
        genres={genres}
        onMovieAdded={() => {
          setPage(0);
          fetchMovies();
          fetchGenres();
        }}
      />

      <ErrorDialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        message={errorMessage}
      />
    </Box>
  );
}
