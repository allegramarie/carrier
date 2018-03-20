import { ADD_CONTACT } from "../constants";

const initialState = [
  {
    // an example of a campaign
    id: 1,
    name: "student",
    email: "hack@hackreactor.com" // Fill this in with a S3 URI later
  }
];

export default function addContact(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return [
        ...state,
        //action.payload // Using this assumes a fully formed campaign object is the payload.
        {
          id:
            state.reduce(
              (maxId, contactID) => Math.max(contactID.id, maxId),
              -1
            ) + 1,
          name: action.text,
          email: action.text
          // Fill this in with a S3 URI later
        }
      ];

    default:
      return state;
  }
}
