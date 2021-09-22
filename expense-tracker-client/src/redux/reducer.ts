import { combineReducers } from "redux";
import expensesReducer from "../expenses/redux/model";
import modalReducer from "../modal/redux/model";

const rootReducer = combineReducers({
  expense: expensesReducer,
  modal: modalReducer,
});

export default rootReducer;
