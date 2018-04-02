var format = require("pg-format");
const { Pool } = require("pg");
const config = require("../config.js");

const pool = true
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

const addNewUser = function(input) {
  var values = [input.email, input.password];
  return pool.query(
    `insert into users (email, password) values ($1, $2) returning id;`,
    values
  );
};

const checkUserExists = function(input) {
  let values = [input];
  return pool.query(`Select id from users where email = $1`, values);
};

const getUserCampaigns = function(input) {
  // console.log("inside database for campaigns", input);
  return pool.query(`select * from campaigns where userID = '${input}'`);
};

const getUserGroups = function(input, callback) {
  // console.log("inside database for groups", input);
  pool.query(
    `select * from groups where userID = '${input}'`,
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

const addNewContact = function(name, email) {
  let values = [name, email];
  return pool.query(
    `insert into contacts (name, email, unsubscribe) values ($1, $2, false) returning id;`,
    values
  );
};

const createCampaignContact = function(campaign, contact) {
  // console.log("Data for join,", campaign, contact);
  return pool.query(
    `insert into campaignContacts (campaignID, contactID) values ('${campaign}', '${contact}')`
  );
};

const createGroupContact = function(group, contact, callback) {
  // console.log("Data for join,", group, contact);
  pool.query(
    `insert into groupContacts (groupID, contactID) values ('${group}', '${contact}')`,
    (err, results) => {
      if (err) {
        console.log("Error creating group contacts", err);
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
        callback(results.rows[0]);
      }
    }
  );
};

const addNewCampaign = function({ name, subject, userID }, callback) {
  const status = "Draft";
  let values = [name, status, subject, userID];
  // console.log(name, subject, status, userID);
  return pool.query(
    `insert into campaigns (name, status, subject, userID) values ($1, $2, $3, $4) returning id;`,
    values
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

const campaignContacts = function(input) {
  // console.log(input);
  return pool.query(
    `SELECT * FROM contacts JOIN campaignContacts ON contacts.id = contactid WHERE campaignContacts.campaignid = '${input}'`
  );
};

const groupContacts = function(input, callback) {
  // console.log(input);
  pool.query(
    `SELECT * FROM contacts JOIN groupContacts ON contacts.id = contactid WHERE groupContacts.groupid = '${input}'`,
    (err, results) => {
      if (err) {
        console.log(err, "here in group contacts");
        callback(err, null);
      } else {
        console.log("contacts from groups", results.rows);
        // TODO: There is some code which expects the first argument to be
        // error, but it is instead results
        callback(results.rows);
      }
    }
  );
};

const allContacts = function(input, callback) {
  // console.log(input);
  pool.query(
    `SELECT DISTINCT contacts.name, contacts.id, contacts.email FROM campaigns JOIN campaignContacts ON campaigns.id = campaignContacts.campaignId JOIN contacts on contacts.id = campaignContacts.contactId WHERE campaigns.userID = '${input}'`,
    (err, results) => {
      if (err) {
        console.log(err, "here in all users contacts");
        callback(err, null);
      } else {
        console.log("Getting all contacts", results.rows);
        // TODO: There is some code which expects the first argument to be
        // error, but it is instead results
        callback(results.rows);
      }
    }
  );
};

const addContact = function(input, response) {
  // console.log(input,"add contact")
  const name = input.name;
  const email = input.email;
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
      // console.log(res[0].rows,'in db')
      // console.log(res)
      // response.send(res);
      return Promise.resolve(res);
    })
    .catch(err => {
      console.log(err);
    });
};
const createMultiCampaignContact = function(campaign, contact) {
  // console.log("Data for join,", campaign, contact);
  return Promise.all(
    contact.map(data => {
      // console.log(data)
      return pool.query(
        `INSERT into campaignContacts (campaignID, contactID) values ('${campaign}', '${
          data.rows[0].id
        }')`
      );
    })
  )
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      console.log(err);
    });
};
const deletecampaignsContact = function(data) {
  // console.log(data)
  return pool.query(
    `DELETE from campaignContacts where contactid = '${
      data.contactid
    }' and campaignid = '${data.campaignid}';`
  );
};
const deleteContact = function(data) {
  return pool.query(`DELETE from contacts where id = '${data.id}';`);
};

const getProfile = function(input) {
  return pool.query(
    `Select email, name, bio from users WHERE users.id = '${input}'`
  );
};
const saveProfile = function(input) {
  return pool.query(
    `update users set email='${input.data.email}', name='${
      input.data.name
    }', bio='${input.data.bio}' where id=${input.user}`
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

const getCampaignSubject = (campaignId, callback) => {
  pool.query(
    `SELECT subject FROM campaigns WHERE id = '${campaignId}';`,
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

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
  saveProfile,
  getCampaignSubject,
  deleteContact,
  deletecampaignsContact,
  groupContacts,
  getUserGroups,
  allContacts,
  createGroupContact
};
