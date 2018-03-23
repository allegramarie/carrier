const express = require("express");
const bodyParser = require("body-parser");
const sendgrid = require("./sendgrid.js");
const db = require("./database");
const auth = require("./auth");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("./config.js");
const sgMail = require("@sendgrid/mail");
var minify = require("html-minifier").minify;
const axios = require("axios");

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
  console.log(req.body.data);
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
    response.send(data);
  });
});

app.post("/newCampaign", (request, response) => {
  db.addNewCampaign(request.body, data => {
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
  var campaign = request.body.campaign;
  db.addNewContact(request.body.name, request.body.email, data => {
    console.log("contact id", data.rows[0].id, "campaign", campaign);
    db.createCampaignContact(campaign, data.rows[0].id, res => {
      console.log("response from add", res);
      response.send(res);
    });
  });
});

aws.config.update({
  secretAccessKey: config.secretAccessKey,
  accessKeyId: config.accessKeyId,
  region: "us-east-1"
});
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "targ-templates",
    key: function(req, file, cb) {
      cb(null, `${new Date()}-${file.originalname}`);
    }
  })
});

app.post("/dropTemp", upload.any(), (request, response) => {
  console.log("YOOOOOOOOOOOOOO", request.body.myFiles);
  console.log("FACKKKKKKKKK", request.files);
  response.send("send");
});
app.post("/drop", (request, response) => {
  // console.log(request.body.params.data)
  const newData = request.body.params.data.split("\n");
  // newDatas = newData.split(',')
  var newsplitData = [];
  const objData = { name: [], email: [] };
  for (let i = 0; i < newData.length; i++) {
    var splitData = newData[i].split(",");
    // var newsplitData = []
    newsplitData.push(
      splitData.filter(function(n) {
        return n !== " " && n !== "";
      })
    );
    // splitData = splitData.flatten()
  }
  // console.log(splitData)
  var newArray = [].concat.apply([], newsplitData);
  for (let j = 0; j < newArray.length; j++) {
    if (j % 2 === 0) {
      objData.name.push(newArray[j]);
    } else {
      objData.email.push(newArray[j]);
    }
  }
  // var newdataArray = []

  // console.log(newArray)
  // console.log(newData,"ori data")
  // console.log(objData,"before send")
  // response.send('send')
  db.addContact(objData, data => {
    response.send(data);
  });
  // .then((response)=>{
  //   console.log(response)
  // })
  // .catch((err)=>{
  //   console.log(err)
  // })
  // console.log("callback",err)

  // response.send(res)
});
//s3 drop
app.post("/exportHTML", (req, res) => {
  console.log("getting frustrated");
  console.log(req.body.data);
  var abc = req.body.data;
  // var b = req.body.data.replace(/\s{2,}/g, '').replace(/\'/g, '').replace(/(\r\n|\n|\r)/gm,"")
  // var escaper = b.replace(/\"/g,"\\\"");
  // console.log(escaper)
  // var temp = JSON.parse(JSON.stringify(req.body.data))
  // console.log('hello world', req.body)
  // console.log('fuck',req.body[0])
  // var obj = JSON.stringify(req.body)
  // var html = obj.slice(1,-1)
  // console.log(html)
  // html.replace(/\s{2,}/g, '').replace(/\'/g, '"');
  // console.log('this is the way', html)
  // var var1 = html.replace(/\"/g,"\\\"")
  // console.log(req.body) //this is the HTML
  // var result = minify(`${req.body}`, {
  //   removeAttributeQuotes: true
  // });
  // setTimeout(function(){console.log(JSON.parse(result))},3000)
  // return axios({
  //   method: "post",
  //   url: "https://api.sendgrid.com/v3/mail/send",
  //   headers: {
  //     Authorization: `Bearer ${config.TOKEN}`,
  //     "Content-Type": "application/json"
  //   },
  //   data: {
  //     personalizations: [
  //       {
  //         to: [
  //           {
  //             email: "eshum89@gmail.com",
  //             name: "John Doe"
  //           },
  //         ],
  //         subject: "Hello, World!"
  //       }
  //     ],
  //     from: {
  //       email: "allegra.berndt@gmail.com",
  //       name: "Allegra"
  //     },
  //     reply_to: {
  //       email: "allegra.berndt@gmail.com",
  //       name: "Allegra"
  //     },
  //     subject: "Please Work!",
  //     content: [
  //       {
  //         type: "text/html",
  //         value: `${escaper}`
  //       }
  //     ]
  //   }
  // })
  //   .then(response => {
  //     console.log("success");
  //   })
  //   .catch(error => {
  //     console.log("Within sendgrid error", error);
  //   });

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
  console.log("gooogoogaagaaa", email);
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
