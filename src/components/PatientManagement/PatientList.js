import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPatient, setNewPatient] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const { getPatients, addPatient, user } = useAuth();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const fetchedPatients = await getPatients();
    setPatients(fetchedPatients);
  };

  const handleAddPatient = async () => {
    await addPatient(newPatient);
    setOpenDialog(false);
    setNewPatient({ firstName: "", lastName: "", email: "" });
    fetchPatients();
  };

  if (user?.role !== "doctor") {
    return <Typography>Only doctors can view the patient list.</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Patient List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
      >
        Add New Patient
      </Button>
      <List>
        {patients.map((patient) => (
          <ListItem key={patient.id}>
            <ListItemText
              primary={`${patient.firstName} ${patient.lastName}`}
              secondary={patient.email}
            />
          </ListItem>
        ))}
      </List>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            fullWidth
            value={newPatient.firstName}
            onChange={(e) =>
              setNewPatient({ ...newPatient, firstName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={newPatient.lastName}
            onChange={(e) =>
              setNewPatient({ ...newPatient, lastName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newPatient.email}
            onChange={(e) =>
              setNewPatient({ ...newPatient, email: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddPatient}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default PatientList;
