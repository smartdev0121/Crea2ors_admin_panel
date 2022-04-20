import React from "react";
import { Container, Box, Stack } from "@mui/material";
import MTextField from "../../components/MInput/MTextField";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import { LockOpen } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../store/auth/actions";
import "./PasswordReset.scss";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(forgotPassword(values));
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
          <p>
            Enter your login name & verified email address and we will send you
            a password reset code
          </p>
        </section>
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.email) errors.email = "Email address is required";
            return errors;
          }}
          render={({ handleSubmit, submitting, form, values, pristine }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Stack className="input-part" spacing={2}>
                <Field
                  label="Email"
                  placeholder="Enter your email address"
                  name="email"
                  type="email"
                  component={MTextField}
                />

                <MColorButtonView disabled={submitting} type="submit">
                  SUBMIT RESET REQUEST
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

export default PasswordReset;
