import { Box, Typography, Grid, IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import StarRatingDisplay from "../movies/StarRatingDisplay";
import defaultPoster from "../../assets/background-movie-default.webp";

export default function MovieDetailsCard({
  movie,
  isAdmin,
  isUser,
  hasRented,
  hasReviewed,
  isFavourite,
  onEdit,
  onDelete,
  onRentReturn,
  onReview,
  onFavourite,
}) {
  return (
    <Box
      sx={{
        bgcolor: "#3e0b00",
        p: 4,
        borderRadius: 3,
        boxShadow: 4,
        maxWidth: 1200,
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          display: "flex",
          gap: 1,
        }}
      >
        {isAdmin && (
          <>
            <IconButton onClick={onEdit} size="large" sx={{ color: "#f5f5f5" }}>
              <EditIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={onDelete}
              size="large"
              sx={{ color: "#f5f5f5" }}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </>
        )}

        {isUser && (
          <>
            <Button
              variant="contained"
              size="medium"
              startIcon={<LocalMoviesIcon />}
              onClick={onRentReturn}
            >
              {hasRented ? "Return" : "Rent"}
            </Button>

            {hasRented && !hasReviewed && (
              <IconButton
                onClick={onReview}
                size="large"
                sx={{ color: "#f5f5f5" }}
              >
                <RateReviewIcon fontSize="large" />
              </IconButton>
            )}

            <IconButton
              onClick={onFavourite}
              size="large"
              sx={{ color: "#f5f5f5" }}
            >
              {isFavourite ? (
                <FavoriteIcon fontSize="large" />
              ) : (
                <FavoriteBorderIcon fontSize="large" />
              )}
            </IconButton>
          </>
        )}
      </Box>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid>
          <Box
            sx={{
              width: "100%",
              aspectRatio: "2 / 3",
              overflow: "hidden",
              borderRadius: 2,
              boxShadow: 3,
              maxWidth: 300,
            }}
          >
            <Box
              component="img"
              src={movie.posterUrl || defaultPoster}
              alt={movie.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
              onError={(e) => {
                e.target.src = defaultPoster;
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
              variant="h4"
              gutterBottom
              sx={{ wordBreak: "break-word" }}
            >
              {movie.title}
            </Typography>

            <Typography sx={{ wordBreak: "break-word" }}>
              <strong>Genre:</strong> {movie.genre}
            </Typography>
            <Typography sx={{ wordBreak: "break-word" }}>
              <strong>Year:</strong> {movie.year}
            </Typography>
            <Typography sx={{ wordBreak: "break-word" }}>
              <strong>Duration:</strong> {movie.duration} min
            </Typography>
            <Typography sx={{ wordBreak: "break-word" }}>
              <strong>Director:</strong> {movie.director}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>Synopsis:</strong>
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
              "{movie.synopsis}"
            </Typography>

            {movie.rating && (
              <Box sx={{ mt: 2 }}>
                <Box>
                  <strong>Rating:</strong>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  <StarRatingDisplay
                    rating={movie.rating.average}
                    color="f5f5f5"
                  />
                  <Box>({movie.rating.count} reviews)</Box>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
