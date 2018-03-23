var format = require("pg-format");
const { Pool } = require("pg");
const config = require("../config.js");

const pool = new Pool({
  host: config.host,
  //   // connectionString: process.env.DATABASE_URL,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database
});

// const pool = new Pool({
//   host: "localhost",
//   // connectionString: process.env.DATABASE_URL,
//   user: "yuqingdong",
//   password: "Gold2424",
//   port:5432,
//   database: "mail"
// });

const addNewUser = function(input, callback) {
  pool.query(
    `insert into users (email, password) values ('${input.email}', '${
      input.password
    }');`,
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
    `insert into contacts (name, email) values ('${input.name}', '${
      input.email
    }');`,
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
  console.log("inside new campaign", input);
  pool.query(
    `insert into campaigns (name, status, subject, userID) values ('${
      input.name
    }', '${input.status}', '${input.subject}', '${input.userID}');`,
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

const addContact = function(input, callback) {
  // console.log(input, "input")
  // console.log(input.name,"inadd")
  // console.log(input.email,"email")
  // for(var i = 0;i < input.name.length;i++){
  // UNNEST(ARRAY['10', '22', '33']),
  return Promise.all(
    input.name.map((data, i) => {
      // console.log(data,'in map')
      // return Promise.all
      return pool.query(
        `insert into contacts (name, email) values ('${data}', '${
          input.email[i]
        }');`
      );
    })
  )
    .then(res => {
      callback(res);
    })
    .catch(err => {
      callback(err);
    });

  // }
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
  createCampaignContact,
  addContact
};
