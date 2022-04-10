import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import { useValidPassword, useValidUsername } from "../../hooks/useAuthHooks";
import { Password, Username } from "../../components/Fields";

import { AuthContext } from "../../context";
import useClasses from "../../hooks/useClassesHook";

import styles from "./styles";

const SignIn = () => {
  const classes = useClasses(styles);

  const { username, setUsername, usernameIsValid } = useValidUsername("");
  const { password, setPassword, passwordIsValid } = useValidPassword("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const isValid =
    !usernameIsValid ||
    username.length === 0 ||
    !passwordIsValid ||
    password.length === 0;

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const signInClicked = async () => {
    try {
      setLoading(true);
      await authContext.signInWithEmail(username, password);
      navigate("/home");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.code === "UserNotConfirmedException") {
        navigate("/verify");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <Grid className={classes.root} container>
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
        <Paper style={{ width: "100%", padding: 32 }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Box m={2}>
              <Typography variant="h3">Sign in</Typography>
            </Box>
            <Box width="80%" m={1}>
              <Username
                usernameIsValid={usernameIsValid}
                setUsername={setUsername}
              />{" "}
            </Box>
            <Box width="80%" m={1}>
              <Password
                label="Password"
                passwordIsValid={passwordIsValid}
                setPassword={setPassword}
              />
            </Box>
            <Box mt={2}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Box>
            <Box mt={2}>
              <Grid container direction="row" justify="center">
                <Box m={1}>
                  <Button
                    disabled={isValid || isLoading}
                    color="primary"
                    variant="contained"
                    onClick={signInClicked}
                  >
                    Sign In
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
            <Box mt={2}>
              <Box onClick={() => navigate("signup")}>
                <Typography className={classes.hover} variant="body1">
                  Register a new account
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignIn;
