import React from "react";
import { Container, Box, Stack } from "@mui/material";
import MTextField from "../../../components/MInput/MTextField";
import MColorButtonView from "../../../components/MInput/MColorButtonView";
import { LockOpen } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../store/auth/actions";
import jwt from "jsonwebtoken";

const ResetComponent = () => {
  const dispatch = useDispatch();
  const { token, email } = useParams();
  try {
    const { payload } = jwt.verify(token, process.env.APP_SECRET, {
      complete: true,
    });
    if (!(payload && payload.email === email)) {
      window.location = "/password-reset";
    }
  } catch (error) {
    window.location = "/sign-in";
  }
  const onSubmit = (values) => {
    const requestValues = { ...values, email: email };
    dispatch(resetPassword(requestValues));
  };
  return (
    <Container maxWidth="xs" sx={{ marginTop: "100px", marginBottom: "20px" }}>
      <Box
        sx={{
          p: 2,
          backgroundColor: "#36363666",
          padding: "20px",
        }}
      >
        <section className="header">
          <LockOpen
            fontSize="large"
            sx={{
              backgroundColor: "#da4bfd",
              borderRadius: "50%",
              padding: "5px",
              color: "white",
            }}
          />
          <h2>Password Reset Request</h2>
          <p>Enter your new password!</p>
        </section>
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.resetPassword)
              errors.resetPassword = "Password is required";
            return errors;
          }}
          render={({ handleSubmit, submitting, form, values, pristine }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Stack className="input-part" spacing={2}>
                <Field
                  label="Password"
                  placeholder="Enter your password"
                  name="resetPassword"
                  type="password"
                  component={MTextField}
                />

                <MColorButtonView disabled={submitting} type="submit">
                  RESET
                </MColorButtonView>
              </Stack>
            </form>
          )}
        ></Form>

        <section className="link-part">
          <Link to="/sign-up">Sign Up</Link>
          <Link to="/sign-in">Sign In</Link>
        </section>
      </Box>
    </Container>
  );
};

export default ResetComponent;
