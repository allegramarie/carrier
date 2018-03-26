import { ADD_CAMPAIGN, GET_CAMPAIGNS, UPDATE_CAMPAIGN } from "../constants";

const initialState = {
  campaigns: []
};

export default function campaigns(state = initialState, action) {
  switch (action.type) {
    case ADD_CAMPAIGN:
      return {
        //action.payload // Using this assumes a fully formed campaign object is the payload.
        campaigns: [...state.campaigns, action.payload]
        // id: 1,
        // name: 'This is a campaign name',
        // subject: 'Subject line for an email',
        // from: 'hackers@hrnyc.com',
        // userId: 1, // Default
        // content: 'https://', // Fill this in with a S3 URI later
      };
    case GET_CAMPAIGNS:
      return {
        campaigns: action.payload
        // id: action.payload.id,
        // name: action.payload.name,
        // subject: action.payload.subject,
        // fromID: action.payload.fromID,
        // content: action.payload.content,
        // userID: action.payload.userID
      };
    case UPDATE_CAMPAIGN:
      return {
        campaigns: [...state.campaigns, action.payload]
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
