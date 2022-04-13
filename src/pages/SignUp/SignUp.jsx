import React from "react";
import {
  Container,
  Box,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import MTextField from "../../components/MInput/MTextField";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import { LockOpen } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./SignUp.scss";

const SignUp = () => {
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
        <Stack className="input-part" spacing={2}>
          <Stack direction="row" spacing={2}>
            <MTextField label="Firstname" />
            <MTextField label="Lastname" />
          </Stack>
          <MTextField label="Email" placeholder="Enter your email address" />
          <MTextField label="Password" placeholder="Enter your password" />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="I accept the terms of services"
          />
          <MColorButtonView>SIGN UP</MColorButtonView>
        </Stack>
        <section className="link-up-part">
          <Link to="/sign-in">Already have an account? Sign in</Link>
        </section>
      </Box>
    </Container>
  );
};

export default SignUp;
