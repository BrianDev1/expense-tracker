import { createStore, applyMiddleware } from "redux";
import { StateType } from "typesafe-actions";
import rootReducer from "./reducer";
import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "../expenses/epics/root";

// Epic Middleware
const epicMiddleware = createEpicMiddleware();

// Redux Store
const store = createStore(rootReducer, applyMiddleware(logger, epicMiddleware));

// Issue getting typescript and Redux to work for useSelector
export type RootState = StateType<typeof rootReducer>;

//Epic Middleware run
epicMiddleware.run(rootEpic);

export default store;
