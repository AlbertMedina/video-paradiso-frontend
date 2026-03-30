import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Typography, Box } from "@mui/material";

import { registerUser } from "../services/api";

import ErrorDialog from "../components/shared/ErrorDialog";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, surname, username, email, password });

      navigate("/");
    } catch (err) {
      setErrorMessage(err.message || "Register error");
      setErrorDialogOpen(true);
    }
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

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
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 500,
          bgcolor: "#f5f5f5",
          color: "#3e0b00",
          borderRadius: 4,
          boxShadow: 20,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          REGISTER
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            width: "100%",
            "& .MuiInputBase-input": { fontSize: 16 },
            "& .MuiInputLabel-root": { fontSize: 16 },
          }}
        >
          <TextField
            label="Name"
            type="text"
            size="small"
            fullWidth
            margin="dense"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Surname"
            type="text"
            size="small"
            fullWidth
            margin="dense"
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <TextField
            label="Username"
            type="text"
            size="small"
            fullWidth
            margin="dense"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            size="small"
            fullWidth
            margin="dense"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            size="small"
            fullWidth
            margin="dense"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Sign up
          </Button>
          <Button fullWidth sx={{ mt: 1 }} onClick={handleGoToLogin}>
            <u>Already have an account? Log in</u>
          </Button>
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
