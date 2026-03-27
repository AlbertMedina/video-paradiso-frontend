import { useEffect, useMemo, useState } from "react";

import { Box } from "@mui/material";

import ImageFallback from "../shared/ImageFallback";

import defaultPoster from "../../assets/background-movie-default.webp";

function CarouselPoster({ movie, movieWidth }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [movie, movie.posterUrl]);

  if (hasError) {
    return (
      <Box sx={{ width: movieWidth, aspectRatio: "2 / 3" }}>
        <ImageFallback />
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={movie.posterUrl || defaultPoster}
      alt={movie.title}
      sx={{
        width: movieWidth,
        height: "100%",
        display: "block",
        aspectRatio: "2 / 3",
        objectFit: "cover",
        borderRadius: 4,
      }}
      onError={() => setHasError(true)}
    />
  );
}

export default function MovieCarouselButton({
  movies,
  visibleCount = 1,
  intervalMs = 3000,
  movieWidth = 300,
  gap = 16,
  text,
  onClick,
}) {
  const [index, setIndex] = useState(0);

  const pages = useMemo(() => {
    if (!movies || movies.length === 0) return [];
    const trimmedLength = movies.length - (movies.length % visibleCount);
    const trimmedMovies = movies.slice(0, trimmedLength || movies.length);
    const result = [];
    for (let i = 0; i < trimmedMovies.length; i += visibleCount) {
      result.push(trimmedMovies.slice(i, i + visibleCount));
    }
    return result;
  }, [movies, visibleCount]);

  useEffect(() => {
    if (pages.length <= 1) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % pages.length);
    }, intervalMs);

    return () => clearInterval(id);
  }, [pages.length, intervalMs]);

  if (pages.length === 0) return null;

  const carouselWidth = visibleCount * movieWidth + (visibleCount - 1) * gap;

  return (
    <Box
      sx={{
        width: carouselWidth,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        borderRadius: 4,
        "&:hover .carousel-overlay": {
          opacity: 1,
        },
        "&:hover .carousel-track": {
          filter: "brightness(30%)",
        },
      }}
      onClick={onClick}
    >
      <Box
        className="carousel-track"
        sx={{
          display: "flex",
          transform: `translateX(-${index * carouselWidth}px)`,
          transition: "transform 600ms ease-in-out, filter 300ms ease",
        }}
      >
        {pages.map((page, pageIndex) => (
          <Box
            key={pageIndex}
            sx={{
              display: "flex",
              gap: `${gap}px`,
              minWidth: carouselWidth,
            }}
          >
            {page.map((movie) => (
              <Box key={movie.id} sx={{ width: movieWidth }}>
                <CarouselPoster movie={movie} movieWidth={movieWidth} />
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      {text && (
        <Box
          className="carousel-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f5f5f5",
            fontWeight: "bold",
            opacity: 0,
            transition: "0.3s",
            pointerEvents: "none",
            fontSize: 48,
            textAlign: "center",
            textShadow: "2px 4px 4px rgba(0,0,0,0.7)",
          }}
        >
          {text}
        </Box>
      )}
    </Box>
  );
}
