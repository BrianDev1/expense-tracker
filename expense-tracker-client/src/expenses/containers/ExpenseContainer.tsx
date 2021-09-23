import React from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { useExpenses } from "../redux/hooks";
import { actions as modalActions } from "../../modal/redux/model";
import ExpenseTracker from "../views/ExpenseTracker";

/**
 * - Expense View Container
 * - Handles all logic and data operations
 * - Separates view from operations
 */
const ExpenseContainer = () => {
  const disptach = useDispatch();
  const expenses = useExpenses();
  const addNesExpense = compose(disptach, modalActions.openAddNewExpense);
  return <ExpenseTracker expenses={expenses} addNewExpense={addNesExpense} />;
};

export default ExpenseContainer;
