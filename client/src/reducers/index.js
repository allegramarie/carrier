import { combineReducers } from "redux";
import campaigns from "./campaigns";
import contacts from "./contacts";
import user from "./user";
import groups from "./groups";

const rootReducer = combineReducers({
  user,
  campaigns,
  contacts,
  groups
});

export default rootReducer;
