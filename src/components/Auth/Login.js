import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Tab,
  Tabs,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await register(email, password, firstName, lastName, role);
      }
      navigate("/");
    } catch (error) {
      setError(isLogin ? "Failed to log in" : "Failed to register");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={isLogin ? 0 : 1}
          onChange={(e, newValue) => setIsLogin(newValue === 0)}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {isLogin ? "Login" : "Register"}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required={!isLogin}
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required={!isLogin}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="patient">Patient</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          {isLogin ? "Login" : "Register"}
        </Button>
      </form>
    </Container>
  );
}

export default Login;
