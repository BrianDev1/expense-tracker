import { Epic } from "redux-observable";
import { filter, mapTo, of, catchError, mergeMap } from "rxjs";
import { client } from "../../apollo/config"; //new client instance
import { fetchExpenses } from "../graphql/queriesAndMutations"; //mutation to do (using gql)
import { actions as expensesActions, expenseActionsType } from "../redux/model"; //import actions to use in the epic

const testEpic: Epic<expenseActionsType, expenseActionsType> = (action$) =>
  action$.pipe(
    mergeMap((action) =>
      client
        .query({
          query: fetchExpenses,
          variables: {
            id: action.id,
            defaultLanguage: action.selected_language,
            defaultTimeZoneId: action.selected_timeZone,
          },
        })
        .then((result) => changeLanguageFulfilled(result.data))
        .catch((error) => changeLanguageError(error))
    ),
    catchError((error) => {
      // Comment this line and the error goes away
      if (error === "timeout") return of(ActionCreators.timeout(1));
      return of(expensesActions.fetchExpenses.failure(error));
    })
  );

// export const fetchExpensesEpic: Epic<expenseActionsType, expenseActionsType> = (
//   action$
// ) => {
//   return {};
//   //   return action$.ofType("").mergeMap((action) =>
//   //     client
//   //       .query({
//   //         query: fetchExpenses,
//   //         variables: {
//   //           id: action.id,
//   //           defaultLanguage: action.selected_language,
//   //           defaultTimeZoneId: action.selected_timeZone,
//   //         },
//   //       })
//   //       .then((result) => changeLanguageFulfilled(result.data))
//   //       .catch((error) => changeLanguageError(error))
//   //   );
// };
