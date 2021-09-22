import React from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { useExpenses } from "../redux/hooks";
import { actions as expenseActions } from "../redux/model";
import ExpenseTracker from "../views/ExpenseTracker";

const ExpenseContainer = () => {
  const disptach = useDispatch();
  const expenses = useExpenses();
  const editExpense = compose(disptach, expenseActions.updateExpense.request);
  return <ExpenseTracker expenses={expenses} />;
};

export default ExpenseContainer;
