import React, { useContext, useState } from "react";
import {
  Button,
  Grid,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Paper,
  Table,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

import { styled } from "@mui/material/styles";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import ConfirmDialog from "../ConfirmDialog";
import AddExpense from "../AddExpense";
import { AuthContext } from "../../context";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ExpenseList = () => {
  const { data, deleteExpenseItem } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [addExpenseDialog, setAddExpenseDialog] = useState(false);
  const [expenseId, setExpenseId] = useState(null);

  const handleClickOpen = (expenseId) => {
    setOpen(true);
    setExpenseId(expenseId);
  };

  const handleClose = () => {
    setOpen(false);
    setExpenseId(null);
  };

  const handleCloseExpenseForm = () => {
    setAddExpenseDialog(false);
  };

  if (!data.length) {
    return (
      <div style={{ textAlign: "center" }}>
        <h5>No Expense found...</h5>
        <Button onClick={(_) => setAddExpenseDialog(true)}>Add Expense</Button>
        <AddExpense
          openExpense={addExpenseDialog}
          handleClose={handleCloseExpenseForm}
        />
      </div>
    );
  }

  return (
    <>
      <Grid>
        <Button
          onClick={(_) => setAddExpenseDialog(true)}
          style={{ float: "right" }}
        >
          Add Expense
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell align="right">Expense Type</StyledTableCell>
                <StyledTableCell align="right">Expense</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, idx) => (
                <StyledTableRow key={row.expenseId}>
                  <StyledTableCell component="th" scope="row">
                    {idx + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.date}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.expenseType}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.expense}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      onClick={() => {
                        handleClickOpen(row.expenseId);
                      }}
                    >
                      <DeleteForeverRoundedIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <AddExpense
        openExpense={addExpenseDialog}
        handleClose={handleCloseExpenseForm}
      />
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        expenseId={expenseId}
        deleteExpenseItem={deleteExpenseItem}
      />
    </>
  );
};

export default ExpenseList;
