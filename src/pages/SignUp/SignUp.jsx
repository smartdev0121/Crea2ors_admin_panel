import React, { useEffect } from "react";
import { Container, Box } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/users/actions";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import { Form, Field } from "react-final-form";
import { Stack, FormControlLabel, Checkbox } from "@mui/material";
import MTextField from "../../components/MInput/MTextField";
import { Link, useHistory } from "react-router-dom";
import { passwordStrength } from "check-password-strength";
import "./SignUp.scss";

const SignUp = (props) => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(createUser(values, props.history));
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
          <h2>Sign-Up</h2>
        </section>
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Nickname is required";
            }
            if (!values.password) {
              errors.password = "Password is required!";
            }

            if (passwordStrength(values.password).value !== "Strong") {
              errors.password =
                "Password must be over 10 characters including Uppercase, Lowercase, Number, Symbol!";
            }
            return errors;
          }}
          render={({ handleSubmit, submitting, form, values, pristine }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Stack className="input-part" spacing={2}>
                <Field
                  type="text"
                  label="Username"
                  name="username"
                  component={MTextField}
                />
                <Field
                  type="password"
                  label="Password"
                  component={MTextField}
                  name="password"
                />
                <MColorButtonView type="submit" disabled={submitting}>
                  SIGN UP
                </MColorButtonView>
              </Stack>
              <section className="link-up-part">
                <Link to="/sign-in">Already have an account? Sign in</Link>
              </section>
            </form>
          )}
        ></Form>
      </Box>
    </Container>
  );
};

export default SignUp;
