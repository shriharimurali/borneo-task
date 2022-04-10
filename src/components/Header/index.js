import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { AuthContext } from "../../context";

export default function Header() {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Expense Manager
          </Typography>
          <Button color="inherit" onClick={() => signOut(navigate)}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
