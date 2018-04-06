var format = require("pg-format");
const { Pool } = require("pg");
const config = require("../config.js");

const pool = config.prod
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
  return pool.query(
    `select templateURL from campaigns where id ='${campaignId}'`
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
  return pool.query(`select * from campaigns where userID = '${input}'`);
};

const getUserGroups = function(input, callback) {
  return pool.query(`select * from groups where userID = '${input}'`);
};

const userOpenedEmail = function(contact, campaign, callback) {
  pool.query(
    `UPDATE campaignContacts SET opened = true WHERE campaignID ='${campaign}' AND contactID = '${contact}';`,
    (err, results) => {
      if (err) {
        console.log("error inserting open boolean", err);
      } else {
        callback(results);
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
  return pool.query(
    `insert into campaignContacts (campaignID, contactID) values ('${campaign}', '${contact}') returning id`
  );
};

const createGroupContact = function(group, contact, callback) {
  return pool.query(
    `insert into groupContacts (groupID, contactID) values ('${group}', '${contact}')`
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
  return pool.query(
    `insert into campaigns (name, status, subject, userID) values ($1, $2, $3, $4) returning id;`,
    values
  );
};

const addNewGroup = function({ name, userID }, callback) {
  const status = "Draft";
  let values = [name, userID];
  return pool.query(
    `insert into groups (name, userID) values ($1, $2) returning id;`,
    values
  );
};

const updateCampaignStatus = function(campaign) {
  return pool.query(
    `update campaigns set status = 'Active' where id = '${campaign}'`
  );
};

const updateCampaignStatusToSent = function(campaign) {
  return pool.query(
    `update campaigns set status = 'Sent' where id = '${campaign}'`
  );
};

const campaignContacts = function(input) {
  return pool.query(
    `SELECT * FROM contacts JOIN campaignContacts ON contacts.id = contactid WHERE campaignContacts.campaignid = '${input}'`
  );
};

const groupContacts = function(input) {
  return pool.query(
    `SELECT * FROM contacts JOIN groupContacts ON contacts.id = contactid WHERE groupContacts.groupid = '${input}'`
  );
};

const allContacts = function(input, callback) {
  return pool.query(
    `SELECT DISTINCT contacts.name, contacts.id, contacts.email FROM campaigns JOIN campaignContacts ON campaigns.id = campaignContacts.campaignId JOIN contacts on contacts.id = campaignContacts.contactId WHERE campaigns.userID = '${input}'`
  );
};

const addContact = function(input, response) {
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
      return Promise.resolve(res);
    })
    .catch(err => {
      console.log(err);
    });
};

const createMultiCampaignContact = function(campaign, contact) {
  return Promise.all(
    contact.map(data => {
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
  console.log(data);
  return pool.query(
    `DELETE from campaigncontacts where id = '${
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

const deleteGroupContact = function(input) {
  return pool.query(
    `DELETE FROM groupcontacts where contactid = '${
      input.contactid
    }' and groupid = '${input.groupid}'`
  );
};

const deleteCampaign = function(input) {
  return pool.query(
    `DELETE FROM campaigns WHERE id = '${input.campaignId}' and userid = '${
      input.userId
    }'`
  );
};

const deleteAllCampaignsContact = function(input) {
  return pool.query(
    `DELETE FROM campaigncontacts WHERE campaignid = '${input.campaignId}'`
  );
};

const deleteAllGroupContacts = function(input) {
  return pool.query(`DELETE FROM groupcontacts WHERE groupid = '${input.id}'`);
};

const deleteGroup = function(input) {
  return pool.query(
    `DELETE FROM groups WHERE id = '${input.id}' and userid = '${input.userid}'`
  );
};

const getData = function(campaignid) {
  console.log(campaignid);
  return pool.query(
    `select * from campaigncontacts INNER JOIN contacts ON campaigncontacts.contactid = contacts.id where campaigncontacts.campaignid = '${
      campaignid.campaignid
    }'`
  );
  // .then((data)=>{
  //   console.log(data.rows,"in database")
  //   return Promise.all(data.rows.map((each) => {
  //     console.log(each.contactid, "in promise")
  //     return pool.query(`SELECT * FROM contacts WHERE id = '${each.contactid}'`)
  //   }))
  //   .then((res)=>{
  //     console.log(res[0].rows,"hey")
  //     return Promise.resolve(res)
  //
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // })
  // .catch((err)=>{
  //   console.log(err)
  // })
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
  getProfile,
  saveProfile,
  getCampaignSubject,
  deleteContact,
  deletecampaignsContact,
  groupContacts,
  getUserGroups,
  allContacts,
  createGroupContact,
  addNewGroup,
  updateCampaignStatus,
  updateCampaignStatusToSent,
  deleteGroupContact,
  deleteCampaign,
  deleteAllCampaignsContact,
  deleteAllGroupContacts,
  deleteGroup,
  getData
};
