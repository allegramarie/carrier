import {
  ADD_GROUP,
  GET_GROUPS,
  UPDATE_GROUP,
  DELETE_GROUP
} from "../constants";

const initialState = {
  groups: []
};

export default function groups(state = initialState, action) {
  switch (action.type) {
    case ADD_GROUP:
      return {
        groups: [...state.groups, action.payload]
      };
    case GET_GROUPS:
      return {
        groups: action.payload
      };
    case UPDATE_GROUP:
      return {
        groups: [...state.groups, action.payload]
      };
    case DELETE_GROUP:
      return {
        groups: [...state.groups, action.payload]
      };

    default:
      return state;
  }
}
