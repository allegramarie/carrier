const db = require("../database");

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

const setSession = (token, username) => {
  session = { username };
  sessions[token] = session;
  return session;
};

const validateUserLogin = (username, password) => {
  return db.getUserLoginInfo(username, password).then(results => {
    const userInfo = results.rows[0];
    const isValid = userInfo ? userInfo.password === password : false;
    return Promise.resolve(isValid);
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
