import React from "react";

import TextField from "@mui/material/TextField";

export const Email = ({ emailIsValid, setEmail }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={emailIsValid ? "Email" : "Invalid Email"}
      error={!emailIsValid}
      onChange={(evt) => {
        setEmail(evt.target.value);
      }}
    />
  );
};

export const Password = ({ label, passwordIsValid, setPassword }) => {
  return (
    <TextField
      fullWidth
      type="password"
      variant="outlined"
      label={passwordIsValid ? label : "Minimum 8 characters"}
      error={!passwordIsValid}
      onChange={(evt) => {
        setPassword(evt.target.value);
      }}
    />
  );
};

export const Username = ({ usernameIsValid, setUsername }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={usernameIsValid ? "Username" : "Minimum 8 characters"}
      error={!usernameIsValid}
      onChange={(evt) => {
        setUsername(evt.target.value);
      }}
    />
  );
};

export const Code = ({ codeIsValid, setCode }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={codeIsValid ? "Code" : "Minimum 6 characters"}
      error={!codeIsValid}
      onChange={(evt) => {
        setCode(evt.target.value);
      }}
    />
  );
};
