import { combineEpics } from "redux-observable";
import {
  createExpenseEpic,
  deleteExpenceEpic,
  fetchExpensesEpic,
  updateExpenseEpic,
} from "./expenseEpics";

export const rootEpic = combineEpics(
  fetchExpensesEpic,
  createExpenseEpic,
  updateExpenseEpic,
  deleteExpenceEpic
);
