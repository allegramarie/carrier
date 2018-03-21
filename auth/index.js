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

// Middleware that allows every session to access request.session
const attachSession = (request, response, next) => {
  const { token } = request.body;
  request.session = getSession(token);
  next();
};

module.exports = {
  genToken,
  getSession,
  sessions,
  attachSession
};
