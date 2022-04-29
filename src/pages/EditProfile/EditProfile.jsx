import React, { useEffect, useState } from "react";
import { Container, Box, Stack, Button } from "@mui/material";
import MTextField from "../../components/MInput/MTextField";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/actions";
import { getSpinner } from "../../store/app/reducer";
import MSpinner from "../../components/MSpinner";
import InputAdornment from "@mui/material/InputAdornment";
import { getUserInfo } from "../../store/users/actions";
import "./EditProfile.scss";

const EditProfile = () => {
  const dispatch = useDispatch();
  const [sidebarWidth, setSidebarWidth] = useState(undefined);
  const [file, setFile] = useState();
  const [sidebarTop, setSidebarTop] = useState(undefined);
  const [boxBottom, setBoxBottom] = useState(undefined);
  const hiddenFileInput = React.useRef(null);

  const handleFileChange = (e) => {
    uploader(e);
    setFile(e.target.files[0]);
  };

  const handleImageClick = () => {
    hiddenFileInput.current.click();
  };

  const useDisplayImage = () => {
    const [result, setResult] = useState("");

    const uploader = (e) => {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    };

    return { result, uploader };
  };

  useEffect(() => {
    const sidebarEl = document
      .querySelector(".sidebar")
      .getBoundingClientRect();
    setSidebarWidth(sidebarEl.width);
    setSidebarTop(sidebarEl.top);

    const boxEl = document
      .querySelector(".MuiBox-root")
      .getBoundingClientRect();
    setBoxBottom(boxEl.bottom);
    console.log(boxEl.bottom);
  }, []);

  useEffect(() => {
    if (!sidebarTop) return;

    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, [sidebarTop]);

  const isSticky = (e) => {
    const sidebarEl = document.querySelector(".sidebar");
    const scrollTop = window.scrollY;
    if (scrollTop >= sidebarTop - 10 && scrollTop < sidebarTop + 200) {
      sidebarEl.classList.add("is-sticky");
    } else {
      sidebarEl.classList.remove("is-sticky");
    }
  };

  const isSubmitting = useSelector((state) => getSpinner(state, "login"));

  const onSubmit = (values) => {
    dispatch(login(values));
  };

  const { result, uploader } = useDisplayImage();
  return (
    <Container maxWidth="md" sx={{ marginTop: "100px", marginBottom: "20px" }}>
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
              <Stack direction="row" spacing={2}>
                <Stack className="input-part" spacing={2}>
                  <Field
                    type="text"
                    name="displayName"
                    label="Display name"
                    placeholder="Enter your display name"
                    InputLabelProps={{ shrink: true }}
                    component={MTextField}
                    variant="standard"
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
                    variant="standard"
                    component={MTextField}
                  />
                  <Field
                    type="text"
                    name="bio"
                    label="Bio"
                    placeholder="Tell about yourself in a few words"
                    InputLabelProps={{ shrink: true }}
                    multiline={true}
                    variant="standard"
                    component={MTextField}
                  />
                  {/* <Field
                    type="text"
                    name="twitterUsername"
                    label="Twitter Username"
                    placeholder="Enter your name in Twitter"
                    helperText="Link Twitter account to gain more trust on the marketplace"
                    InputLabelProps={{ shrink: true }}
                    multiline={true}
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">@</InputAdornment>
                      ),
                    }}
                    component={MTextField}
                  />
                  <Field
                    type="text"
                    name="instagramName"
                    label="Instagram Username"
                    placeholder="Enter your name in Instagram"
                    helperText="Link Instagram account to gain more trust on the marketplace"
                    InputLabelProps={{ shrink: true }}
                    multiline={true}
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">@</InputAdornment>
                      ),
                    }}
                    component={MTextField}
                  /> */}
                  <Field
                    type="text"
                    name="personalSite"
                    label="Personal Site or Portfolio"
                    InputLabelProps={{ shrink: true }}
                    multiline={true}
                    variant="standard"
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
                    variant="standard"
                    placeholder="Enter your email address"
                    InputLabelProps={{ shrink: true }}
                    multiline={true}
                    component={MTextField}
                  />
                  <section className="veri-part">
                    <div>
                      <h3>Verification</h3>
                      <p className="grey-txt">
                        Proceed with verification proceed to get more visibility
                        and gain trust on our Marketplace. Please allow up to
                        several weeks for the process
                      </p>
                    </div>

                    <div>
                      <Button className="blue-btn">Get verified</Button>
                    </div>
                  </section>

                  <MColorButtonView type="submit" disabled={submitting}>
                    Update Profile
                  </MColorButtonView>
                </Stack>
                <div
                  className="sticky-container"
                  style={{ minWidth: sidebarWidth }}
                >
                  <div className="sidebar" style={{ maxWidth: sidebarWidth }}>
                    <input
                      ref={hiddenFileInput}
                      type="file"
                      id="image-file"
                      accept=".jpg, .png, .jpeg, .bmp"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    <div className="profile-image" onClick={handleImageClick}>
                      <img
                        src={
                          result || "/images/profile-images/profile-empty.png"
                        }
                      />
                    </div>
                    <p>
                      We recommend an image of at least 300X300. Gifs work too.
                      Max 5mb
                    </p>
                    <Button className="blue-btn" onClick={handleImageClick}>
                      Choose File
                    </Button>
                  </div>
                </div>
              </Stack>
            </form>
          )}
        ></Form>
      </Box>
    </Container>
  );
};

export default EditProfile;
