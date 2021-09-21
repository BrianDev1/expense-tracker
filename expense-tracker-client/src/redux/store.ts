import { createStore } from "redux";
import rootReducer from "./reducer";

// Redux Store
const store = createStore(rootReducer);

export default store;
