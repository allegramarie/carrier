import { combineReducers } from "redux";
import campaigns from "./campaigns";
import addContacts from "./addContacts";

const rootReducer = combineReducers({
  campaigns,
  addContacts
});

export default rootReducer;
