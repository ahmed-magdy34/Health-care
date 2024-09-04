import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navigation() {
  const { user, signOut } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Healthcare Management System
        </Typography>
        <Box>
          {user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/">
                Dashboard
              </Button>
              {user.role === "doctor" && (
                <>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/patient-list"
                  >
                    Patients
                  </Button>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/appointment-list"
                  >
                    Appointments
                  </Button>
                </>
              )}
              <Button color="inherit" onClick={signOut}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
