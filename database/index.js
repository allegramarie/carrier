var format = require("pg-format");
const { Pool } = require("pg");
const config = require("../config.js");
var connections = require("./connections.js");

// const pool = process.env.PROD
// ? // If prod is set, use prod config
// new Pool(...config)
// : // Else, use localhost
// new Pool({ host: "localhost", user: "", password: "", database: "mail" });

const pool = new Pool({
  host: config.host,
  //   // connectionString: process.env.DATABASE_URL,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database
});
// const pool = new Pool({
//   host: config.host,
//   //   // connectionString: process.env.DATABASE_URL,
//   port: config.port,
//   user: config.user,
//   password: config.password,
//   database: config.database
// });

const addNewUser = function(input, callback) {
  pool.query(
    `insert into users (email, password) values ('${input.email}', '${
      input.password
    }') returning id;`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results.rows[0]);
      }
    }
  );
};

const getUserLoginInfo = function(email, password) {
  return pool.query(
    `select email, password, id from users where email = '${email}' and password = '${password}'`
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
  // console.log("inside database for campaigns", input);
  pool.query(
    `select * from campaigns where userID = '${input}'`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        // console.log("results from the database", results);
        callback(results);
      }
    }
  );
};

const userOpenedEmail = function(contact, campaign, callback) {
  pool.query(
    `update campaignContacts opened = 'true' where campaignID ='${campaign}' and contactID = '${contact}';`,
    (err, results) => {
      if (err) {
        console.log("error inserting open boolean", err);
      } else {
        callback(result);
      }
    }
  );
};

const addNewContact = function(name, email, callback) {
  pool.query(
    `insert into contacts (name, email, unsubscribe) values ('${name}', '${email}', false) returning id;`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(results);
      }
    }
  );
};

const addNewContactEmail = function(input, callback) {
  // console.log(input.name);
  // console.log(input.email);
  pool.query(
    `insert into contacts (name, email, unsubscribe) values ('${
      input.name
    }', '${input.email}', false);`,
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
  // console.log("Data for join,", campaign, contact);
  pool.query(
    `insert into campaignContacts (campaignID, contactID) values ('${campaign}', '${contact}')`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        // console.log("inserted campaign contact", results);
        callback(results);
      }
    }
  );
};

const addNewCampaign = function({ name, subject, userID }, callback) {
  const status = "Draft";
  // console.log(name, subject, status, userID);
  pool.query(
    `insert into campaigns (name, status, subject, userID) values ('${name}', '${status}', '${subject}', '${userID}') returning id;`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        const campaignObj = {
          name,
          status,
          subject,
          userID,
          id: results.rows[0].id
        };
        callback(campaignObj);
      }
    }
  );
};

const updateCampaignStatus = function(campaign, callback) {
  // console.log("Campaign to be updated,", campaign.params.id);
  pool.query(
    `update campaigns set status = 'Active' where id = '${campaign.params.id}'`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        // console.log("campaign should be updated,", results);
        callback(results);
      }
    }
  );
};

const checkCampaignTemplate = function(campaign, callback) {
  // console.log("Campaign to be checked for template,", campaign);
  pool.query(
    `select * from campaigns where id = '${campaign}' AND templateURL is NULL;`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        // console.log("campaign has a templateURL,", results.rows);
        callback(results.rows);
      }
    }
  );
};

const campaignContacts = function(input, callback) {
  // console.log(input);
  pool.query(
    `SELECT * FROM contacts JOIN campaignContacts ON contacts.id = contactid WHERE campaignContacts.campaignid = '${input}'`,
    (err, results) => {
      if (err) {
      } else {
        // console.log("results where rows should be zero,", results.rows);
        callback(results.rows);
      }
    }
  );
};

const addContact = function(input, callback) {
  // console.log(input)
  return Promise.all(
    input.name.map((data, i) => {
      return pool.query(
        `insert into contacts (name, email, unsubscribe) values ('${data}', '${
          input.email[i]
        }', false) returning id;`
      );
    })
  )
    .then(res => {
      // console.log(res,"database")
      callback(res);
    })
    .catch(err => {
      callback(err);
    });
};
const createMultiCampaignContact = function(campaign, contact, callback) {
  // console.log("Data for join,", campaign, contact[0].rows[0].id);
  return Promise.all(
    contact.map(data => {
      // console.log(data)
      return pool.query(
        `insert into campaignContacts (campaignID, contactID) values ('${campaign}', '${
          data.rows[0].id
        }')`
      );
    })
  )
    .then(res => {
      callback(res);
    })
    .catch(err => {
      callback(err);
    });
};
const deletecampaignsContact = function(data, callback) {
  // console.log(data)
  pool.query(
    `DELETE from campaignContacts where contactid = '${
      data.contactid
    }' and campaignid = '${data.campaignid}';`,
    // `DELETE from Contacts where id = '${data.id}';`,
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(result);
      }
    }
  );
};
const deleteContact = function(data, callback) {
  // console.log(data);
  pool.query(`DELETE from contacts where id = '${data.id}';`, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(result);
    }
  });
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
        // console.log(res.rows);
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
  userOpenedEmail,
  campaignContacts,
  createCampaignContact,
  updateCampaignStatus,
  checkCampaignTemplate,
  addContact,
  addNewContactEmail,
  createMultiCampaignContact,
  deletecampaignsContact,
  deleteContact,
  getUserLoginInfo
};
