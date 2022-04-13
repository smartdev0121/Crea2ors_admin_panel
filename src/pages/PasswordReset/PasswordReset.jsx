import React from "react";
import { Container, Box, Stack } from "@mui/material";
import MTextField from "../../components/MInput/MTextField";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import { LockOpen } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./PasswordReset.scss";

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
          <h2>Password Reset Request</h2>
          <p>
            Enter your login name & verified email address and we will send you
            a password reset code
          </p>
        </section>
        <Stack className="input-part" spacing={2}>
          <MTextField label="Email" placeholder="Enter your email address" />
          <MColorButtonView>SUBMIT RESET REQUEST</MColorButtonView>
        </Stack>
        <section className="link-part">
          <Link to="/sign-up">Sign Up</Link>
          <Link to="/sign-in">Sign In</Link>
        </section>
      </Box>
    </Container>
  );
};

export default SignIn;
