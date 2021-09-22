import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

/**
 * Custom Hook to get expenses
 * @returns {Expense[]} Returns all Expenses
 */
export const useExpenses = () =>
  useSelector((state: RootState) => state.expense.expenses);
