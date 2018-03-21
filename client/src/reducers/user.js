import { ADD_USER } from "../constants";

const initialState = {
  user: [
    {
      id: 1,
      name: "allegra",
      email: "postgres"
    }
  ]
};

export default function addUser(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state,
        //action.payload // Using this assumes a fully formed campaign object is the payload.
        {
          id: 1,
          name: "allegra",
          email: "postgres"
          // id: action.payload.id,
          // name: action.payload.name,
          // email: action.payload.email
        }
      ];

    default:
      return state;
  }
}
