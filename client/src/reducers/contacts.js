import { ADD_CONTACT, GET_CONTACTS } from "../constants";

const initialState = {
  contacts: []
};

export default function addContact(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return [
        ...state,
        //action.payload // Using this assumes a fully formed campaign object is the payload.
        {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email
          // Fill this in with a S3 URI later
        }
      ];
    case GET_CONTACTS:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email
        }
      ];

    default:
      return state;
  }
}
