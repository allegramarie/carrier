import { ADD_CONTACT, GET_CONTACTS, DELETE_CONTACT } from "../constants";

const initialState = {
  contacts: []
};

export default function addContact(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        contacts: [...state.contacts, action.payload]
      };
    case GET_CONTACTS:
      return {
        contacts: action.payload
      };
    case DELETE_CONTACT:
      return {
        contacts: [...state.contacts, action.payload]
      };

    default:
      return state;
  }
}
