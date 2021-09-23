import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Expense } from "../utils/types";
import { formatDate, taxAmount } from "../utils/utils";
import CustomButton from "./CustomButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflowX: "auto",
      margin: theme.spacing(1, 0),
    },
    tableFeatures: {
      [theme.breakpoints.down("sm")]: {
        minWidth: "750px",
      },
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
    <Grid container className={classes.root}>
      {/** Table Column Headings  */}
      <Grid container alignItems="center" className={classes.tableFeatures}>
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
      <Grid container className={classes.tableFeatures}>
        {expenses.length ? (
          expenses.map((expense, i) => (
            <Grid container alignItems="center" key={i}>
              <Grid item xs={3}>
                <Typography variant="body2">{expense.description}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">{`${expense.amount}`}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">{`${taxAmount(
                  expense.amount
                )}`}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">{`${formatDate(
                  expense.date
                )}`}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Grid container justifyContent="flex-end">
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
    </Grid>
  );
};

export default ExpenseTable;
