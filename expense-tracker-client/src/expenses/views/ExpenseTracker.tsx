import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Expense } from "../utils/types";
import ExpenseTable from "../components/ExpenseTable";
import { actions as modalActions } from "../../modal/redux/model";
import ExpenseCounter from "../components/ExpenseCounter";

interface IExpenseTracker {
  readonly expenses: readonly Expense[];
  readonly addNewExpense: typeof modalActions.openAddNewExpense;
  readonly editClicked: (expense: Expense) => void;
  readonly deleteClicked: (id: string) => void;
  readonly subTotal: number;
  readonly total: number;
}

/**
 * Main Expense Tracker view
 */
const ExpenseTracker = ({
  expenses,
  addNewExpense,
  editClicked,
  deleteClicked,
  subTotal,
  total,
}: IExpenseTracker) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4">Expense Tracker</Typography>
      </Grid>
      <ExpenseCounter
        addNewExpense={addNewExpense}
        subTotal={subTotal}
        total={total}
      />
      <ExpenseTable
        expenses={expenses}
        editClicked={editClicked}
        deleteClicked={deleteClicked}
      />
    </Grid>
  );
};

export default ExpenseTracker;
