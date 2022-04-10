import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import { useValidCode, useValidUsername } from "../../hooks/useAuthHooks";
import { Code, Username } from "../../components/Fields";

import { AuthContext } from "../../context";

import useClasses from "../../hooks/useClassesHook";

import styles from "./styles";

const VerifyCode = () => {
  const classes = useClasses(styles);

  const { username, setUsername, usernameIsValid } = useValidUsername("");
  const { code, setCode, codeIsValid } = useValidCode("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const isValid =
    !usernameIsValid ||
    username.length === 0 ||
    !codeIsValid ||
    code.length === 0;

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const sendClicked = async () => {
    try {
      setLoading(true);
      await authContext.verifyCode(username, code);
      setLoading(false);
      navigate("/signin");
    } catch (err) {
      setLoading(false);
      setError("Invalid Code");
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
            {/* Title */}
            <Box m={2}>
              <Typography variant="h3">Send Code</Typography>
            </Box>

            {/* Sign In Form */}
            <Box width="80%" m={1}>
              {/* <Email emailIsValid={emailIsValid} setEmail={setEmail} /> */}
              <Username
                usernameIsValid={usernameIsValid}
                setUsername={setUsername}
              />{" "}
            </Box>
            <Box width="80%" m={1}>
              <Code codeIsValid={codeIsValid} setCode={setCode} />
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
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate("/signup")}
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
                    onClick={sendClicked}
                  >
                    Send
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
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VerifyCode;
