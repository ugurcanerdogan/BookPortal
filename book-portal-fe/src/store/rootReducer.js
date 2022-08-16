import { combineReducers } from "redux";
import authReducers from "../store/reducers/authReducers";

const rootReducer = combineReducers({
  auth: authReducers
});

export default rootReducer;