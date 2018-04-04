const express = require("express");
const bodyParser = require("body-parser");
const sendgrid = require("./sendgrid.js");
const db = require("./database");
const auth = require("./auth");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("./config.js");
const sgMail = require("@sendgrid/mail");
var minify = require("html-minifier").minify;
const axios = require("axios");
const Busboy = require("busboy");
const fs = require("fs");
const rateLimit = require("express-rate-limit");
const connections = require("./database/connections");

let app = express();

// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms as well
app.use(bodyParser.urlencoded({ extended: true }));
// Provides access to user sessions via `request.session`
app.use(auth.attachSession);
// Declare static files
app.use(express.static(__dirname + "/client/build"));

const apiLimiter = function(request, response, next) {
  console.log("api limiter called");
  let emails = request.body.contacts.length;
  let numConnections = null;
  connections.returnConnectionsCount(numConnections => {
    let total = parseInt(numConnections) + emails;
    console.log("emails", emails);
    console.log("numConnections: ", numConnections);
    console.log("total: ", total);
    if (total <= 100) {
      connections.incrementConnections(emails, resp => {
        next();
      });
    } else {
      response.status(429).send("Too many requests");
    }
  });
};

//app.use("/exportHTML", apiLimiter);

// TODO: This should really be `/send`
app.post("/exportHTML", apiLimiter, (request, response) => {
  console.log("We are sending an email!");
  let { campaignId, htmlEmailContent, sendAt, contacts } = request.body;
  // sendAt = parseInt(sendAt);
  console.log(sendAt);
  console.log(contacts);

  db.getCampaignSubject(campaignId, (error, results) => {
    const subject = results.rows[0].subject;
    sgMail.setApiKey(`${config.TOKEN}`);
    sgMail.setSubstitutionWrappers("{{", "}}");
    const emails = [];
    //for each campaign contact, build their message object and add it to
    //the emails array.
    for (const contact of contacts) {
      // TODO: Make this nicer(?)
      // If they are unsubscribe, skip 'em
      if (contact.unsubscribe) {
        continue;
      }
      console.log(`Making message for ${JSON.stringify(contact)}`);
      const msg = {
        subject,
        to: contact.email,
        from: "thealex@umich.edu", // TODO: This should be `request.session.username`,
        // TODO: Add substitution string to HTML email
        content: [
          {
            type: "text/html",
            value: htmlEmailContent
          }
        ],
        // Assuming contact.id is userId
        substitutions: {
          trackingImageURL: `${contact.contactid}/${campaignId}/footer.png`,
          // TODO: Change url for production
          unsubscribeURL: `http://localhost:3000/unsubscribe/${
            contact.contactid
          }`,
          foo: "BAR"
        },
        sendAt: parseInt(`${sendAt}`)
      };
      emails.push(msg);
    }
    sgMail
      .send(emails)
      .then(sgResponse => db.updateCampaignStatusToSent(campaignId))
      .catch(error => console.log("sgMail -> FAILED"));
  });
});

app.get("/:id/:cid/footer.png", (request, response) => {
  var contactID = request.params.id;
  var campaignID = request.params.cid;
  //also need campaign id
  response.set("Content-Type", "image/png");
  res.sendFile("./footer.png", err => {
    if (err) {
      console.log("sending the file", err);
    } else {
      console.log("sent file");
      db.userOpenedEmail(contactID, campaignID, results => {});
    }
  });
});

app.get("/checkUser", (request, response) => {
  db
    .checkUserExists(request.body)
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/send", (request, response) => {
  sendgrid(request, response)
    .then(data => {
      response.send();
    })
    .catch(err => {
      console.log("Error", err);
    });
});

app.get("/campaigns", (request, response) => {
  db
    .getUserCampaigns(request.query.userID)
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/groups", (request, response) => {
  db.getUserGroups(request.query.userID).then(data => {
    response.send(data);
  });
});

