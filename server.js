const express = require("express");
const bodyParser = require("body-parser");
const sendgrid = require("./sendgrid.js");

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

app.post("/send", (request, response) => {
  console.log("here");
  sendgrid(request, response)
    .then(data => {
      console.log("Response", data);
      response.send();
    })
    .catch(err => {
      console.log("Error", err);
    });
});

// SERVER SETUP ------------------------------------------------

let port = process.env.PORT || 3001;

let server = app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
