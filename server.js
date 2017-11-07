var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var STUDENTS_COLLECTION = "students";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// STUDENTS API ROUTES BELOW


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all students
 *    POST: creates a new student
 */

app.get("/students", function(req, res) {
});

app.post("/students", function(req, res) {
});

/*  "/students/:id"
 *    GET: find students by id
 *    PUT: update students by id
 *    DELETE: deletes students by id
 */

app.get("/students/:id", function(req, res) {
});

app.put("/students/:id", function(req, res) {
});

app.delete("/students/:id", function(req, res) {
});


{
  "_id": <ObjectId>
  "firstName": <string>,
  "lastName": <string>,
  "email": <string>,
  "phoneNumbers": {
    "mobile": <string>,
    "work": <string>
  },
  "twitterHandle": <string>,
  "addresses": {
    "home": <string>,
    "work": <string>
  }
}

app.post("/students", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!(req.body.firstName || req.body.lastName)) {
    handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
  }

  db.collection(STUDENTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});