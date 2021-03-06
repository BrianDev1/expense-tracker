import { Epic, ofType } from "redux-observable";
import { of, catchError, switchMap } from "rxjs";
import { getType } from "typesafe-actions";
import { client } from "../../apollo/config";
import {
  createExpense,
  deleteExpense,
  fetchExpenses,
  ICreateExpense,
  IDeleteExpense,
  IFetchExpensesData,
  IUpdateExpense,
  updateExpense,
} from "../graphql/queriesAndMutations";
import { actions as expensesActions, expenseActionsType } from "../redux/model";

/* 100% Work in progress file as I learn more about RxJs and Redux observables */

/* First time using epics - Difficulty typing them
 * I Feel like all these Epics are similar in structure and can be consolidated somehow (Future improvement)
 */

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
        .mutate<ICreateExpense>({
          mutation: createExpense,
          variables: { inputCreateExpense: action.payload },
        })
        .then(({ data }) =>
          data
            ? expensesActions.createExpense.success(data.createExpense) // Running into issue with mutations returning data?
            : expensesActions.createExpense.failure(
                new Error("Error: Unable to return created expense.")
              )
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
    switchMap(
      (action) =>
        client
          .mutate<IUpdateExpense>({
            mutation: updateExpense,
            variables: { inputUpdateExpense: action.payload },
          })
          .then(({ data }) => {
            return data
              ? expensesActions.updateExpense.success(data.updateExpense) // Not sure why data is optional on mutations
              : expensesActions.updateExpense.failure(
                  new Error("Error: Unable to return deleted expense ID!")
                );
          })
          .catch((error) => expensesActions.updateExpense.failure(error)) // Not Sure If I need this error case
    ),
    catchError((error) => {
      return of(expensesActions.updateExpense.failure(error)); // From what I read in the docs this will catch if not in request ?
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
        .mutate<IDeleteExpense>({
          mutation: deleteExpense,
          variables: { id: action.payload.id },
        })
        .then(({ data }) => {
          return data
            ? expensesActions.deleteExpense.success(data.deleteExpense)
            : expensesActions.deleteExpense.failure(
                new Error("Error: Unable to return deleted expense ID!")
              );
        })
        .catch((error) => expensesActions.deleteExpense.failure(error))
    ),
    catchError((error) => {
      return of(expensesActions.deleteExpense.failure(error)); // In dont think this error is needed? I'm not sure though...
    })
  );
