import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Expense } from "../utils/types";
import CustomButton from "../components/CustomButton";
import ExpenseTable from "../components/ExpenseTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1, 0),
    },
    h1: {},
    buttonCtn: {
      maxWidth: theme.spacing(25),
      maxHeight: theme.spacing(6),
    },
  })
);

interface IExpenseTracker {
  readonly expenses: readonly Expense[];
  readonly addNewExpense: 
}

const ExpenseTracker = ({ expenses }: IExpenseTracker) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.margin}>
      <Grid item xs={12}>
        <Typography variant="h4">Expense Tracker</Typography>
      </Grid>
      <Grid container justifyContent="space-between" className={classes.margin}>
        <Grid container item xs={7} sm={8} spacing={1}>
          <Grid item xs={12}>
            <Typography variant="caption">{`The Sub-total of expenses is $${100}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">{`The Total with taxes is $${100} `}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={5} sm={4} className={classes.buttonCtn}>
          <CustomButton
            onclick={() => console.log("Clicked")}
            variant={"Green"}
            text={"Add new expense"}
            fullWidth
          />
        </Grid>
      </Grid>
      <ExpenseTable expenses={expenses} />
    </Grid>
  );
};

export default ExpenseTracker;
