import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const validationSchema = Yup.object().shape({
  patientEmail: Yup.string().email("Invalid email").required("Required"),
  date: Yup.date().required("Required"),
  time: Yup.string().required("Required"),
  reason: Yup.string().required("Required"),
});

function AppointmentScheduling() {
  const { addAppointment } = useAuth();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await addAppointment({
        id: `${values.patientEmail}-${values.date}-${values.time}`,
        ...values,
        createdAt: new Date().toISOString(),
      });
      resetForm();
      alert("Appointment scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      alert("Failed to schedule appointment. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Schedule Appointment
      </Typography>
      <Formik
        initialValues={{ patientEmail: "", date: "", time: "", reason: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              fullWidth
              name="patientEmail"
              label="Patient Email"
              error={touched.patientEmail && errors.patientEmail}
              helperText={touched.patientEmail && errors.patientEmail}
              margin="normal"
            />
            <Field
              as={TextField}
              fullWidth
              name="date"
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={touched.date && errors.date}
              helperText={touched.date && errors.date}
              margin="normal"
            />
            <Field
              as={TextField}
              fullWidth
              name="time"
              label="Time"
              type="time"
              InputLabelProps={{ shrink: true }}
              error={touched.time && errors.time}
              helperText={touched.time && errors.time}
              margin="normal"
            />
            <Field
              as={TextField}
              fullWidth
              name="reason"
              label="Reason for Appointment"
              multiline
              rows={4}
              error={touched.reason && errors.reason}
              helperText={touched.reason && errors.reason}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              Schedule Appointment
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default AppointmentScheduling;
