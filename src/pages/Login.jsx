import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Typography, Box } from "@mui/material";

import { loginUser } from "../services/api";
import AuthContext from "../services/auth.context";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(loginIdentifier, password);

      login(data.role, data.userId, data.token);

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoToRegister = () => {
    navigate("/register");
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
          LOGIN
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            width: "100%",
            "& .MuiInputBase-input": { fontSize: 16 },
            "& .MuiInputLabel-root": { fontSize: 16 },
          }}
        >
          <TextField
            label="Username or Email"
            type="text"
            size="small"
            fullWidth
            margin="dense"
            required
            value={loginIdentifier}
            onChange={(e) => setLoginIdentifier(e.target.value)}
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
          {error && (
            <Typography color="error" sx={{ mt: 1, fontSize: 14 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Log in
          </Button>
          <Button fullWidth sx={{ mt: 1 }} onClick={handleGoToRegister}>
            <u>Don’t have an account? Sign up</u>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
