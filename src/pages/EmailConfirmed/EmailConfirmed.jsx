import React, { useState, useEffect } from "react";
import { Container, Box, Stack } from "@mui/material";
import { Verified, DoNotTouch } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { emailVerified } from "../../store/users/actions";
import jwt from "jsonwebtoken";
import "dotenv/config";
const EmailConfirmed = (props) => {
  const dispatch = useDispatch();
  const { token, email } = props.match.params;
  const history = props.history;
  const [status, setStatus] = useState(false);
  console.log("token", token, "key::::", process.env.REACT_APP_SECRET);
  useEffect(() => {
    try {
      const { payload } = jwt.verify(token, process.env.REACT_APP_SECRET, {
        complete: true,
      });
      console.log(payload);
      if (!(payload && payload.email === email)) {
        window.location = "/";
      }
      setStatus(true);
      dispatch(emailVerified(email, history));
    } catch (error) {
      console.log("jwt Error: ", error);
    }
  }, []);

  return (
    <Container maxWidth="xs" sx={{ marginTop: "100px", marginBottom: "20px" }}>
      <Box
        sx={{
          p: 2,
          backgroundColor: "#36363666",
          padding: "20px",
        }}
      >
        {status ? (
          <section className="header">
            <Verified
              fontSize="large"
              sx={{
                backgroundColor: "#da4bfd",
                borderRadius: "50%",
                padding: "5px",
                color: "white",
              }}
            />
            <h2>Congratulations!</h2>
            <p>Your Email is Confirmed!</p>
          </section>
        ) : (
          <section className="header">
            <DoNotTouch
              fontSize="large"
              sx={{
                backgroundColor: "#da4bfd",
                borderRadius: "50%",
                padding: "5px",
                color: "white",
              }}
            />
            <h2>Unfortunately!</h2>
            <p>Your Email is not verified!</p>
          </section>
        )}

        <section className="link-part">
          <Link to="/sign-in">Sign In</Link>
        </section>
      </Box>
    </Container>
  );
};

export default EmailConfirmed;
