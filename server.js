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

let app = express();

// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms as well
app.use(bodyParser.urlencoded({ extended: true }));
// Provides access to user sessions via `request.session`
app.use(auth.attachSession);
// Declare static files
app.use(express.static(__dirname + "/client/build"));

// app.post("/exportHTML", (req, res) => {
//   var abc = req.body.data;

//   sgMail.setApiKey(`${config.TOKEN}`);
//   const msg = {
//     to: req.body.sendgridEmails,
//     from: "test@example.com",
//     subject: req.body.subject,
//     html: abc
//   };
//   sgMail.sendMultiple(msg);
//   res.send(req.data);
// });

app.post("/exportHTML", (req, res) => {
  console.log("getting frustrated");
  // console.log(req.body.data);
  var abc = req.body.data;
  console.log(req.body.data);
  console.log(req.body.sendgridEmails);
  console.log(req.body.subject);
  console.log(req.body.sendTime);

  sgMail.setApiKey(`${config.TOKEN}`);
  const msg = {
    to:
      [
        "eshum89@gmail.com",
        "yu_qing630@yahoo.com",
        "allegra.berndt@gmail.com"
      ] || req.body.sendgridEmails,
    from: "test@example.com",
    subject: "Hello Allegra",
    html: req.body.data,
    sendAt: req.body.sendTime
  };
  sgMail.sendMultiple(msg);
  res.send(req.data);
});

var apiLimiter = function(request, response, next) {
  console.log("api limiter called", request);
  let emails = request.data.personalizations[0].to.length;
  //estimated request based on sendgrid format from api
  let connections = db.returnConnectionsCount(resp => {
    return resp;
  });
  let total = connections + emails;
  if (total < 100) {
    db.incrementConnections(emails, resp => {
      return next(resp);
    });
  } else {
    response.status(429).send("Too many requests");
  }
};

app.use("/exportHTML", apiLimiter);

app.get("/", (request, response) => {
  response.send("Hello");
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
      db.userOpenedEmail(contactID, campaignID, results => {
        console.log("response from user opened email", results);
      });
    }
  });
});

app.get("/checkUser", (request, response) => {
  db.checkUserExists(request.body, data => {
    response.send(data);
  });
});

app.post("/newUser", (request, response) => {
  db.addNewUser(request.body, data => {
    response.send(data);
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
  // console.log("Getting user campaigns in the server", request.query.userID);
  db.getUserCampaigns(request.query.userID, data => {
    // console.log("response from campaigns,", data);
    response.send(data);
  });
});

app.post("/newCampaign", (request, response) => {
  // console.log("hit new campgiang");
  // console.log(request.body);
  db.addNewCampaign(request.body, data => {
    // console.log(data,"here")
    response.send(data);
  });
});

app.post("/updateCampaign", (request, response) => {
  // console.log("inside update campaign", request);
  db.updateCampaignStatus(request.body, data => {
    response.send(data.id);
  });
});

app.get("/shouldCampaignUpdate", (request, response) => {
  // console.log("should campaign update", request.query.id);
  var campaign = request.query.id;
  db.checkCampaignTemplate(campaign, data => {
    db.campaignContacts(campaign, res => {
      // console.log('campaign status,', data.length, 'template', res.length)
      if (data.length === 0 && res.length !== 0) {
        response.send(true);
      } else {
        response.send(false);
      }
    });
  });
});

app.get("/campaignContacts", (request, response) => {
  db.campaignContacts(request.query.id, data => {
    // console.log(data);
    response.send(data);
  });
});

app.post("/newContact", (request, response) => {
  var campaign = request.body.campaign;
  db.addNewContact(request.body.name, request.body.email, data => {
    // console.log("contact id", data.rows[0].id, "campaign", campaign);
    db.createCampaignContact(campaign, data.rows[0].id, res => {
      response.send(res);
    });
  });
});

app.post("/unsubscribe/:id", (request, response) => {
  var id = request.params.id;
  db.unsubscribnweeContact(id, data => {
    response.send(data);
  });
});

app.get("/templates/:campaignId", (request, response) => {
  // Get the id from the route
  const campaignId = request.params.campaignId;
  console.log(`campaignId: ${campaignId}`);
  // Load the URL from the database
  db.retrieveDraft(campaignId, (err, results) => {
    if (err) {
      throw err;
    }
    // {templateURL: "https://s3.amazonaws.com/..."}
    console.log(results);
    // Use the URL to get JSON from S3
    axios.get(results.templateurl).then(results => {
      // Send the JSON data back to the client
      response.send({ templateJSON: JSON.stringify(results.data) });
    });
  });
});

// TODO: Refactor constants into their own file, or `config.js`
const BUCKET_NAME = "targ-templates";

// TODO: this should be templates/:campaignId
app.post("/templates", (request, response) => {
  // console.log(request.body)
  // console.log(request.session);
  const { campaignId, designJSON, userID } = request.body;
  var file = JSON.stringify(designJSON);
  // console.log(designJSON);
  console.log(userID, "server");
  uploadToS3(userID, campaignId, file, (err, result) => {
    if (err) {
      throw err;
    }
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
        console.log("error in callback");
        console.log(err);
      }
      console.log("Made it to s3bucket upload callback");
      console.log(BUCKET_NAME);
      console.log(data);
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
  // console.log(request.body,"inserver")
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
  // console.log(objData, campaign)
  db.addContact(objData, data => {
    // console.log(data[0].rows[0].id,'add contact')
    // db.createCampaignContact(campaign, data.rows[0].id, res => {
    //   console.log("response from add", res);
    db.createMultiCampaignContact(campaign, data, res => {
      response.send(data);
    });
  });
});
//s3 drop
app.post("/exportHTML", (req, res) => {
  // console.log("getting frustrated");
  // console.log(req.body.data);
  var abc = req.body.data;

  sgMail.setApiKey(`${config.TOKEN}`);
  const msg = {
    to: req.body.sendgridEmails,
    from: "test@example.com",
    subject: req.body.subject,
    html: abc
  };
  sgMail.sendMultiple(msg);
  res.send(req.data);
});

app.post("/deleteContact", (request, response) => {
  // console.log('here', request.body)
  db.deletecampaignsContact(request.body, data => {
    db.deleteContact(request.body, data => {
      response.send(data);
    });
  });
});
app.get("/getProfile", (request, response) => {
  // console.log(request.query.userID)
  db.getProfile(request.query.userID, data => {
    response.send(data.rows[0]);
  });
});

app.post("/saveProfile", (request, response) => {
  // console.log(request.body.data)
  // console.log(request.body.user)
  db.saveProfile(request.body, data => {
    // console.log(data)
    response.send(data);
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
  db.addNewUser({ email: username, password }, (err, res) => {
    if (err) {
      console.log(err);
      console.log("How is this happening?");
      response.status(400).send({ error: "Bad Request" });
    } else {
      const userID = res.rows[0].id;
      const token = auth.genToken();
      // TODO: Remove hard coded userID
      auth.setSession(token, username);
      response.send({ token, userID });
    }
  });
});

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
