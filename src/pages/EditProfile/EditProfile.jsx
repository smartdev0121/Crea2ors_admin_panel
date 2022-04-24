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
import InputAdornment from "@mui/material/InputAdornment";

const EditProfile = () => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector((state) => getSpinner(state, "login"));
  const onSubmit = (values) => {
    dispatch(login(values));
  };
  return (
    <Container maxWidth="xs" sx={{ marginTop: "100px", marginBottom: "20px" }}>
      {isSubmitting && <MSpinner />}
      <Box
        sx={{
          p: 2,
          backgroundColor: "#36363666",
          padding: "20px",
        }}
      >
        <section className="header">
          <h2>Edit Profile</h2>
          <p className="grey-txt">
            You can set preferred display name, create your branded profile URL
            and manage other personal settings
          </p>
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
                  type="text"
                  name="displayName"
                  label="Display name"
                  placeholder="Enter your display name"
                  InputLabelProps={{ shrink: true }}
                  component={MTextField}
                />
                <Field
                  type="text"
                  name="customUrl"
                  label="Custom URL"
                  placeholder="Enter your custom url"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        crea2ors.com/
                      </InputAdornment>
                    ),
                  }}
                  component={MTextField}
                />
                <Field
                  type="text"
                  name="bio"
                  label="Bio"
                  placeholder="Tell about yourself in a few words"
                  InputLabelProps={{ shrink: true }}
                  multiline={true}
                  component={MTextField}
                />
                <Field
                  type="text"
                  name="twitterUsername"
                  label="Twitter Username"
                  placeholder="Enter your name in Twitter"
                  helperText="Link Twitter account to gain more trust on the marketplace"
                  InputLabelProps={{ shrink: true }}
                  multiline={true}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">@</InputAdornment>
                    ),
                  }}
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

export default EditProfile;
