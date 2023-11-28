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
  password: "*********",  // use your own MySQL root password
  database: "finalproject"
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
// dynamically creating view page (Adrienne)
app.get("/listings", function (req, res) {
    // sql query to be used
    var sql_query = "select listing_id, house_id, address, postal_code, description, date_listed, rent, utilities, date_available from listing natural join house";

    con.query(sql_query, function (err, result, fields) {
        if (err)
            throw err;
        else {
            var html_body = "<HTML><STYLE>body{font-family:arial}</STYLE>";
            html_body = html_body + "<BODY>";
            html_body = html_body + "<img src=https://www.lawsonstate.edu/sites/www/Uploads/images/Programs_Of_Study/Academic_Programs/course%20descriptions.jpg width=500></img>";
            html_body = html_body + "<TABLE BORDER=1 WIDTH=800>";

            //*** print column headings
            html_body = html_body + "<TR>";
            for (var i = 0; i < fields.length; i++)
                html_body = html_body + ("<TH style=\"color:Tomato\">" + fields[i].name.toUpperCase() + "</TH>");
            html_body = html_body + "</TR>";

            //*** prints rows of table data
            for (var i = 0; i < result.length; i++)
                html_body = html_body + ("<TR><TD style=\"vertical-align:top\">" + "<b>" + result[i].listing_id + "</b>" + "</TD>" +
                    "<TD style=\"vertical-align:top\">" + result[i].house_id + "</TD>" +
                    "<TD style=\"vertical-align:top\">" + result[i].address + "</TD>" +
                    "<TD style=\"vertical-align:top\">" + result[i].postal_code + "</TD>" +
                    "<TD style=\"vertical-align:top\">" + result[i].description + "</TD>" +
                    "<TD style=\"vertical-align:top\">" + result[i].date_listed + "</TD>" +
                    "<TD style=\"vertical-align:top\">" + result[i].rent + "</TD>" +
                    "<TD style=\"vertical-align:top\">" + result[i].utilities + "</TD>" +
                    "<TD style=\"vertical-align:top\">" + result[i].date_available + "</TD></TR>");


            html_body = html_body + "</TABLE>";

            //** finish off the html body with a link back to the search page
            html_body = html_body + "<BR><BR><BR><a href=http://localhost:3000/>Main Menu</a><BR><BR><BR>";
            html_body = html_body + "</BODY></HTML>";

            console.log(html_body);             // send query results to the console
            res.send(html_body);                // send query results back to the browser
        }
    });
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