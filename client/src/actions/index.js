import * as types from "../constants";
import axios from "axios";

// TODO: This should take some campagin info to pass to reducer
// export const addCampaign = () => ({ type: types.ADD_CAMPAIGN }); // Add other fields when we know what needs to be passed to the reducer.
//export const deleteTodo = id => ({ type: types.DELETE_CAMPAIGN, id, //other info })
//conditional rendering of loading thing and keep new debugginh thing in the back of my head//
//new debuggin ways
//tsting a function
//set abefore time and invoe funciton and
// seta after time
//function testspeed(cb{
//beofe()=newData
//callback
//afternewdate()
//}
export function addCampaign(name, status, subject, userID) {
  const payload = { name, status, subject, userID };
  return function(dispatch) {
    return axios
      .post("/newCampaign", payload)
      .then(response => {
        // console.log(response.data)
        dispatch({ type: types.ADD_CAMPAIGN, payload: response.data });
        return response.data;
      })
      .catch(err => {
        // console.log(err);
        return err;
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
    return axios
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

export function updateCampaign(id) {
  // console.log("updating campaigns id", id);
  return function(dispatch) {
    axios
      .post("/updateCampaign", {
        params: {
          id: id
        }
      })
      .then(response => {
        // console.log("update campaign,", response);
        dispatch({ type: types.UPDATE_CAMPAIGN, payload: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getGroups(userID) {
  // console.log("getting groups", userID);
  return function(dispatch) {
    return axios
      .get("/groups", {
        params: {
          userID: userID
        }
      })
      .then(response => {
        // console.log("returned campaigns", response);
        dispatch({ type: types.GET_GROUPS, payload: response.data.rows });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getGroupContacts(id) {
  return function(dispatch) {
    return axios
      .get("/groupContacts", {
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

export function groupToCampaigns(campaign, id) {
  return function(dispatch) {
    return axios
      .post("/groupToCampaigns", {
        campaign: campaign,
        id: id
      })
      .then(response => {
        console.log(response.data);
        dispatch({ type: types.ADD_CONTACT, payload: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getContacts(id) {
  return function(dispatch) {
    return axios
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

export function getAllContacts(id) {
  return function(dispatch) {
    return axios
      .get("/allContacts", {
        params: {
          id: id
        }
      })
      .then(response => {
        dispatch({ type: types.GET_ALL_CONTACTS, payload: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function addGroupContacts(group, id, name, email) {
  return function(dispatch) {
    return axios
      .post("/groupContacts", {
        params: {
          group: group,
          id: id
        }
      })
      .then(response => {
        dispatch({ type: types.ADD_CONTACT, payload: { name, email } });
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
