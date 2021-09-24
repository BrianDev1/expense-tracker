import { actions as expensesActions } from "./model";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SRD } from "srd";
import { RootState } from "../../redux/store";
import { Expense } from "../utils/types";

/**
 * Custom Hook to get Expenses Array
 *  @returns Returns all Expenses in RemoteData type format
 */
export const useExpenses = () => {
  const dispatch = useDispatch();
  const expensesRemoteDate = useSelector(
    (state: RootState) => state.expense.expenses
  );

  // Use effect to fetch all posts everytime the Remotedata state is notAsked() === Initialized
  useEffect(() => {
    SRD.match(
      {
        notAsked: () => dispatch(expensesActions.fetchExpenses.request()), // Fetch all Expenses (Initial Page Load)
        loading: () => null, // Do Nothing
        failure: () => null, // Do Nothing
        success: () => null, // Do Nothing
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

/**
 * Custom Hook to get button state (Disabled --> true : false)
 * @returns { boolean } Returns button disabled state
 */
export const useButtonState = (): boolean =>
  useSelector((state: RootState) => state.expense.buttonIsSubmitting);
