const express = require("express");
const bodyParser = require("body-parser");
const sendgrid = require("./sendgrid.js");
const db = require("./database");

let app = express();

// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms as well
app.use(bodyParser.urlencoded({ extended: true }));

// Declare static files
app.use(express.static(__dirname + "/client/build"));

app.get("/", (request, response) => {
  response.send("Hello");
});

app.get("/checkUser", (request, response) => {
  db.checkUserExists(request.body, data => {
    console.log(data);
    response.send(data);
  });
});

app.post("/newUser", (request, response) => {
  db.addNewUser(request.body, data => {
    console.log(data);
    response.send(data);
  });
});

app.post("/send", (request, response) => {
  sendgrid(request, response)
    .then(data => {
      console.log("Response", data);
      response.send();
    })
    .catch(err => {
      console.log("Error", err);
    });
});

app.get("/campaigns", (request, response) => {
  console.log("Getting user campaigns in the server", request.query.fromID);
  db.getUserCampaigns(request.query.fromID, data => {
    console.log(data);
    response.send(data);
  });
});

app.post("/newCampaign", (request, response) => {
  db.addNewCampaign(request.body, data => {
    console.log(data);
    response.send(data);
  });
});

app.get("/campaignContacts", (request, response) => {
  db.campaignContacts(request.query.id, data => {
    console.log(data);
    response.send(data);
  });
});

app.post("/newContact", (request, response) => {
  var campaign = request.body.campaignID;
  db.addNewContact(request.body, data => {
    db.createCampaignContact(campaign, data, res => {
      console.log(res);
      response.send(res);
    });
  });
});

// SERVER SETUP ------------------------------------------------

let port = process.env.PORT || 3001;

let server = app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
