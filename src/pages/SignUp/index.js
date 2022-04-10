import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import {
  useValidEmail,
  useValidPassword,
  useValidUsername,
} from "../../hooks/useAuthHooks";
import { Email, Password, Username } from "../../components/Fields";

import { AuthContext } from "../../context";

import useClasses from "../../hooks/useClassesHook";

import styles from "./styles";

const SignUp = () => {
  const classes = useClasses(styles);

  const { email, setEmail, emailIsValid } = useValidEmail("");
  const { password, setPassword, passwordIsValid } = useValidPassword("");
  const { username, setUsername, usernameIsValid } = useValidUsername("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const {
    password: passwordConfirm,
    setPassword: setPasswordConfirm,
    passwordIsValid: passwordConfirmIsValid,
  } = useValidPassword("");

  const isValid =
    !emailIsValid ||
    email.length === 0 ||
    !usernameIsValid ||
    username.length === 0 ||
    !passwordIsValid ||
    password.length === 0 ||
    !passwordConfirmIsValid ||
    passwordConfirm.length === 0;

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const signUpClicked = async () => {
    try {
      setLoading(true);
      await authContext.signUpWithEmail(username, email, password);
      setCreated(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const signUp = (
    <>
      <Box width="80%" m={1}>
        <Email emailIsValid={emailIsValid} setEmail={setEmail} />
      </Box>
      <Box width="80%" m={1}>
        <Username usernameIsValid={usernameIsValid} setUsername={setUsername} />
      </Box>
      <Box width="80%" m={1}>
        <Password
          label="Password"
          passwordIsValid={passwordIsValid}
          setPassword={setPassword}
        />
      </Box>
      <Box width="80%" m={1}>
        <Password
          label="Confirm Password"
          passwordIsValid={passwordConfirmIsValid}
          setPassword={setPasswordConfirm}
        />
      </Box>
      <Box mt={2}>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </Box>

      {/* Buttons */}
      <Box mt={2}>
        <Grid container direction="row" justify="center">
          <Box m={1}>
            <Button
              onClick={() => navigate("/signIn")}
              color="secondary"
              variant="contained"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </Box>
          <Box m={1}>
            <Button
              disabled={isValid || isLoading}
              color="primary"
              variant="contained"
              onClick={signUpClicked}
            >
              Sign Up
              {isLoading && (
                <CircularProgress
                  style={{
                    width: 14,
                    height: 14,
                    marginLeft: 10,
                    color: "#000",
                  }}
                />
              )}
            </Button>
          </Box>
        </Grid>
      </Box>
    </>
  );

  const accountCreated = (
    <>
      <Typography variant="h5">{`Created ${username} account`}</Typography>
      <Typography variant="h6">{`Verfiy Code sent to ${email}`}</Typography>

      <Box m={4}>
        <Button
          onClick={() => navigate("/verify")}
          color="primary"
          variant="contained"
        >
          Send Code
        </Button>
      </Box>
    </>
  );

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid
        xs={11}
        sm={6}
        lg={4}
        container
        direction="row"
        justify="center"
        alignItems="center"
        item
      >
        <Paper style={{ width: "100%", padding: 16 }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            {/* Title */}
            <Box m={3}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Typography variant="h3">Sign Up</Typography>
              </Grid>
            </Box>

            {!created ? signUp : accountCreated}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUp;
