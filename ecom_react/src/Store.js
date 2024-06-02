import { combineReducers, legacy_createStore } from "redux";
import cartReducer from "./Redux/Reducer/cartReducer";
import studentReducer from "./Redux/Reducer/studentReducer";
const reducer = combineReducers({
  cart: cartReducer,
  student: studentReducer,
});
const store = legacy_createStore(reducer);
export default store;
