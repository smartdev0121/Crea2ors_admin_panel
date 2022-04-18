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
import "./SignUp.scss";

const SignUp = (props) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // dispatch(initializeForm("CreateUserForm", {}));
  // }, []);
  const history = useHistory();
  const onSubmit = (values) => {
    dispatch(createUser(values, history));
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
            if (!values.firstName) {
              errors.firstName = "Firstname is required";
            }
            if (!values.lastName) {
              errors.lastName = "Lastname is required";
            }
            if (!values.email) {
              errors.email = "Email address is required";
            }
            if (!values.password) {
              errors.password = "Password is required!";
            }
            return errors;
          }}
          render={({ handleSubmit, submitting, form, values, pristine }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Stack className="input-part" spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Field
                    type="text"
                    label="Firstname"
                    name="firstName"
                    component={MTextField}
                  />
                  <Field
                    type="text"
                    label="Lastname"
                    name="lastName"
                    component={MTextField}
                  />
                </Stack>
                <Field
                  type="email"
                  label="Email"
                  component={MTextField}
                  name="email"
                />
                <Field
                  type="password"
                  label="Password"
                  component={MTextField}
                  name="password"
                />
                {/* <Field type="password" /> */}
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="I accept the terms of services"
                />
                <MColorButtonView type="submit">SIGN UP</MColorButtonView>
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
