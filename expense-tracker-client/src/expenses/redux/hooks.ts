import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Expense } from "../utils/types";

/**
 * Custom Hook to get expenses
 * @returns { readonly Expense[]} Returns all Expenses
 */
export const useExpenses = (): readonly Expense[] =>
  useSelector((state: RootState) => state.expense.expenses);

/**
 * Custom Hook to get selected Expense
 * @returns {Expense | undefined } Returns selected expense, undefined if no expense selected
 */
export const useSelectedExpense = (): Expense | undefined =>
  useSelector((state: RootState) => state.expense.selectedExpense);
