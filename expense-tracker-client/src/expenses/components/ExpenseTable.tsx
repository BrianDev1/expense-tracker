import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Expense } from "../utils/types";
import clsx from "clsx";
import { formatDate, taxAmount } from "../utils/utils";
import CustomButton from "./CustomButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("sm")]: {
        overflow: "visible",
        width: "960px",
      },
    },
    tableSpacing: {
      margin: theme.spacing(1, 0),
    },
    noResult: {
      padding: theme.spacing(5),
    },
  })
);

interface IExpenseTracker {
  readonly expenses: readonly Expense[];
  readonly editClicked: (expense: Expense) => void;
  readonly deleteClicked: (id: number) => void;
}
/**
 * Custom Table component using GRID
 * @param {Expense[]} expenses - Array of Expenses
 * @returns A table component displaying expenses
 */
const ExpenseTable = ({
  expenses,
  editClicked,
  deleteClicked,
}: IExpenseTracker) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="flex-start"
      alignItems={"center"}
      className={clsx(classes.root, classes.tableSpacing)}
    >
      {/** Table Column Headings  */}
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Typography>Description</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Amount</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Taxes(15%)</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Date</Typography>
        </Grid>
      </Grid>
      {/* Table Rows */}
      {expenses.length ? (
        expenses.map((expense, i) => (
          <Grid container alignItems="center" key={i}>
            <Grid item xs={3}>
              <Typography>{expense.description}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>{`${expense.amount}`}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>{`${taxAmount(expense.amount)}`}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>{`${formatDate(expense.date)}`}</Typography>
            </Grid>
            <Grid item xs={3}>
              <CustomButton
                text={"Edit"}
                variant={"Yellow"}
                onclick={() => editClicked(expense)}
              />
              <CustomButton
                text={"Delete"}
                variant={"Red"}
                onclick={() => deleteClicked(expense.id)}
              />
            </Grid>
          </Grid>
        ))
      ) : (
        /* Empty Array */
        <Grid container justifyContent="center" className={classes.noResult}>
          <Grid item>
            <Typography variant="body1">{`0 expenses found, try adding one...`}</Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ExpenseTable;
