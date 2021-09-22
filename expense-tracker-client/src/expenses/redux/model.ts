import { ActionType, createAsyncAction, getType } from "typesafe-actions"; // Awesome library for type-safe action creation
import { Expense } from "../utils/types";

export type ModelState = {
  readonly expenses: Expense[];
  readonly selectedExpense?: Expense;
};

export const initialState: ModelState = {
  expenses: [],
  selectedExpense: undefined,
};

/* Action payload interfaces */
interface IUpdateExpense {
  expense: Expense;
}

/* Expense Actions */
const updateExpense = createAsyncAction(
  "UPDATE_EXPENSE_REQUEST",
  "UPDATE_EXPENSE_SUCCESS",
  "UPDATE_EXPENSE_FAILURE"
)<IUpdateExpense, Expense, Error>();

export const actions = {
  updateExpense: updateExpense,
};
//export type actions = { type: string; payload: IUpdateExpense };

export type expenseActions = ActionType<typeof actions>;

const expensesReducer = (
  state: ModelState = initialState,
  action: expenseActions
) => {
  switch (action.type) {
    case getType(updateExpense.request):
      console.log(state.expenses, action.payload);
      return {
        ...state,
        expenses: state.expenses,
      };
    default:
      return state;
  }
};

export default expensesReducer;