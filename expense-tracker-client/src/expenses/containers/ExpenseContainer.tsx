import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { useExpenses } from "../redux/hooks";
import { actions as modalActions } from "../../modal/redux/model";
import { actions as expenseActions } from "../redux/model";
import ExpenseTracker from "../views/ExpenseTracker";
import { Expense } from "../utils/types";
import { TAX_RATE } from "../utils/utils";
import { SRD } from "srd";
import { CircularProgress } from "@material-ui/core";
import ErrorPage from "../../common/ErrorPage";

/**
 * - Expense View Container
 * - Handles all logic and data operations
 * - Separates view from operations
 */
const ExpenseContainer = () => {
  const disptach = useDispatch();
  const expenses = useExpenses();
  const addNewExpense = compose(disptach, modalActions.openAddNewExpense);
  // Expense totals - this could be calculated in the backend and sent over
  // for simplicity I'll leave it here
  const expenseSubtotal = useMemo(() => {
    return SRD.isSuccess(expenses)
      ? expenses.data.reduce((total, expense) => total + expense.amount, 0)
      : 0;
  }, [expenses]);
  const total = expenseSubtotal * TAX_RATE + expenseSubtotal;

  const handleDeleteClicked = (id: number) => {
    disptach(expenseActions.deleteExpense.request({ id: id }));
  };

  const handleEditClicked = (expense: Expense) => {
    disptach(modalActions.openUpdatedExpenseModal({ expense: expense }));
  };

  return SRD.match(
    {
      notAsked: () => <CircularProgress />, // Loading
      loading: () => <CircularProgress />, // Loading
      failure: (Error) => (
        <ErrorPage code={Error.name} message={Error.message} />
      ),
      success: (allExpenses: Expense[]) => (
        <ExpenseTracker
          expenses={allExpenses}
          addNewExpense={addNewExpense}
          editClicked={handleEditClicked}
          deleteClicked={handleDeleteClicked}
          subTotal={expenseSubtotal}
          total={total}
        />
      ),
    },
    expenses
  );
};

export default ExpenseContainer;
