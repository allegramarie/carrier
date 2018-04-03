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
      // console.log(action.payload, 'payload')

      return {
        //action.payload // Using this assumes a fully formed campaign object is the payload.
        groups: [...state.groups, action.payload]
        // id: 1,
        // name: 'This is a campaign name',
        // subject: 'Subject line for an email',
        // from: 'hackers@hrnyc.com',
        // userId: 1, // Default
        // content: 'https://', // Fill this in with a S3 URI later
      };
    case GET_GROUPS:
      return {
        groups: action.payload
        // id: action.payload.id,
        // name: action.payload.name,
        // subject: action.payload.subject,
        // fromID: action.payload.fromID,
        // content: action.payload.content,
        // userID: action.payload.userID
      };
    case UPDATE_GROUP:
      return {
        groups: [...state.groups, action.payload]
        // id: action.payload.id,
        // name: action.payload.name,
        // subject: action.payload.subject,
        // fromID: action.payload.fromID,
        // content: action.payload.content,
        // userID: action.payload.userID
      };
    case DELETE_GROUP:
      return {
        groups: [...state.groups, action.payload]
        // id: action.payload.id,
        // name: action.payload.name,
        // subject: action.payload.subject,
        // fromID: action.payload.fromID,
        // content: action.payload.content,
        // userID: action.payload.userID
      };

    default:
      return state;
  }
}
