import { combineReducers } from "redux";
import expensesReducer from "../expenses/redux/model";

const rootReducer = combineReducers({
  expense: expensesReducer,
});

export default rootReducer;
