import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { useExpenses } from "../redux/hooks";
import { actions as modalActions } from "../../modal/redux/model";
import { actions as expenseActions } from "../redux/model";
import ExpenseTracker from "../views/ExpenseTracker";
import { Expense } from "../utils/types";
import { TAX_RATE } from "../utils/utils";

/**
 * - Expense View Container
 * - Handles all logic and data operations
 * - Separates view from operations
 */
const ExpenseContainer = () => {
  const disptach = useDispatch();
  const expenses = useExpenses();
  const addNewExpense = compose(disptach, modalActions.openAddNewExpense);
  console.log("In here");
  const expenseSubtotal = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);
  const total = expenseSubtotal * TAX_RATE + expenseSubtotal;
  const handleDeleteClicked = (id: number) => {
    disptach(expenseActions.deleteExpense.request({ id: id }));
  };

  const handleEditClicked = (expense: Expense) => {
    disptach(modalActions.openUpdatedExpenseModal({ expense: expense }));
  };
  return (
    <ExpenseTracker
      expenses={expenses}
      addNewExpense={addNewExpense}
      editClicked={handleEditClicked}
      deleteClicked={handleDeleteClicked}
      subTotal={expenseSubtotal}
      total={total}
    />
  );
};

export default ExpenseContainer;
