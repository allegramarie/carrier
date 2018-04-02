import { ADD_USER } from "../constants";

const initialState = {
  user: {
    id: 1,
    email: "allegra",
    password: "postgres"
  }
};

export default function addUser(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return {
        //action.payload // Using this assumes a fully formed campaign object is the payload.
        user: action.payload
      };

    default:
      return state;
  }
}
