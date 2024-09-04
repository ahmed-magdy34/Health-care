import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useAuth } from "../../context/AuthContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function PatientPortal() {
  const [patientData, setPatientData] = useState(null);
  const [friendEmail, setFriendEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { user, shareRecord } = useAuth();

  useEffect(() => {
    const fetchPatientData = async () => {
      if (user) {
        const docRef = doc(db, "patients", user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPatientData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchPatientData();
  }, [user]);

  const handleShare = async () => {
    try {
      await shareRecord(user.email, friendEmail);
      setSnackbarMessage("Record shared successfully!");
      setSnackbarOpen(true);
      setFriendEmail("");
    } catch (error) {
      setSnackbarMessage("Failed to share record");
      setSnackbarOpen(true);
    }
  };

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Patient Health Score",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Patient Health Score Over Time",
      },
    },
  };

  if (!user) {
    return <Typography>Please log in to view your patient portal.</Typography>;
  }

  if (!patientData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Patient Portal
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Personal Information</Typography>
            <Typography>
              Name: {patientData.firstName} {patientData.lastName}
            </Typography>
            <Typography>Email: {patientData.email}</Typography>
            <Typography>Date of Birth: {patientData.dateOfBirth}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Medical History</Typography>
            <Typography>
              {patientData.medicalHistory
                ? patientData.medicalHistory
                : "No medical history available."}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Upcoming Appointments</Typography>
            <Typography>
              {patientData.upcomingAppointments
                ? patientData.upcomingAppointments.map((app, index) => (
                    <div key={index}>
                      {app.date} at {app.time}: {app.reason}
                    </div>
                  ))
                : "No upcoming appointments."}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Share Your Record</Typography>
            <TextField
              fullWidth
              label="Friend's Email"
              value={friendEmail}
              onChange={(e) => setFriendEmail(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleShare}>
              Share Record
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Health Score Over Time</Typography>
            <Bar data={chartData} options={chartOptions} />
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
}

export default PatientPortal;
