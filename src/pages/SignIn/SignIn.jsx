import React from "react";
import { Container, Box, Stack } from "@mui/material";
import MTextField from "../../components/MInput/MTextField";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import { LockOpen } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/actions";
import { getSpinner } from "../../store/app/reducer";
import MSpinner from "../../components/MSpinner";
import MRootModal from "../../components/MRootModal";
import "./SignIn.scss";

const SignIn = () => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector((state) => getSpinner(state, "login"));
  const modal = useSelector((state) => state.modal);
  console.log("modal", modal);
  const onSubmit = (values) => {
    dispatch(login(values));
  };
  return (
    <Container maxWidth="xs" sx={{ marginTop: "100px", marginBottom: "20px" }}>
      <MRootModal />
      {isSubmitting && <MSpinner />}
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
          <h2>Sign in to your accout</h2>
        </section>
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email address is required!";
            }
            if (!values.password) {
              errors.password = "Password is required!";
            }
          }}
          render={({ handleSubmit, submitting, form, values, pristine }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Stack className="input-part" spacing={2}>
                <Field
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Enter your email address"
                  component={MTextField}
                />
                <Field
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  component={MTextField}
                />

                <MColorButtonView type="submit" disabled={submitting}>
                  SIGN IN
                </MColorButtonView>
              </Stack>
            </form>
          )}
        ></Form>
        <section className="link-part">
          <Link to="/password-reset">Forgot password?</Link>
          <Link to="/sign-up">Don't have your account? Sign Up</Link>
        </section>
      </Box>
    </Container>
  );
};

export default SignIn;
