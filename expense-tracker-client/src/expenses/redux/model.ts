import { failure, loading, notAsked, RD, SRD, success } from "srd";
import {
  ActionType,
  createAsyncAction,
  getType,
  Reducer,
} from "typesafe-actions"; // Awesome library
import { modalActions } from "../../modal/redux/model";
import { Expense } from "../utils/types";

/* Model FILE - Contains Expenses State, Actions and reducer
   all in single file for ease of reading

   PS. (Sorry for all the comments. I just want you to understand without my explanation)
 */

// EXPENSE STATE
export type ModelState = {
  readonly expenses: RD<Error, Expense[]>; // RD ---> https://www.npmjs.com/package/srd?activeTab=readme   (Remote Data type)
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
          expenses: success(action.payload), // Updating expenses to success state with payload
          selectedExpense: undefined, // Setting selected Expense back to undefined
        };

      case getType(fetchExpenses.failure):
        return {
          ...state,
          expenses: failure(action.payload), // Setting the state to Failure
          selectedExpense: undefined,
        };

      /* Update Expense */
      case getType(updateExpense.request):
        return {
          ...state,
          buttonIsSubmitting: true, // Button will be disabled
        };

      case getType(updateExpense.success):
        return {
          ...state,
          expenses: SRD.map(
            allExpenses => allExpenses.map((expense) => expense.id === action.payload.id ? action.payload : expense), 
            state.expenses
          ),
          selectedExpense: undefined,
          buttonIsSubmitting: false, // Button Not disabled
        };

      case getType(updateExpense.failure):
        return {
          ...state,
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
          expenses: SRD.map(theExpenses => [...theExpenses, action.payload], state.expenses),
          selectedExpense: undefined,
          buttonIsSubmitting: false,
        };

      case getType(createExpense.failure):
        return {
          ...state,
          buttonIsSubmitting: false,
        };

      /* Delete Expense */
      case getType(deleteExpense.request):
        return {
          ...state,
        };

      case getType(deleteExpense.success):
        return {
          ...state,
          // Removing deleted expense from expense state array
          expenses: SRD.map(myExpenses => myExpenses.filter((expense) => expense.id !== action.payload), state.expenses),
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
