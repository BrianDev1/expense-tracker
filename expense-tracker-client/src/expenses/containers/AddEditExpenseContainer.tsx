import React from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { useSelectedExpense } from "../redux/hooks";
import { actions as expenseActions } from "../redux/model";
import AddEditExpenseForm from "../views/AddEditExpenseForm";

/**
 * - Add/Edit Expense Modal Container
 * - Handles all logic and data operations
 * - Separates view from operations
 */
const AddEditExpenseContainer = () => {
  const dispatch = useDispatch();
  // Hook to get the selected expense
  const selectedExpense = useSelectedExpense();
  const addNewExpense = compose(dispatch, expenseActions.createExpense.request);
  const updateExpense = compose(dispatch, expenseActions.updateExpense.request);
  return (
    <AddEditExpenseForm
      selectedExpense={selectedExpense}
      editSubmit={updateExpense}
      createSubmit={addNewExpense}
      type={selectedExpense ? "Edit" : "Add"}
    />
  );
};

export default AddEditExpenseContainer;
