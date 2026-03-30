import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import {
  getMovie,
  removeMovie,
  rentMovie,
  returnMovie,
  getMovieRentals,
  userHasRentedMovie,
  getMovieReviews,
  removeReview,
  userHasReviewedMovie,
  addFavourite,
  removeFavourite,
  userHasFavouriteMovie,
} from "../services/api";
import AuthContext from "../services/auth.context";

import UpdateMovieInfoModal from "../components/admin/UpdateMovieInfoModal";
import UpdateMoviePosterModal from "../components/admin/UpdateMoviePosterModal";
import AddReviewModal from "../components/movies/AddReviewModal";
import MovieDetailsCard from "../components/movies/MovieDetailsCard";
import ReviewCard from "../components/movies/ReviewCard";
import RentalCard from "../components/rentals/RentalCard";
import ConfirmDialog from "../components/shared/ConfirmDialog";
import ErrorDialog from "../components/shared/ErrorDialog";

export default function MovieDetails() {
  const { movieId } = useParams();
  const { token, role, userId, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [confirmDeleteMovieOpen, setConfirmDeleteMovieOpen] = useState(false);
  const [updateInfoModalOpen, setUpdateInfoModalOpen] = useState(false);
  const [updatePosterModalOpen, setUpdatePosterModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rentConfirmOpen, setRentConfirmOpen] = useState(false);
  const [confirmDeleteReviewOpen, setConfirmDeleteReviewOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const [hasRented, setHasRented] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const isAdmin = role === "ADMIN";
  const isUser = role === "USER";

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const data = await getMovie(token, movieId);
      setMovie(data);

      if (isUser) {
        const rentedData = await userHasRentedMovie(token, movieId);
        setHasRented(rentedData.rented);

        const reviewedData = await userHasReviewedMovie(token, movieId);
        setHasReviewed(reviewedData.reviewed);

        const favouriteData = await userHasFavouriteMovie(token, movieId);
        setIsFavourite(favouriteData.isFavourite);
      }
    } catch (err) {
      setErrorMessage(err.message || "Error fetching movie");
      setErrorDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchMovieDetails();
  }, [token, movieId, isUser]);

  const fetchReviews = async () => {
    try {
      const data = await getMovieReviews(token, movieId);
      setReviews(data);
    } catch (err) {
      setErrorMessage(err.message || "Error fetching reviews");
      setErrorDialogOpen(true);
    }
  };

  useEffect(() => {
    if (token && movieId) fetchReviews();
  }, [token, movieId]);

  const fetchRentals = async () => {
    try {
      const data = await getMovieRentals(token, movieId);
      setRentals(data);
    } catch (err) {
      setErrorMessage(err.message || "Error fetching rentals");
      setErrorDialogOpen(true);
    }
  };

  useEffect(() => {
    if (token && movieId && isAdmin) fetchRentals();
  }, [token, movieId]);

  const handleConfirmDeleteMovie = async () => {
    setConfirmDeleteMovieOpen(false);
    try {
      await removeMovie(token, movieId);
      navigate("/movies");
    } catch (err) {
      setErrorMessage(err.message || "Error deleting movie");
      setErrorDialogOpen(true);
    }
  };

  const handleMovieInfoUpdated = (updatedMovie) => {
    setMovie(updatedMovie);
    setUpdateInfoModalOpen(false);
  };

  const handleMoviePosterUpdated = (updatedMovie) => {
    setMovie(updatedMovie);
    setUpdatePosterModalOpen(false);
  };

  const handleRentReturnClick = () => {
    setRentConfirmOpen(true);
  };

  const handleConfirmRentReturn = async () => {
    try {
      if (hasRented) {
        await returnMovie(token, movieId);
        setHasRented(false);
      } else {
        await rentMovie(token, movieId);
        setHasRented(true);
      }
    } catch (err) {
      setErrorMessage(err.message || "Error processing rental");
      setErrorDialogOpen(true);
    }
  };

  const handleConfirmDeleteReview = async () => {
    if (!reviewToDelete) return;
    try {
      await removeReview(token, reviewToDelete);
      setReviewToDelete(null);
      await fetchReviews();
      await fetchMovieDetails();
    } catch (err) {
      setErrorMessage(err.message || "Error deleting review");
      setErrorDialogOpen(true);
    }
  };

  const handleReviewAdded = async () => {
    await fetchReviews();
    await fetchMovieDetails();
  };

  const handleFavouriteClick = async () => {
    try {
      if (isFavourite) {
        await removeFavourite(token, movieId);
        setIsFavourite(false);
      } else {
        await addFavourite(token, movieId);
        setIsFavourite(true);
      }
    } catch (err) {
      setErrorMessage(err.message || "Error processing favourite");
      setErrorDialogOpen(true);
    }
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

  if (!movie) return null;

  return (
    <Box
      sx={{
        maxWidth: "90%",
        mx: "auto",
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
        <MovieDetailsCard
          movie={movie}
          isAdmin={isAdmin}
          isUser={isUser}
          hasRented={hasRented}
          hasReviewed={hasReviewed}
          isFavourite={isFavourite}
          onEditInfo={() => setUpdateInfoModalOpen(true)}
          onEditPoster={() => setUpdatePosterModalOpen(true)}
          onDelete={() => setConfirmDeleteMovieOpen(true)}
          onRentReturn={handleRentReturnClick}
          onReview={() => setReviewModalOpen(true)}
          onFavourite={handleFavouriteClick}
        />

        <ConfirmDialog
          open={confirmDeleteMovieOpen}
          message="Are you sure you want to delete this movie?"
          onConfirm={() => {
            setConfirmDeleteMovieOpen(false);
            handleConfirmDeleteMovie();
          }}
          onCancel={() => setConfirmDeleteMovieOpen(false)}
        />

        <ConfirmDialog
          open={rentConfirmOpen}
          message={
            hasRented
              ? "Are you sure you want to return this movie?"
              : "Are you sure you want to rent this movie?"
          }
          onConfirm={() => {
            setRentConfirmOpen(false);
            handleConfirmRentReturn();
          }}
          onCancel={() => setRentConfirmOpen(false)}
        />

        <ConfirmDialog
          open={confirmDeleteReviewOpen}
          message="Are you sure you want to delete this review?"
          onConfirm={() => {
            setConfirmDeleteReviewOpen(false);
            handleConfirmDeleteReview();
          }}
          onCancel={() => {
            setConfirmDeleteReviewOpen(false);
            setReviewToDelete(null);
          }}
        />

        <UpdateMovieInfoModal
          open={updateInfoModalOpen}
          onClose={() => setUpdateInfoModalOpen(false)}
          token={token}
          movie={movie}
          onMovieInfoUpdated={handleMovieInfoUpdated}
        />

        <UpdateMoviePosterModal
          open={updatePosterModalOpen}
          onClose={() => setUpdatePosterModalOpen(false)}
          token={token}
          movie={movie}
          onMoviePosterUpdated={handleMoviePosterUpdated}
        />

        {hasRented && (
          <AddReviewModal
            open={reviewModalOpen}
            onClose={() => setReviewModalOpen(false)}
            token={token}
            movieId={movieId}
            onReviewAdded={handleReviewAdded}
          />
        )}

        {reviews.length > 0 && (
          <Box
            sx={{
              borderRadius: 3,
              boxShadow: 4,
              maxWidth: 1200,
              width: "100%",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 2,
            }}
          >
            {reviews.map((r) => {
              const canDelete = isAdmin || r.userId === Number(userId);
              return (
                <ReviewCard
                  key={r.id}
                  review={r}
                  showDeleteButton={canDelete}
                  onDelete={(reviewId) => {
                    setReviewToDelete(reviewId);
                    setConfirmDeleteReviewOpen(true);
                  }}
                />
              );
            })}
          </Box>
        )}

        <ErrorDialog
          open={errorDialogOpen}
          onClose={() => setErrorDialogOpen(false)}
          message={errorMessage}
        />
      </Box>
      {isAdmin && (
        <Box
          sx={{
            bgcolor: "#3e0b00",
            p: 4,
            borderRadius: 3,
            maxWidth: 600,
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {rentals.length > 0 ? (
            rentals.map((r) => (
              <RentalCard key={r.id} rental={r} onClick={null} />
            ))
          ) : (
            <Typography
              sx={{
                fontSize: 16,
                color: "#f5f5f5",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              No active rentals for this movie
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
