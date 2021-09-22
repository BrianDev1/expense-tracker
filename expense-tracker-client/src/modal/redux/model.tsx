import React from "react";
import { ActionType, action, Reducer } from "typesafe-actions"; // Awesome library for type-safe action creation
import ExpenseContainer from "../../expenses/containers/ExpenseContainer";
import { Expense } from "../../expenses/utils/types";

/* Model - Modal Actions and Reducer */

export type ModelState = {
  readonly modalType: "Dialog" | "Drawer"; // Can be extended
  readonly modalOpen: boolean;
  modalContent: JSX.Element;
};

export const initialState: ModelState = {
  modalType: "Dialog",
  modalOpen: true,
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
};

// Expense Actions Type
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
        modalType: "Dialog",
        modalContent: <ExpenseContainer />,
      };
    default:
      return state;
  }
};

export default modalReducer;
