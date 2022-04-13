import React from "react";
import { Container, Box, Stack } from "@mui/material";
import MTextField from "../../components/MInput/MTextField";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import { LockOpen } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./SignIn.scss";

const SignIn = () => {
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
          <h2>Sign in to your accout</h2>
        </section>
        <Stack className="input-part" spacing={2}>
          <MTextField label="Email" placeholder="Enter your email address" />
          <MTextField label="Password" placeholder="Enter your password" />
          <MColorButtonView>SIGN IN</MColorButtonView>
        </Stack>
        <section className="link-part">
          <Link to="/password-reset">Forgot password?</Link>
          <Link to="/sign-up">Don't have your account? Sign Up</Link>
        </section>
      </Box>
    </Container>
  );
};

export default SignIn;
