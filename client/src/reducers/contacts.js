import { ADD_CONTACT, GET_CONTACTS } from "../constants";

const initialState = {
  contacts: []
};

export default function addContact(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      console.log("payload", action.payload);
      return {
        //action.payload // Using this assumes a fully formed campaign object is the payload.
        contacts: action.payload
        // Fill this in with a S3 URI later
      };
    case GET_CONTACTS:
      return {
        contacts: action.payload
      };

    default:
      return state;
  }
}
