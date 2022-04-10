import React from "react";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const DateRange = ({ fromDate, toDate, handleFromChange, handleToChange }) => {
  return (
    <div style={{ marginBottom: 20, display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: 10 }}>Select Range:</span>
      <div style={{ marginRight: 10 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="From"
            inputFormat="dd/MM/yyyy"
            value={fromDate || new Date()}
            onChange={handleFromChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="To"
            inputFormat="dd/MM/yyyy"
            value={toDate || new Date()}
            onChange={handleToChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default DateRange;
