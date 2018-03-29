var format = require("pg-format");
const { Pool } = require("pg");
const config = require("../config.js");
var connections = require("./connections.js");

const pool = false
  ? // If true, use production.
    new Pool({
      host: config.host,
      //   // connectionString: process.env.DATABASE_URL,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database
    })
  : // Else, use localhost
    new Pool({ host: "localhost", user: "", password: "", database: "mail" });

const updateCampaignS3URL = (url, campaignId, callback) => {
  pool.query(
    `UPDATE campaigns SET templateURL = '${url}' WHERE id = '${campaignId}'`,
    (err, result) => {
      if (err) {
        callback("Update campaign s3", err, null);
      }
      callback(null, result);
    }
  );
};

const getUserLoginInfo = function(email, password) {
  let values = [email, password];
  return pool.query(
    `select email, password, id from users where email = $1 and password = $2`,
    values
  );
};

const retrieveDraft = function(campaignId, callback) {
  pool.query(
    `select templateURL from campaigns where id ='${campaignId}'`,
    (err, results) => {
      if (err) {
        console.log("Error in draft", err, null);
      } else {
        callback(null, results.rows[0]);
      }
    }
  );
};

const saveTemplateURL = function(input, callback) {
  pool.query(
    `INSERT into campaigns (name, status, subject, templateURL, userid) values ('testCampaign', 'draft', 'Testing', '${
      input.templateURL
    }', ${input.userID}) returning id`,
    (err, results) => {
      if (err) {
        console.log("Error saving template", err);
      } else {
        callback(results);
      }
    }
  );
};

const addNewUser = function(input, callback) {
  var values = [input.email, input.password];
  pool.query(
    `insert into users (email, password) values ($1, $2) returning id;`,
    values,
    (err, results) => {
      if (err) {
        callback(err);
        //give a more detailed error message
        console.log("Error saving new user", err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const checkUserExists = function(input, callback) {
  let values = [input];
  pool.query(
    `Select id from users where email = $1`,
    values,
    (err, results) => {
      if (err) {
        console.log("Error checking if user exists", err);
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
        console.log("Error getting user campaigns", err);
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
  let values = [name, email];
  pool.query(
    `insert into contacts (name, email, unsubscribe) values ($1, $2, false) returning id;`,
    values,
    (err, results) => {
      if (err) {
        console.log("Error adding new contacts", err);
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
        console.log("Error creating campaign contacts", err);
      } else {
        callback(results);
      }
    }
  );
};

const unsubscribeContact = function(contact, callback) {
  pool.query(
    `update contacts set unsubscribe = 'true' where id = '${contact}'`,
    (err, results) => {
      if (err) {
        console.log("Error in unsubscribe", err);
      } else {
        callback(results);
      }
    }
  );
};

const addNewCampaign = function({ name, subject, userID }, callback) {
  const status = "Draft";
  let values = [name, status, subject, userID];
  // console.log(name, subject, status, userID);
  pool.query(
    `insert into campaigns (name, status, subject, userID) values ($1, $2, $3, $4) returning id;`,
    values,
    (err, results) => {
      if (err) {
        console.log("Error adding a new campaign", err);
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
        console.log("Error updating the campaign status", err);
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
        console.log("Error checking the campaign template", err);
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
        console.log(err, "here in campaign contacts");
      } else {
        // console.log(results)
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
        `UPDATE campaignContacts (campaignID, contactID) values ('${campaign}', '${
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
      console.log("Error deleting a contact", err);
    } else {
      callback(result);
    }
  });
};

const getProfile = function(input, callback) {
  console.log(input, "inquery");
  // `SELECT * FROM contacts JOIN campaignContacts ON contacts.id = contactid WHERE campaignContacts.campaignid = '${input}'`,

  pool.query(
    `Select email, name, bio from users WHERE users.id = '${input}'`,
    (err, result) => {
      if (err) {
        console.log(err, "err in getting profile");
      } else {
        callback(result);
      }
    }
  );
};
const saveProfile = function(input, callback) {
  console.log(input);
  // pool.query(`UPDATE users (email, name, bio) values ('${input.data.email}', '${input.data.name}',
  // '${input.data.bio}') WHERE id = '${input.user}'`,
  pool.query(
    `update users set email='${input.data.email}', name='${
      input.data.name
    }', bio='${input.data.bio}' where id=${input.user}`,
    (err, result) => {
      if (err) {
        console.log(err, "in insert");
      } else {
        callback(result);
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
        console.log("Cannot select from campaigns", err.stack);
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
  unsubscribeContact,
  createCampaignContact,
  addContact,
  createMultiCampaignContact,
  saveTemplateURL,
  retrieveDraft,
  getUserLoginInfo,
  updateCampaignS3URL,
  checkCampaignTemplate,
  getProfile,
  saveProfile
};
