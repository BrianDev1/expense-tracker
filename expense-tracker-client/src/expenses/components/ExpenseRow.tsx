import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
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
  return (
    <Grid container justifyContent="flex-start" alignItems="center">
      <Grid item></Grid>
    </Grid>
  );
};

export default ExpenseTracker;
