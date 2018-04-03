import {
  ADD_CAMPAIGN,
  GET_CAMPAIGNS,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN
} from "../constants";

const initialState = {
  campaigns: []
};

export default function campaigns(state = initialState, action) {
  switch (action.type) {
    case ADD_CAMPAIGN:
      return {
        campaigns: [...state.campaigns, action.payload]
      };
    case GET_CAMPAIGNS:
      return {
        campaigns: action.payload
      };
    case UPDATE_CAMPAIGN:
      return {
        campaigns: [...state.campaigns, action.payload]
      };
    case DELETE_CAMPAIGN:
      return {
        campaigns: [...state.campaigns, action.payload]
      };

    default:
      return state;
  }
}
