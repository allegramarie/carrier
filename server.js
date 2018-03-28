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
const fetch = require("node-fetch");

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

const BUCKET_NAME = "targ-templates";
var newdata;

app.post("/dropTemp", function(req, res, next) {
  const BUCKET_NAME = "targ-templates";
  console.log("hello her", JSON.stringify(req.body));
  var file = JSON.stringify(req.body);
  uploadToS3(file, data => {
    console.log("this is the newdata");
    res.send(data);
  });
  // res.send("sends");
  // console.log(ehehe)
});
function uploadToS3(file, cb) {
  let s3bucket = new AWS.S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function() {
    const name = `${new Date()}`;
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
      console.log(data.Location);
      var templateURL = data.Location;
      while (templateURL) {
        db.saveTemplate(templateURL, res => {
          console.log(res);
          console.log("trying to save template into s3");
          // newdata = res.rows[0].id
          cb(res);
          // res.send(res)
        });
        break;
      }
      // setTimeout(function(){
      //   db.saveTemplate(templateURL, (res)=>{
      //     console.log('trying to save template into s3')
      //   })
      // },3000)
    });
  });
}

app.get("/getThatShit", function(req, res) {
  // console.log()
  console.log(req.query.fook);
  axios.get(req.query.fook).then(data => {
    var dataa = JSON.stringify(data.data);
    res.send(dataa);
  });
});

app.get("/retrieveDraft", function(req, res) {
  // var stuff
  db.retrieveDraft(newdata, data => {
    var link = data.rows[0].templateurl;
    console.log("draftdata", data.rows[0].templateurl);
    // axios.get(data.rows[0].templateurl, (dataa)=>{
    //   console.log(dataa)
    res.send(link);
  });
  // Promise.all(
  //   fetch(data.rows[0].templateurl)
  //   .then((resp)=>{ stuff = resp.text()})
  //   .then(console.log(stuff)))
  // })
});

// aws.config.update({
//   secretAccessKey: config.secretAccessKey,
//   accessKeyId: config.accessKeyId,
//   region: "us-east-1"
// });
// const s3 = new aws.S3();
// const upload = multer({}
//   storage: multerS3({
//     s3: s3,
//     bucket: "targ-templates",
//     key: function(req, file, cb) {
//       cb(null, `${new Date()}`);
//     }
//   })
// });

// app.post("/jsonToS3", (request, response) => {
//   var file = JSON.stringify(request.body);
//   console.log("req.body for json template", file);
//   var toUpload = fs.writeFile(file);
//   console.log("upload to", toUpload);
//   // upload.any(toUpload)
//   setTimeout(function() {
//     upload.any(toUpload);
//   }, 5000);
//   response.send("send");
// });
// >>>>>>> ericshum

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
// app.post("/exportHTML", (req, res) => {
//   console.log("getting frustrated");
//   // console.log(req.body.data);
//   var abc = req.body.data;
//   console.log(abc)
//   console.log('inside send email',req.body.sendgridEmails)

//   sgMail.setApiKey(`${config.TOKEN}`);
//   const msg = {
//     to: req.body.sendgridEmails,
//     from: "test@example.com",
//     subject: req.body.subject,
//     html: abc
//   };
//   sgMail.sendMultiple(msg);
//   console.log('sent')
//   res.send(req.data);
// });

app.post("/saveContactEmail", (request, response) => {
  var email = request.body;
  // console.log("gooogoogaagaaa", email);
  email.map(function(a) {
    db.addNewContactEmail(a, data => {});
  });
  // response.send()
});

app.post("/deleteContact", (request, response) => {
  // console.log('here', request.body)
  db.deletecampaignsContact(request.body, data => {
    db.deleteContact(request.body, data => {
      response.send(data);
    });
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
      response.status(400).send({ error: "Bad Request" });
    } else {
      const userID = res.id;
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
