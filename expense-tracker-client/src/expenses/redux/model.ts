import { failure, loading, notAsked, RD, SRD, success } from "srd"; // Remote Data library
import {
  ActionType,
  createAsyncAction,
  getType,
  Reducer,
} from "typesafe-actions"; // Awesome library for type-safe action creation
import { modalActions } from "../../modal/redux/model";
import { Expense } from "../utils/types";

/* Model FILE - Contains Expenses Actions and reducer */

// EXPENSE STATE
export type ModelState = {
  readonly expenses: RD<Error, Expense[]>;
  readonly selectedExpense?: Expense;
  readonly buttonIsSubmitting: boolean;
};

export const initialState: ModelState = {
  expenses: notAsked(),
  selectedExpense: undefined,
  buttonIsSubmitting: false,
};

/* Action payload interfaces */
interface IUpdateExpense {
  id: string;
  description: string;
  amount: number;
}

interface ICreateExpense {
  description: string;
  amount: number;
}

interface IDeleteExpense {
  id: string;
}

/* Expense Actions Defined as async actions */

const fetchExpenses = createAsyncAction(
  "FETCH_EXPENSE_REQUEST",
  "FETCH_EXPENSE_SUCCESS",
  "FETCH_EXPENSE_FAILURE"
)<undefined, Expense[], Error>();

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
)<IDeleteExpense, string, Error>();

// All Actions grouped
export const actions = {
  fetchExpenses: fetchExpenses,
  updateExpense: updateExpense,
  createExpense: createExpense,
  deleteExpense: deleteExpense,
};

// Expense Actions Type for import in other files
export type expenseActionsType = ActionType<typeof actions>;

/* EXPENSE REDUCER */
const expensesReducer: Reducer<ModelState, expenseActionsType | modalActions> =
  (state = initialState, action) => {
    switch (action.type) {
      /* Fetch All Expenses */
      case getType(fetchExpenses.request):
        return {
          ...state,
          expenses: loading(), // Setting state to loading
        };

      case getType(fetchExpenses.success):
        return {
          ...state,
          expenses: success(action.payload), // Updating expenses with all expenses and setting state to success
          selectedExpense: undefined, // Setting selected Expense back to undefined
        };

      case getType(fetchExpenses.failure):
        return {
          ...state,
          expenses: failure(action.payload), // Setting the state to Failure
          selectedExpense: undefined, // Setting selected Expense back to undefined
        };

      /* Update Expense */
      case getType(updateExpense.request):
        return {
          ...state,
          buttonIsSubmitting: true,
        };

      case getType(updateExpense.success):
        return {
          ...state,
          // Updating expense in our current list of expenses
          // Have to do a MATCH to access the data in Success state
          expenses: SRD.match(
            {
              notAsked: () => state.expenses,
              loading: () => state.expenses,
              failure: () => state.expenses,
              success: (allExpenses) =>
                success(
                  allExpenses.map((expense) => {
                    return expense.id === action.payload.id
                      ? action.payload
                      : expense;
                  })
                ),
            },
            state.expenses
          ),
          selectedExpense: undefined, // Setting selected Expense back to undefined
          buttonIsSubmitting: false,
        };

      /* Create Expense */
      case getType(createExpense.request):
        return {
          ...state,
          buttonIsSubmitting: true,
        };

      case getType(createExpense.success):
        return {
          ...state,
          //Have to do a MATCH to access the data in Success state
          expenses: SRD.match(
            {
              notAsked: () => state.expenses,
              loading: () => state.expenses,
              failure: () => state.expenses,
              success: (theExpenses) =>
                success([...theExpenses, action.payload]),
            },
            state.expenses
          ),
          selectedExpense: undefined,
          buttonIsSubmitting: false,
        };

      /* Delete Expense */
      case getType(deleteExpense.request):
        return {
          ...state,
          buttonIsSubmitting: true,
        };

      case getType(deleteExpense.success):
        return {
          ...state,
          // Removing deleted expense from our list of expenses
          // Have to do a MATCH to access the data in Success state
          expenses: SRD.match(
            {
              notAsked: () => state.expenses,
              loading: () => state.expenses,
              failure: () => state.expenses,
              success: (myExpenses) =>
                success(
                  myExpenses.filter((expense) => expense.id !== action.payload)
                ),
            },
            state.expenses
          ),
          selectedExpense: undefined,
          buttonIsSubmitting: false,
        };

      /* Side Affect Actions (MODAL ACTIONS) */
      // Possible anti-pattern but I wanted to use it to update expense `selectedExpense` state

      case "OPEN_EDIT_EXPENSE_MODAL":
        return {
          ...state,
          selectedExpense: action.payload.expense,
        };

      // If modal closed, set selected back to initial state
      case "CLOSE_MODAL":
        return {
          ...state,
          selectedExpense: undefined,
          buttonIsSubmitting: false,
        };
      default:
        return state;
    }
  };

export default expensesReducer;
