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

let app = express();

// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms as well
app.use(bodyParser.urlencoded({ extended: true }));
// Provides access to user sessions via `request.session`
app.use(auth.attachSession);
// Declare static files
app.use(express.static(__dirname + "/client/build"));

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

app.get("/", (request, response) => {
  response.send("Hello");
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
    response.send(data);
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

const BUCKET_NAME = "targ-templates";

app.post("/dropTemp", function(req, res, next) {
  const BUCKET_NAME = "targ-templates";
  console.log(JSON.stringify(req.body));
  var file = JSON.stringify(req.body);
  uploadToS3(file);
  res.send("sends");
});
function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function() {
    const name = "Testjh Name";
    const data = file;
    var params = {
      Bucket: BUCKET_NAME,
      Key: name,
      Body: data
    };

    s3bucket.upload(params, function(err, data) {
      if (err) {
        console.log("error in callback");
        console.log(err);
      }
      console.log("success");
      console.log(BUCKET_NAME);
      console.log(data);
    });
  });
}

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

app.post("/saveContactEmail", (request, response) => {
  var email = request.body;
  // console.log("gooogoogaagaaa", email);
  email.map(function(a) {
    db.addNewContactEmail(a, data => {});
  });
  // response.send()
});

// AUTH ROUTES
app.post("/login", (request, response) => {
  const { username, password } = request.body;
  // Change this function when database check is implemented
  auth.validateUserLogin(username, password).then(isValid => {
    // If credentials are valid, generate a new token and return it.
    if (isValid) {
      const token = auth.genToken();
      const userID = 1;
      auth.setSession(token, username);
      response.send({ token, userID });
    } else {
      response.status(401).send({ err: "Bad Credentials: Access Denied" });
    }
  });
});

app.post("/logout", (request, response) => {});
app.post("/signup", (request, response) => {});

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
