var redis = require("redis"),
  client = redis.createClient();
var expiration = 86400;

const incrementConnections = (input, callback) => {
  console.log("input: ", input);
  client.exists("connections", (err, reply) => {
    if (reply) {
      while (input > 0) {
        client.incr("connections", (err, reply) => {
          console.log("Incrementing the redis count", reply);
          callback(reply);
        });
        input--;
      }
    } else {
      console.log("Error incrementing connections", err);
    }
  });
};

const returnConnectionsCount = callback => {
  client.exists("connections", (err, reply) => {
    if (reply) {
      client.get("connections", (err, reply) => {
        console.log("Returned the count from redis", reply);
        callback(reply);
      });
    } else {
      client.set(["connections", 1, "EX", expiration], (err, response) => {
        if (err) {
          console.log("redis error", err);
        }
        callback(response);
      });
    }
  });
};

const createSession = (input, callback) => {
  var session = input.token;
  var user = input.userID;
  var username = input.username;
  client.hexists(session, (err, reply) => {
    if (reply) {
      console.log("session already exists!");
    } else {
      client.hmset(
        [session, "username", username, "userID", userID, "EX", expiration],
        (err, response) => {
          if (err) {
            console.log("redis error", err);
          }
          console.log("setting session in redis");
          callback(response);
        }
      );
    }
  });
};

const getSession = (input, callback) => {
  client.hexists(input, (err, reply) => {
    if (reply) {
      client.hget(input, "userID", (err, reply) => {
        console.log("getting the session from redis", reply);
        callback(reply);
      });
    } else {
      console.log("No session available!", err);
    }
  });
};

const deleteSession = (input, callback) => {
  client.hexists(input, (err, reply) => {
    if (reply) {
      client.hdel(input, (err, response) => {
        callback(response);
      });
    } else {
      console.log("error deleting session", err);
    }
  });
};

const createSessionTemplate = (input, callback) => {
  const session = input.token;
  const campaign = input.campaign;
  const sessioncampaign = `${session}:${campaign}`;
  const template = input.template;
  client.hexists(session, (err, reply) => {
    if (reply) {
      client.hmset(sessioncampaign, template, (err, response) => {
        if (err) {
          console.log("redis error creating session template", err);
        } else {
          console.log("setting session template in redis", reply);
          callback(reply);
        }
      });
    } else {
      console.log("no user session set", err);
    }
  });
};

const getSessionTemplate = (input, callback) => {
  const session = input.token;
  const campaign = input.campaign;
  const sessioncampaign = `${session}:${campaign}`;
  const template = input.template;
  client.hexists(sessioncampaign, (err, reply) => {
    if (reply) {
      client.hget(sessioncampaign, (err, reply) => {
        console.log("getting session template", reply);
        callback(reply);
      });
    } else {
      console.log("Error getting session template, session should not exist");
    }
  });
};

client.on("error", function(err) {
  console.log("Error " + err);
});

client.on("connect", function() {
  console.log("🌎  Connected to redis!");
});

module.exports = {
  incrementConnections,
  returnConnectionsCount
};

//brew install redis
//follow instructions to start redis with brew services start redis
//run redis-cli
