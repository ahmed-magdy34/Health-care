import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function ReconciliationComponent() {
  const [patientId, setPatientId] = useState("");
  const [records, setRecords] = useState([]);

  const handleReconciliation = async () => {
    // In a real application, this would fetch data from different sources
    // and reconcile them. For this example, we'll just simulate it.
    const simulatedRecords = [
      { source: "Local DB", data: { name: "John Doe", age: 30 } },
      { source: "External API", data: { name: "John Doe", age: 31 } },
      { source: "Insurance Provider", data: { name: "John D.", age: 30 } },
    ];
    setRecords(simulatedRecords);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Patient Record Reconciliation
      </Typography>
      <TextField
        fullWidth
        label="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleReconciliation}
        sx={{ mt: 2, mb: 2 }}
      >
        Reconcile Records
      </Button>
      {records.length > 0 && (
        <>
          <Typography variant="h6">Reconciled Records:</Typography>
          <List>
            {records.map((record, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={record.source}
                  secondary={`Name: ${record.data.name}, Age: ${record.data.age}`}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  );
}

export default ReconciliationComponent;
