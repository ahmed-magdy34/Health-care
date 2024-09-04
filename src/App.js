import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider, useAuth } from "./context/AuthContext";
import theme from "./theme/theme";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import PatientList from "./components/PatientManagement/PatientList";
import AppointmentList from "./components/AppointmentManagement/AppointmentList";
import Login from "./components/Auth/Login";

function PrivateRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute allowedRoles={["doctor", "patient"]}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/patient-list"
              element={
                <PrivateRoute allowedRoles={["doctor"]}>
                  <PatientList />
                </PrivateRoute>
              }
            />
            <Route
              path="/appointment-list"
              element={
                <PrivateRoute allowedRoles={["doctor"]}>
                  <AppointmentList />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
