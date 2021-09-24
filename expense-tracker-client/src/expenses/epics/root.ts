import { combineEpics } from "redux-observable";
import {
  createExpenseEpic,
  deleteExpenceEpic,
  fetchExpensesEpic,
  updateExpenseEpic,
} from "./expenseEpics";

export const rootEpic = combineEpics(
  deleteExpenceEpic,
  fetchExpensesEpic,
  createExpenseEpic,
  updateExpenseEpic
);
