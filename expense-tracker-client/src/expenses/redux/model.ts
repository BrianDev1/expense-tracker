import { action, ActionType } from "typesafe-actions"; // Awesome library for type-safe action creation
import { Expense } from "../utils/types";

export interface ModelState {
  expenses: Expense[];
  selectedExpense?: Expense;
}

const initialState = {
  expenses: [],
  selectedExpense: undefined,
};

/** Action payload interfaces
 */
interface IUpdateExpense {
  expense: Expense;
}

/** Expense Actions */
const updateExpense = (p: IUpdateExpense) => action("UPDATE_EXPENSE", p);

//export type actions = { type: string; payload: IUpdateExpense };

export type expenseActions = ActionType<typeof updateExpense>;

export const expensesReducer = (
  state: ModelState = initialState,
  action: expenseActions
) => {
  switch (action.type) {
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses,
      };
    default:
      return state;
  }
};
