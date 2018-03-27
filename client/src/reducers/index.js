import { combineReducers } from "redux";
import campaigns from "./campaigns";
import contacts from "./contacts";
import user from "./user";

const rootReducer = combineReducers({
  user,
  campaigns,
  contacts
});

export default rootReducer;
