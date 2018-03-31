import { GET_ALL_CONTACTS } from "../constants";

const initialState = {
  allContacts: []
};

export default function addContact(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CONTACTS:
      return {
        allContacts: action.payload
      };
    default:
      return state;
  }
}
