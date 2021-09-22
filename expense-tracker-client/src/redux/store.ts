import { createStore, applyMiddleware } from "redux";
import { StateType } from "typesafe-actions";
import rootReducer from "./reducer";
import logger from "redux-logger";

// Redux Store
const store = createStore(rootReducer, applyMiddleware(logger));

// Issue getting typescript and Redux to work for useSelector
export type RootState = StateType<typeof rootReducer>;

export default store;
