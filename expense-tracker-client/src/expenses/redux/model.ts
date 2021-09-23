import {
  ActionType,
  createAsyncAction,
  getType,
  Reducer,
} from "typesafe-actions"; // Awesome library for type-safe action creation
import { Expense } from "../utils/types";

/* Model - Contains Expenses Actions and reducer */

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
  id: number;
  description: string;
  amount: number;
}

interface ICreateExpense {
  description: string;
  amount: number;
}

interface IDeleteExpense {
  id: number;
}

/* Expense Actions Defined as async actions */
const updateExpense = createAsyncAction(
  "UPDATE_EXPENSE_REQUEST",
  "UPDATE_EXPENSE_SUCCESS",
  "UPDATE_EXPENSE_FAILURE"
)<IUpdateExpense, Expense, Error>();

const createExpense = createAsyncAction(
  "CREATE_EXPENSE_REQUEST",
  "CREATE_EXPENSE_SUCCESS",
  "CREATE_EXPENSE_FAILURE"
)<ICreateExpense, Expense, Error>();

const deleteExpense = createAsyncAction(
  "DELETE_EXPENSE_REQUEST",
  "DELETE_EXPENSE_SUCCESS",
  "DELETE_EXPENSE_FAILURE"
)<IDeleteExpense, number, Error>();

// All Actions grouped
export const actions = {
  updateExpense: updateExpense,
  createExpense: createExpense,
  deleteExpense: deleteExpense,
};

// Expense Actions Type for import in other files
export type expenseActions = ActionType<typeof actions>;

/* EXPENSE REDUCER */
const expensesReducer: Reducer<ModelState, expenseActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case getType(updateExpense.request):
      return {
        ...state,
      };

    case getType(updateExpense.success):
      return {
        ...state,
        expenses: state.expenses.map((expense) => {
          return expense.id === action.payload.id ? action.payload : expense;
        }),
      };

    case getType(createExpense.request):
      return {
        ...state,
        expenses: state.expenses,
      };

    case getType(createExpense.success):
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    case getType(deleteExpense.request):
      return {
        ...state,
        expenses: state.expenses,
      };

    case getType(deleteExpense.success):
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id === action.payload
        ),
      };
    default:
      return state;
  }
};

export default expensesReducer;
