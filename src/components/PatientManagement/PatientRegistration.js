import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  dateOfBirth: Yup.date().required("Required"),
});

function PatientRegistration() {
  const { addPatient } = useAuth();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await addPatient({
        id: values.email, // Using email as ID for simplicity
        ...values,
        createdAt: new Date().toISOString(),
      });
      resetForm();
      alert("Patient registered successfully!");
    } catch (error) {
      console.error("Error registering patient:", error);
      alert("Failed to register patient. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Patient Registration
      </Typography>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          dateOfBirth: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              fullWidth
              name="firstName"
              label="First Name"
              error={touched.firstName && errors.firstName}
              helperText={touched.firstName && errors.firstName}
              margin="normal"
            />
            <Field
              as={TextField}
              fullWidth
              name="lastName"
              label="Last Name"
              error={touched.lastName && errors.lastName}
              helperText={touched.lastName && errors.lastName}
              margin="normal"
            />
            <Field
              as={TextField}
              fullWidth
              name="email"
              label="Email"
              error={touched.email && errors.email}
              helperText={touched.email && errors.email}
              margin="normal"
            />
            <Field
              as={TextField}
              fullWidth
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              error={touched.dateOfBirth && errors.dateOfBirth}
              helperText={touched.dateOfBirth && errors.dateOfBirth}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              Register Patient
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default PatientRegistration;
