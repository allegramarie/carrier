import { combineReducers } from "redux";
import campaigns from "./campaigns";
import contacts from "./contacts";
import user from "./user";
import error from "./error";

const rootReducer = combineReducers({
  user,
  campaigns,
  contacts,
  error
});

export default rootReducer;
