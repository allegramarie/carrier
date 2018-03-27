var redis = require("redis"),
  client = redis.createClient();
var expiration = 86400;

const incrementConnections = function(input, callback) {
  client.exists("connections", function(err, reply) {
    if (reply) {
      while (input > 0) {
        client.incr("connections", (err, reply) => {
          console.log("Incrementing the redis count", reply);
          callback(reply);
        });
        input--;
      }
    } else {
      client.set(["connections", 0, "EX", expiration], (err, response) => {
        if (err) {
          console.log("redis error", err);
        }
      });
    }
  });
};

const returnConnectionsCount = function(callback) {
  client.exists("connections", function(err, reply) {
    if (reply) {
      client.get("connections", (err, reply) => {
        console.log("Returned the count from redis", reply);
        callback(reply);
      });
    } else {
      console.log("Connections are expired", err);
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
