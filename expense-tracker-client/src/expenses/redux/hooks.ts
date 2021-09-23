import { actions as expensesActions } from "./model";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SRD } from "srd";
import { RootState } from "../../redux/store";
import { Expense } from "../utils/types";
// @returns { readonly Expense[]} Returns all Expenses
/**
 * Custom Hook to get expenses
 *
 */
export const useExpenses = () => {
  const dispatch = useDispatch();
  const expensesRemoteDate = useSelector(
    (state: RootState) => state.expense.expenses
  );

  useEffect(() => {
    SRD.match(
      {
        notAsked: () => null, // dispatch(expensesActions.fetchExpenses.request), // Do Nothing
        loading: () => null,
        failure: () => null,
        success: () => null,
      },
      expensesRemoteDate
    );
  }, [dispatch, expensesRemoteDate]);

  return expensesRemoteDate;
};

/**
 * Custom Hook to get selected Expense
 * @returns {Expense | undefined } Returns selected expense, undefined if no expense selected
 */
export const useSelectedExpense = (): Expense | undefined =>
  useSelector((state: RootState) => state.expense.selectedExpense);
