//******************************************************************************
//*** set up an HTTP server off port 3000 (Nadin)
//******************************************************************************
const express = require("express");
const app = express();
const port = 3000;

//*** server waits indefinitely for incoming requests
app.listen(port, function () {
  console.log("NodeJS app listening on port " + port);
});

//*** create form parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


//******************************************************************************
//*** set up mysql connections (Nadin)
// ******************************************************************************
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "CXWZ1051#cxwz",  // use your own MySQL root password
  database: "examples"
});

//*** connect to the database
con.connect(function(err) {
  if (err)
      throw err;
  console.log("Connected to MySQL");
});



//******************************************************************************
//*** File system module used for accessing files in nodejs (Nadin)
//******************************************************************************

const fs = require("fs");

function readAndServe(path, res)
{
    fs.readFile(path,function(err, data) {

        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    })
}

//******************************************************************************
//*** this routing table handles all the GET requests from the browser (Nadin)
//******************************************************************************
app.get("/", function (req, res) {
    readAndServe("./login.html",res)

});

app.get("/login", function (req, res) {
    readAndServe("./login.html",res)

});

app.get("/main", function (req, res) {
    readAndServe("./main.html",res)

});

app.get("/search", function (req, res) {
    readAndServe("./search.html",res)

});

app.get("/add", function (req, res) {
    readAndServe("./add.html",res)

});

app.get("/update", function (req, res) {
    readAndServe("./update.html",res)

});

app.get("/delete", function (req, res) {
    readAndServe("./delete.html",res)

});