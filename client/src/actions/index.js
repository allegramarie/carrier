import * as types from "../constants";

// TODO: This should take some campagin info to pass to reducer
export const addCampaign = () => ({ type: types.ADD_CAMPAIGN }); // Add other fields when we know what needs to be passed to the reducer.
//export const deleteTodo = id => ({ type: types.DELETE_CAMPAIGN, id, //other info })
export const addContact = () => ({ type: types.ADD_CONTACT, text });
