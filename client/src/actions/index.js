import * as types from "../constants";
import axios from "axios";

// TODO: This should take some campagin info to pass to reducer
// export const addCampaign = () => ({ type: types.ADD_CAMPAIGN }); // Add other fields when we know what needs to be passed to the reducer.
//export const deleteTodo = id => ({ type: types.DELETE_CAMPAIGN, id, //other info })

export function addCampaign(name, status, subject, userID) {
  const payload = { name, status, subject, userID };
  return function(dispatch) {
    axios
      .post("/newCampaign", payload)
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
        params: {
          user: user
        }
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

export function getCampaigns(userID) {
  // console.log("getting campaigns", userID);
  return function(dispatch) {
    axios
      .get("/campaigns", {
        params: {
          userID: userID
        }
      })
      .then(response => {
        // console.log("returned campaigns", response);
        dispatch({ type: types.GET_CAMPAIGNS, payload: response.data.rows });
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
        params: {
          id: id
        }
      })
      .then(response => {
        dispatch({ type: types.GET_CONTACTS, payload: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function addContact(name, email, campaign) {
  console.log("within add contact,", name, email, campaign);
  return function(dispatch) {
    axios
      .post("/newContact", {
        name: name,
        email: email,
        campaign: campaign
      })
      .then(response => {
        console.log("add contact has a response in the action");
        dispatch({ type: types.ADD_CONTACT, payload: { name, email } });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function deleteContact(id, contactid, campaignid) {
  // console.log('indelete', id, contactid, campaignid);
  return function(dispatch) {
    axios
      .post("/deleteContact", {
        id: id,
        contactid: contactid,
        campaignid: campaignid
      })
      .then(response => {
        dispatch({
          type: types.DELETE_CONTACT,
          payload: { id, contactid, campaignid }
        });
      })
      .catch(err => {
        console.log(err, "indelete");
      });
  };
}
