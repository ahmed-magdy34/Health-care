import React from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Healthcare Management Dashboard
      </Typography>
      {user ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Item>
              <Typography variant="h6">Total Patients</Typography>
              <Typography variant="h4">1,234</Typography>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Typography variant="h6">Appointments Today</Typography>
              <Typography variant="h4">42</Typography>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Typography variant="h6">Staff on Duty</Typography>
              <Typography variant="h4">15</Typography>
            </Item>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6">
          Please log in to view the dashboard.
        </Typography>
      )}
    </Container>
  );
}

export default Dashboard;
