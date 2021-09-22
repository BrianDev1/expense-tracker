import { createStore } from "redux";
import { StateType } from "typesafe-actions";
import rootReducer from "./reducer";

// Redux Store
const store = createStore(rootReducer);

// Issue getting typescript and Redux to work for useSelector
export type RootState = StateType<typeof rootReducer>;

export default store;
