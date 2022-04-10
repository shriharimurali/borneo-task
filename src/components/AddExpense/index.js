import React, { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { format } from "date-fns";

import { AuthContext } from "../../context";

const AddExpense = ({ openExpense, handleClose }) => {
  const { addExpenseItem } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    date: format(new Date(), "dd/MM/yyyy"),
  });
  const [date, setDate] = useState(new Date());
  // const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, ...{ [e.target.name]: e.target.value } });
  };

  const handleDateChange = (e) => {
    setDate(new Date(e));
    const date = format(new Date(e), "dd/MM/yyyy");
    setFormData({ ...formData, ...{ date } });
  };

  const addExpenseApi = async () => {
    const id = Math.floor(Math.random() * 10);
    const data = { ...formData, ...{ id } };
    await addExpenseItem(data);
    handleClose();
  };

  return (
    <Dialog open={openExpense} onClose={handleClose}>
      <DialogTitle>Add Expense</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          {/* <TextField fullWidth label="Expense Id" type="number" /> */}
          <TextField
            fullWidth
            label="Expense Type"
            name="type"
            type="text"
            required
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Date of spend"
              inputFormat="dd/MM/yyyy"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            required
            name="amount"
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={addExpenseApi}>Submit</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpense;
