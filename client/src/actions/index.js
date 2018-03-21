import * as types from "../constants";
import axios from "axios";

// TODO: This should take some campagin info to pass to reducer
// export const addCampaign = () => ({ type: types.ADD_CAMPAIGN }); // Add other fields when we know what needs to be passed to the reducer.
//export const deleteTodo = id => ({ type: types.DELETE_CAMPAIGN, id, //other info })

export function addCampaign(data) {
  return function(dispatch) {
    axios
      .post("/newCampaign", {
        data: data
      })
      .then(response => {
        dispatch({ type: types.ADD_CAMPAIGN, payload: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function checkUser(user) {
  return function(dispatch) {
    axios
      .get("/checkUser", {
        user: user
      })
      .then(response => {
        dispatch({ type: types.CHECK_USER, payload: response.data });
      })
      .catch(err => {
        console.log(err);
        // dispatch({type:'FETCH_USERS_REJECTED',payload:err})
      });
  };
}

export function newUser(user) {
  return function(dispatch) {
    axios
      .post("/newUser", {
        user: user
      })
      .then(response => {
        dispatch({ type: types.ADD_USER, payload: response.data });
      })
      .catch(err => {
        console.log(err);
        // dispatch({type:'FETCH_USERS_REJECTED',payload:err})
      });
  };
}

export function getCampaigns(user) {
  return function(dispatch) {
    axios
      .get("/campaigns", {
        fromID: user
      })
      .then(response => {
        dispatch({ type: types.GET_CAMPAIGNS, payload: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getContacts(id) {
  return function(dispatch) {
    axios
      .get("/campaignContacts", {
        id: id
      })
      .then(response => {
        dispatch({ type: types.GET_CONTACTS, payload: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function addContact(data) {
  return function(dispatch) {
    axios
      .post("/newContact", {
        data: data
      })
      .then(response => {
        dispatch({ type: types.ADD_CONTACT, payload: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
}
