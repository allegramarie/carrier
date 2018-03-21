const express = require("express");
const bodyParser = require("body-parser");
const sendgrid = require("./sendgrid.js");
const db = require("./database");
const auth = require("./auth");

let app = express();

// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms as well
app.use(bodyParser.urlencoded({ extended: true }));

// Provides access to user sessions via `request.session`
app.use(auth.attachSession);

// Declare static files
app.use(express.static(__dirname + "/client/build"));

app.get("/", (request, response) => {
  response.send("Hello");
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
  db.getUserCampaigns(request.body, data => {
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

// AUTH ROUTES
app.post("/login", (request, response) => {
  const { username, password } = request.body;
  console.log("In login");
  console.log(username, password);
  // Change this function when database check is implemented
  auth.validateUserLogin(username, password).then(isValid => {
    // If credentials are valid, generate a new token and return it.
    if (isValid) {
      const token = auth.genToken();
      auth.setSession(token, username);
      response.send({ token });
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
