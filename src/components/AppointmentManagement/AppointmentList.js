import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    date: "",
    time: "",
    reason: "",
  });
  const {
    getAppointments,
    addAppointment,
    completeAppointment,
    deleteAppointment,
    getPatients,
    user,
  } = useAuth();

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, []);

  const fetchAppointments = async () => {
    const fetchedAppointments = await getAppointments();
    setAppointments(fetchedAppointments);
  };

  const fetchPatients = async () => {
    const fetchedPatients = await getPatients();
    setPatients(fetchedPatients);
  };

  const handleAddAppointment = async () => {
    await addAppointment(newAppointment);
    setOpenDialog(false);
    setNewAppointment({ patientId: "", date: "", time: "", reason: "" });
    fetchAppointments();
  };

  const handleCompleteAppointment = async (appointmentId) => {
    await completeAppointment(appointmentId);
    fetchAppointments();
  };

  const handleDeleteAppointment = async (appointmentId) => {
    await deleteAppointment(appointmentId);
    fetchAppointments();
  };

  if (user?.role !== "doctor") {
    return (
      <Typography>Only doctors can view and manage appointments.</Typography>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Appointment List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
      >
        Add New Appointment
      </Button>
      <List>
        {appointments.map((appointment) => (
          <ListItem key={appointment.id}>
            <ListItemText
              primary={`Patient: ${
                patients.find((p) => p.id === appointment.patientId)?.firstName
              } ${
                patients.find((p) => p.id === appointment.patientId)?.lastName
              }`}
              secondary={`Date: ${appointment.date}, Time: ${appointment.time}, Reason: ${appointment.reason}`}
            />
            {!appointment.completed && (
              <Button onClick={() => handleCompleteAppointment(appointment.id)}>
                Complete
              </Button>
            )}
            <Button onClick={() => handleDeleteAppointment(appointment.id)}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Appointment</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={newAppointment.patientId}
            onChange={(e) =>
              setNewAppointment({
                ...newAppointment,
                patientId: e.target.value,
              })
            }
            displayEmpty
            margin="dense"
          >
            <MenuItem value="" disabled>
              Select Patient
            </MenuItem>
            {patients.map((patient) => (
              <MenuItem
                key={patient.id}
                value={patient.id}
              >{`${patient.firstName} ${patient.lastName}`}</MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newAppointment.date}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, date: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newAppointment.time}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, time: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Reason"
            fullWidth
            value={newAppointment.reason}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, reason: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAppointment}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AppointmentList;
