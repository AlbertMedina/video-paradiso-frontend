import { useContext } from "react";
import { NavLink } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import AuthContext from "../../services/auth.context";

import logo from "../../assets/logo-light-nav.png";

export default function Nav() {
  const { role, logout } = useContext(AuthContext);

  if (!role) return null;

  const isAdmin = role === "ADMIN";

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Movies", to: "/movies" },
    isAdmin
      ? { label: "Users", to: "/users" }
      : { label: "Favourites", to: "/favourites" },
  ];

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          {navLinks.map((link) => (
            <Button
              key={link.to}
              color="inherit"
              component={NavLink}
              to={link.to}
              sx={{
                textTransform: "none",
                transition: "all 0.3s ease",
                borderRadius: 2,
                px: 2,

                "&.active": {
                  bgcolor: "rgba(255, 255, 255, 0.15)",
                  boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.3)",
                  color: "#fff",
                  fontWeight: "bold",
                },

                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <Typography variant="body1">{link.label}</Typography>
            </Button>
          ))}
        </Box>

        <Box
          component="img"
          src={logo}
          alt="Video Paradiso Logo"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            aspectRatio: "6 / 2",
            width: 350,
            objectFit: "cover",
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isAdmin && (
            <IconButton
              color="inherit"
              component={NavLink}
              to="/me"
              size="large"
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          )}
          <IconButton color="inherit" onClick={logout} size="large">
            <LogoutIcon fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
