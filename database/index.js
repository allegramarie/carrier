var format = require("pg-format");
const { Pool } = require("pg");

const pool = new Pool({
  host: "thesis-project.coxryxwvinqh.us-east-1.rds.amazonaws.com",
  // connectionString: process.env.DATABASE_URL,
  port: 5432,
  user: "thesis",
  password: "thesis123",
  database: "mail"
});

const checkUserExists = function(input, callback) {
  pool.query(
    `Select id from users where email = '%${input}%'`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(results);
      }
    }
  );
};

const getUserCampaigns = function(input, callback) {
  pool.query(
    `Select * from campaigns where fromID = '%${input}%`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(results);
      }
    }
  );
};

const addNewContact = function(input, callback) {
  pool.query(
    `insert into contacts (name, email) values ('${input.name}', '${
      input.email
    }';`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(results);
      }
    }
  );
};

const createCampaignContact = function(campaign, contact, callback) {
  pool.query(
    `insert into campaignContacts where campaignID = '${
      input.id
    }' (contactID) values ('${results.id}')`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(results);
      }
    }
  );
};

const addNewCampaign = function(input, callback) {
  pool.query(
    `insert into campaigns (name, subject, fromID, content, userID) values ('${
      input.name
    }', '${input.subject}', '${input.fromID}', '${input.content}', '${
      input.userID
    }';`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(results);
      }
    }
  );
};

const campaignContacts = function(input, callback) {
  pool.query(
    `select contacts from campaignContacts where campaign id = '${input}'`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(results);
      }
    }
  );
};

pool.connect((err, client, done) => {
  if (err) {
    return console.error("connection error", err.stack);
  } else {
    client.query("SELECT * FROM campaigns WHERE id = $1", [1], (err, res) => {
      done();
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows);
      }
    });
  }
});

module.exports = {
  addNewCampaign,
  addNewContact,
  getUserCampaigns,
  checkUserExists
};
