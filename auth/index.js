const db = require("../database");

// TODO: Sessions should be stored in a database, or a cache, but not in
// volatile memory.

// Token->SessionInfo pairs
let sessions = {};

// Returns the session given a token, else null.
const getSession = token => {
  return sessions[token] ? sessions[token] : null;
};

const deleteSession = token => {
  delete sessions[token];
};

// Returns a new token.
const genToken = () => {
  return "token-" + new Date().toISOString();
};

const setSession = (token, items) => {
  // Rebuild the session with old key-value pairs, and overwrite with new
  // ones from `items`
  const newSession = { ...sessions[token], ...items };
  sessions[token] = newSession;
  return newSession;
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
  const { token } = request.body;
  request.session = getSession(token);
  next();
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

module.exports = {
  genToken,
  getSession,
  deleteSession,
  sessions,
  attachSession,
  validateUserLogin,
  setSession,
  protect
};
