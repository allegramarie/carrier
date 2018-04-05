const db = require("../database");
const { client, expiration } = require("../database/connections");

// TODO: Sessions should be stored in a database, or a cache, but not in
// volatile memory.

// Token->SessionInfo pairs
let sessions = {};

// // Returns the session given a token, else null.
// const getSession = token => {
//   return sessions[token] ? sessions[token] : null;
// };

// const deleteSession = token => {
//   delete sessions[token];
// };

// Returns a new token.
const genToken = () => {
  return "token-" + new Date().toISOString();
};

const validateUserLogin = (username, password) => {
  return db.getUserLoginInfo(username, password).then(results => {
    const userInfo = results.rows[0];
    const isValid = userInfo ? userInfo.password === password : false;
    const userID = isValid ? userInfo.id : null;
    results = { isValid, userID };
    return Promise.resolve(results);
  });
};

// Middleware that allows every session to access request.session
const attachSession = (request, response, next) => {
  console.log("Trying to attach a session");
  const { token } = request.body;
  if (token) {
    console.log("found a token in request", token);
    getSession(token, reply => {
      request.session = reply;
      // next must come after the session is set.
      console.log("added session to request.session", reply);
      next();
    });
  } else {
    next();
  }
};

// Routes with this middleware will require a token be sent with request.
const protect = (request, response, next) => {
  // If the session exists, check that it's valid.
  const authenticated = request.session ? true : false;
  if (authenticated) {
    next();
  } else {
    response.status(401).send({ authenticated });
  }
};

const setSession = (input, callback) => {
  const { token, userID, username } = input;
  console.log("token", token, "userID", userID, "username", username);
  client.hmset(
    // Key
    token,
    // Fields and their values, stored at hash, which is indexed by key
    ["username", username, "userID", userID, "EX", expiration],
    (err, results) => {
      console.log("setting session in redis", results);
      if (err) {
        console.log("redis error setting session", err);
        callback(err, null);
      }
      callback(null, results);
    }
  );
};

const getSession = (token, callback) => {
  console.log("token in get session", token);
  client.hmget(token, "username", "userID", (err, reply) => {
    console.log("getting the session from redis");
    console.log("reply: ", reply);
    if (err) {
      console.log("error getting session", err);
      callback(err, null);
    } else {
      console.log("got session!", reply);
      callback(null, reply);
    }
  });
};

const deleteSession = (token, callback) => {
  console.log("delete this session", token);
  client.hdel(token, (err, response) => {
    if (err) {
      console.log("error deleting session", err);
      callback(err, null);
    } else {
      console.log("success deleting session", err);
      callback(null, response);
    }
  });
};

const setDraftInSession = (token, templateJSON, callback) => {
  console.log("setting draft in session", token, "template", templateJSON);
  client.hmset(token, ["templateJSON", templateJSON], (err, response) => {
    console.log("storeDraftInSession: ", response);
    if (err) {
      console.log("error setting session draft", err);
      callback(err, null);
    } else {
      console.log("got session draft", response);
      callback(null, response);
    }
  });
};

const getDraftInSession = (token, callback) => {
  console.log("getting draft in session", token);
  client.hmget(token, "draft", (err, response) => {
    console.log("getDraftInSession: ", response);
    if (err) {
      console.log("error getting session draft", err);
      callback(err, null);
    } else {
      console.log("got session draft", response);
      callback(null, response);
    }
  });
};

module.exports = {
  genToken,
  getSession,
  deleteSession,
  sessions,
  attachSession,
  validateUserLogin,
  setSession,
  protect,
  setDraftInSession,
  getDraftInSession
};
