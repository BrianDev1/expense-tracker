import { Epic, ofType } from "redux-observable";
import { of, catchError, switchMap } from "rxjs";
import { getType } from "typesafe-actions";
import { client } from "../../apollo/config"; //new client instance
import {
  createExpense,
  deleteExpense,
  fetchExpenses,
  ICreateExpense,
  IFetchExpensesData,
  updateExpense,
} from "../graphql/queriesAndMutations"; //mutation to do (using gql)
import { actions as expensesActions, expenseActionsType } from "../redux/model"; //import actions to use in the epic
import { Expense } from "../utils/types";

/* First time using epics - Difficulty typing them */

export const fetchExpensesEpic: Epic<expenseActionsType, expenseActionsType> = (
  action$
) =>
  action$.pipe(
    ofType(getType(expensesActions.fetchExpenses.request)),
    switchMap((action) =>
      client
        .query<IFetchExpensesData>({
          query: fetchExpenses,
        })
        .then(({ data }) =>
          expensesActions.fetchExpenses.success(data.fetchExpenses)
        )
        .catch((error) => expensesActions.fetchExpenses.failure(error))
    ),
    catchError((error) => {
      return of(expensesActions.fetchExpenses.failure(error));
    })
  );

/** Create Expense Epic */
export const createExpenseEpic: Epic<expenseActionsType, expenseActionsType> = (
  action$
) =>
  action$.pipe(
    ofType(getType(expensesActions.createExpense.request)),
    switchMap((action) =>
      client
        .query<ICreateExpense>({
          query: createExpense,
          variables: action.payload,
        })
        .then(({ data }) =>
          expensesActions.createExpense.success(data.createExpense)
        )
        .catch((error) => expensesActions.createExpense.failure(error))
    ),
    catchError((error) => {
      return of(expensesActions.createExpense.failure(error));
    })
  );

/** Update Expense Epic */
export const updateExpenseEpic: Epic<expenseActionsType, expenseActionsType> = (
  action$
) =>
  action$.pipe(
    ofType(getType(expensesActions.updateExpense.request)),
    switchMap((action) =>
      client
        .query<Expense>({
          query: updateExpense,
          variables: action.payload,
        })
        .then(({ data }) => expensesActions.updateExpense.success(data))
        .catch((error) => expensesActions.updateExpense.failure(error))
    ),
    catchError((error) => {
      return of(expensesActions.updateExpense.failure(error));
    })
  );

/** Delete Expense Epic */
export const deleteExpenceEpic: Epic<expenseActionsType, expenseActionsType> = (
  action$
) =>
  action$.pipe(
    ofType(getType(expensesActions.deleteExpense.request)),
    switchMap((action) =>
      client
        .query<string>({
          query: deleteExpense,
          variables: { id: action.payload.id },
        })
        .then(({ data }) => expensesActions.deleteExpense.success(data))
        .catch((error) => expensesActions.fetchExpenses.failure(error))
    ),
    catchError((error) => {
      return of(expensesActions.fetchExpenses.failure(error));
    })
  );
