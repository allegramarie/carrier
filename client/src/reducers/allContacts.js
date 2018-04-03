import { GET_ALL_CONTACTS, DELETE_GROUP_CONTACT } from "../constants";

const initialState = {
  allContacts: []
};

export default function addContact(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CONTACTS:
      return {
        allContacts: action.payload
      };
    case DELETE_GROUP_CONTACT:
      // console.log('in reducer')
      return {
        contacts: [...state.contacts, action.payload]
      };
    default:
      return state;
  }
}
