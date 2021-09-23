import React from "react";
import { ActionType, action, Reducer } from "typesafe-actions"; // Awesome library for type-safe action creation
import AddEditExpenseContainer from "../../expenses/containers/AddEditExpenseContainer";
import { Expense } from "../../expenses/utils/types";

/* Model - Modal Actions and Reducer are stored here */

export type ModelState = {
  readonly modalType: "Dialog" | "Drawer"; // Can be extended
  readonly modalOpen: boolean;
  readonly modalContent: JSX.Element; // The component to display for a given modal (Posible anti-pattern) but it's great for use-case
};

export const initialState: ModelState = {
  modalType: "Dialog",
  modalOpen: false,
  modalContent: <></>,
};

/* Action payload interfaces */
interface IUpdateExpenseModal {
  expense: Expense;
}

// All Actions
export const actions = {
  openUpdatedExpenseModal: (p: IUpdateExpenseModal) =>
    action("OPEN_EDIT_EXPENSE_MODAL", p),
  closeModal: () => action("CLOSE_MODAL"),
  openAddNewExpense: () => action("OPEN_ADD_NEW_EXPENSE"),
};

// Modal Actions Type exported to the rest of the App
// Used in dispatches elsewhere in the App
export type modalActions = ActionType<typeof actions>;

const modalReducer: Reducer<ModelState, modalActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "CLOSE_MODAL":
      return {
        ...state,
        modalOpen: false,
      };

    case "OPEN_EDIT_EXPENSE_MODAL":
      return {
        ...state,
        modalOpen: true,
        modalContent: <AddEditExpenseContainer />,
      };

    case "OPEN_ADD_NEW_EXPENSE":
      return {
        ...state,
        modalOpen: true,
        modalContent: <AddEditExpenseContainer />,
      };
    default:
      return state;
  }
};

export default modalReducer;
