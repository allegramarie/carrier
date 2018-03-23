var format = require("pg-format");
const { Pool } = require("pg");

// const pool = new Pool({
//   host: "thesis-project.coxryxwvinqh.us-east-1.rds.amazonaws.com",
//   // connectionString: process.env.DATABASE_URL,
//   port: 5432,
//   user: "thesis",
//   password: "thesis123",
//   database: "mail"
// });

const pool = new Pool({
  host: "localhost",
  // connectionString: process.env.DATABASE_URL,
  user: "",
  password: "",
  database: "mail"
});

const addNewUser = function(input, callback) {
  pool.query(
    `insert into users (email, password) values ('${input.email}', '${
      input.password
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

const checkUserExists = function(input, callback) {
  pool.query(
    `Select id from users where email = '${input}'`,
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
    `Select * from campaigns where userID = '${input}'`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(results);
      }
    }
  );
};

const addNewContact = function(name, email, callback) {
  console.log("inside new contact", name, email);
  pool.query(
    `insert into contacts (name, email) values ('${name}', '${email}') RETURNING id;`,
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
  console.log("Data for join,", campaign, contact);
  pool.query(
    `insert into campaignContacts (campaignID, contactID) values ('${campaign}', '${contact}')`,
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
  console.log(input);
  pool.query(
    `SELECT * FROM contacts JOIN campaignContacts ON contacts.id = contactid WHERE campaignContacts.campaignid = '${input}'`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(results.rows);
      }
    }
  );
};

pool.connect((err, client, done) => {
  if (err) {
    return console.error("connection error", err.stack);
  } else {
    client.query("SELECT * FROM campaigns WHERE id = $1", [2], (err, res) => {
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
  checkUserExists,
  addNewUser,
  campaignContacts,
  createCampaignContact
};
