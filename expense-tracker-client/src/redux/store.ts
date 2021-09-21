import { createStore, combineReducers } from "redux";
import { expensesReducer } from "../expenses/redux/model";

/**
 * Single Store for expansion
 * Just add reducers as the app expands
 */
export const store = createStore(
  combineReducers({
    expenses: expensesReducer,
  })
);
