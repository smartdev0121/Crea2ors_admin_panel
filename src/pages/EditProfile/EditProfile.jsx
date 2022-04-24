import React from "react";
import { Container, Box, Stack, Button } from "@mui/material";
import MTextField from "../../components/MInput/MTextField";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/actions";
import { getSpinner } from "../../store/app/reducer";
import MSpinner from "../../components/MSpinner";
import InputAdornment from "@mui/material/InputAdornment";
import { StickContainer, Sticky } from "react-sticky";
import "./EditProfile.scss";

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
              <div className="edit-container">
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
                  <Field
                    type="text"
                    name="personalSite"
                    label="Personal Site or Portfolio"
                    InputLabelProps={{ shrink: true }}
                    multiline={true}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          https://
                        </InputAdornment>
                      ),
                    }}
                    component={MTextField}
                  />
                  <Field
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email address"
                    InputLabelProps={{ shrink: true }}
                    multiline={true}
                    component={MTextField}
                  />
                  <section className="veri-part">
                    <div>
                      <h2>Verification</h2>
                      <p>
                        Proceed with verification proceed to get more visibility
                        and gain trust on our Marketplace. Please allow up to
                        several weeks for the process
                      </p>
                    </div>

                    <div>
                      <Button>Get Verified</Button>
                    </div>
                  </section>

                  <MColorButtonView type="submit" disabled={submitting}>
                    Update Profile
                  </MColorButtonView>
                </Stack>
                <Stack>
                  <StickContainer>
                    <Sticky>
                      {({
                        style,
                        isSticky,
                        wasSticky,
                        distanceFromTop,
                        distanceFromBottom,
                        calculatedHeight,
                      }) => (
                        <div>
                          <div className="profile-image">
                            <img src="/images/profile-images/profile-empty.png" />
                          </div>
                          <p>
                            We recommend an image of at least 300X300. Gifs work
                            too. Max 5mb
                          </p>
                          <Button>Choose File</Button>
                        </div>
                      )}
                    </Sticky>
                  </StickContainer>
                </Stack>
              </div>
            </form>
          )}
        ></Form>
      </Box>
    </Container>
  );
};

export default EditProfile;
