import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Expense } from "../utils/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
    },
  })
);

interface IExpenseTracker {
  readonly expenses: readonly Expense[];
}

const ExpenseTracker = ({ expenses }: IExpenseTracker) => {
  return expenses.length ? (
    <Grid container justifyContent="flex-start" alignItems="center">
      <Grid item></Grid>
    </Grid>
  ) : (
    <Grid container justifyContent="center">
      <Typography>{`No Expenses found`}</Typography>
    </Grid>
  );
};

export default ExpenseTracker;
