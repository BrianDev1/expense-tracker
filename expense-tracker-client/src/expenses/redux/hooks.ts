import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Expense } from "../utils/types";

/**
 * Custom Hook to get expenses
 * @returns {Expense[]} Returns all Expenses
 */
export const useExpenses = (): Expense[] =>
  useSelector((state: RootState) => state.expense.expenses);
