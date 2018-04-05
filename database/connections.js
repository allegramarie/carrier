const redis = require("redis");
const expiration = 86400;

// Redis defaults to port 6379; if running locally, no config required
const client = redis.createClient();

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
      // This case only happens when `connections`
      // has not been set.
      client.set(["connections", 1, "EX", expiration], (err, response) => {
        if (err) {
          console.log("redis error", err);
        }
        // Return 1, since response from set is string
        // (ex: `OK`)
        callback(1);
      });
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
  client,
  incrementConnections,
  returnConnectionsCount,
  expiration
};

//brew install redis
//follow instructions to start redis with brew services start redis
//run redis-cli