app.post("/newCampaign", (request, response) => {
  db
    .addNewCampaign(request.body)
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/newGroup", (request, response) => {
  db
    .addNewGroup(request.body)
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.put("/updateCampaign", (request, response) => {
  db
    .updateCampaignStatus(request.body)
    .then(data => {
      response.send(data.id);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/campaignContacts", (request, response) => {
  db
    .campaignContacts(request.query.id)
    .then(data => {
      response.send(data.rows);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/groupContacts", (request, response) => {
  db
    .groupContacts(request.query.id)
    .then(data => {
      response.send(data.rows);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/groupContacts", (request, response) => {
  db
    .createGroupContact(
      request.body.params.groupid,
      request.body.params.contactid
    )
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/allContacts", (request, response) => {
  db
    .allContacts(request.query.id)
    .then(data => {
      response.send(data.rows);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/newContact", (request, response) => {
  var campaign = request.body.campaign;
  db
    .addNewContact(request.body.name, request.body.email)
    .then(data => {
      db
        .createCampaignContact(campaign, data.rows[0].id)
        .then(data => {
          response.send(data);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/groupToCampaigns", (request, response) => {
  var campaign = request.body.campaign;
  db
    .groupContacts(request.body.id)
    .then(data => {
      return Promise.all(
        data.rows.map(data => {
          db.createCampaignContact(campaign, data.contactid);
        })
      )
        .then(data => {
          response.send(data);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/unsubscribe/:contactId", (request, response) => {
  var contactId = request.params.contactId;
  db.unsubscribeContact(contactId, data => {
    response.redirect("/unsubscribe");
  });
});

app.get("/templates/:campaignId", (request, response) => {
  // Get the id from the route
  const campaignId = request.params.campaignId;
  // Load the URL from the database
  db
    .retrieveDraft(campaignId)
    .then(results => {
      // Use the URL to get JSON from S3
      axios.get(results.rows[0].templateurl).then(results => {
        // Send the JSON data back to the client
        response.send({ templateJSON: JSON.stringify(results.data) });
      });
    })
    .catch(err => {
      console.log(err);
    });
});

// TODO: Refactor constants into their own file, or `config.js`

// TODO: this should be templates/:campaignId
const BUCKET_NAME = "targ-templates";

app.post("/templates", (request, response) => {
  const { campaignId, designJSON, userID } = request.body;
  var file = JSON.stringify(designJSON);
  uploadToS3(userID, campaignId, file, (err, result) => {
    if (err) {
      throw err;
    }
    db.updateCampaignStatus(campaignId);
    response.send({ msg: "Saved!" });
  });
});

const uploadToS3 = (userId, campaignId, file, callback) => {
  const fileName = `${userId}-${campaignId}-draft.json`;
  let s3bucket = new AWS.S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    Bucket: BUCKET_NAME
  });

  s3bucket.createBucket(() => {
    // TODO: Save each draft per user and dispaly it as an option in the
    // dropdown on the frontend editor component
    var params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file
    };

    s3bucket.upload(params, function(err, data) {
      if (err) {
        console.log(err);
      }
      // TODO: save to postgres database
      const url = `https://s3.amazonaws.com/${BUCKET_NAME}/${fileName}`;
      db.updateCampaignS3URL(url, campaignId, (err, result) => {
        if (err) {
          callback(err, null);
        }
        callback(null, result);
      });
    });
  });
};

app.post("/drop", (request, response) => {
  const campaign = request.body.campaign;
  const newData = request.body.data.split("\n");
  var newsplitData = [];
  const objData = { name: [], email: [] };
  for (let i = 0; i < newData.length; i++) {
    var splitData = newData[i].split(",");
    newsplitData.push(
      splitData.filter(function(n) {
        return n !== " " && n !== "";
      })
    );
  }
  var newArray = [].concat.apply([], newsplitData);
  for (let j = 0; j < newArray.length; j++) {
    if (j % 2 === 0) {
      objData.name.push(newArray[j]);
    } else {
      objData.email.push(newArray[j]);
    }
  }
  db
    .addContact(objData)
    .then(data => {
      db
        .createMultiCampaignContact(campaign, data)
        .then(res => {
          response.send(res);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete("/deleteContact", (request, response) => {
  db
    .deletecampaignsContact(request.query)
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/getProfile", (request, response) => {
  db
    .getProfile(request.query.userID)
    .then(data => {
      response.send(data.rows[0]);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/saveProfile", (request, response) => {
  db
    .saveProfile(request.body)
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete("/deleteGroupContact", (request, response) => {
  db
    .deleteGroupContact(request.query)
    .then(data => {
      response.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete("/deleteCampaign", (request, response) => {
  db
    .deleteAllCampaignsContact(request.query)
    .then(() => {
      db
        .deleteCampaign(request.query)
        .then(data => {
          response.send(data);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete("/deleteGroup", (request, response) => {
  db
    .deleteAllGroupContacts(request.query)
    .then(() => {
      db
        .deleteGroup(request.query)
        .then(data => {
          response.send(data);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

// AUTH ROUTES
app.post("/login", (request, response) => {
  const { username, password } = request.body;
  // Change this function when database check is implemented
  auth.validateUserLogin(username, password).then(results => {
    const { isValid, userID } = results;
    // If credentials are valid, generate a new token and return it.
    if (isValid) {
      const token = auth.genToken();
      auth.setSession(token, { username, userID });
      response.send({ token, userID });
    } else {
      response.status(401).send({ err: "Bad Credentials: Access Denied" });
    }
  });
});

app.post("/signup", (request, response) => {
  const { username, password } = request.body;
  db
    .addNewUser({ email: username, password })
    .then(data => {
      const userID = data.rows[0].id;
      const token = auth.genToken();
      // // TODO: Remove hard coded userID
      auth.setSession(token, username);
      response.send({ token, userID });
    })
    .catch(err => {
      response.status(400).send({ error: "Bad Request" });
    });
});

// response.status(400).send({ error: "Bad Request" });
// } else {
// const userID = res.rows[0].id;
// const token = auth.genToken();
// // TODO: Remove hard coded userID
// auth.setSession(token, username);
// response.send({ token, userID });

app.post("/logout", (request, response) => {
  if (request.session) {
    auth.deleteSession(request.session.token);
    response.send({ msg: "User session destroyed" });
  } else {
    response.status(401).send({ msg: "Session not valid" });
  }
});

app.post("/auth", (request, response) => {
  // If the session exists, check that it's valid.
  const authenticated = request.session ? true : false;
  if (authenticated) {
    response.send({ authenticated });
  } else {
    response.status(401).send({ authenticated });
  }
});

// SERVER SETUP ------------------------------------------------

let port = process.env.PORT || 3001;

let server = app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
