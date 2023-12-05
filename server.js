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
  password: "***************",  // use your own MySQL root password
  database: "finalproject"
});

//*** connect to the database
con.connect(function(err) {
  if (err)
      throw err;
  console.log("Connected to MySQL");
});

var usernameID= null; // variable to store the agent ID

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
//*** this routing table handles most the GET requests from the browser (Nadin)
//******************************************************************************
app.get("/", function (req, res) {
    readAndServe("./login.html",res)

});


app.get("/login", function (req, res) {
    readAndServe("./login.html",res)

});

app.get("/unauthorized_access", function (req, res) {
    readAndServe("./unauthorized_access.html",res)

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

app.get("/delete_done", function (req, res) {
    readAndServe("./delete_done.html",res)

});

app.get("/delete_fail", function (req, res) {
    readAndServe("./delete_fail.html",res)

});

app.get("/update_done", function (req, res) {
    readAndServe("./update_done.html",res)

});

app.get("/update_fail", function (req, res) {
    readAndServe("./update_fail.html",res)

});

app.get("/add_done", function (req, res) {
    readAndServe("./add_done.html",res)

});

app.get("/add_fail", function (req, res) {
    readAndServe("./add_fail.html",res)

});

/* ******************************************************************************************
This routing table handles all the post request sent from the browser (Adrienne + Nadin)
********************************************************************************************* */
//Adrienne:
app.post("/login", function (req, res) {
    //getting login information from user
    var username = req.body.username;
    var password = req.body.password;

    //query to be used
    var sql_query = "select agent_id from agent where email = '" + username + "' and password = '" + password + "'";

    con.query(sql_query, function (err, result, fields) {
        if (err) {
            throw err;
        }
       //if results found, process results
        else if (result.length > 0) {
            usernameID = result[0].agent_id; //storing agent id to specialize the other pages
            res.redirect('/main'); //if login is correct, take agent to the main page
        }
        //take to error page if no results
        else {
            console.log("reached second if");
            res.redirect('/unauthorized_access');
        }
    })
});
app.post("/add", function (req, res) {
    //variables for listing table
    var listingId = req.body.listingID,
        description = req.body.description,
        date_listed = req.body.date_listed,
        rent = req.body.rent,
        utilities = req.body.utilities,
        date_available = req.body.date_available;

    //variables for house table
    var house_id = req.body.houseID,
        stories = req.body.stories,
        type = req.body.type,
        num_bedrooms = req.body.num_bedrooms,
        num_bathrooms = req.body.num_bathrooms,
        parking = req.body.parking,
        basement = req.body.basement,
        address = req.body.address,
        postal_code = req.body.postal_code;

    var house_sql_query = "insert into house values(" + house_id + ", " + stories + ", '" + type + "', " + num_bedrooms + ", " + num_bathrooms + ", '" + parking + "', '" + basement + "', '" + address + "', " + postal_code + ")";
    con.query(house_sql_query, function (err, result, fields) {
        //if any information is entered incorrectly or empty triggers a sql error
        if (err) {
            res.redirect('/add_fail'); //instead of becoming unavailable, redirect to fail page
        }
        //if adding new house into house table is successful, move on to adding the listing
        else if (result.affectedRows = 1) {
            console.log("ADD DONE");
            var listing_sql_query = "insert into listing values(" + listingId + ", " + usernameID + ", " + house_id + ", '" + description + "', '" + date_listed + "', " + rent + ", '" + utilities + "', '" + date_available + "')";
            //adding new listing into listing table
            con.query(listing_sql_query, function (err, result, fields) {
                console.log(listing_sql_query);
                //if any information is entered incorrectly or is empty triggers a sql error
                if (err) {
                    res.redirect('/add_fail');
                }
                else if (result.affectedRows = 1) {
                    res.redirect('/add_done'); //if successful, redirect to done page
                }
                else {
                    res.redirect('/add_fail');
                }
            })
        }
        else {
            res.redirect('/add_fail');
        }
    })
});


//Nadin:
app.post("/search", function (req, res) {
    var detail = req.body.detail;   // extract the strings received from the browser
    var postal_code = req.body.postal_code; 
    var sql_query;

    if(detail != "" && postal_code != ""){
    sql_query = "select listing_id, house_id, address, postal_code, description, date_listed, rent, utilities, date_available from listing natural join house where description like '%" + detail + "%' and postal_code like '%" + postal_code + "%' and agent_id = " + usernameID + ";"; }
    else if(detail != "" && postal_code == ""){
    sql_query = "select listing_id, house_id, address, postal_code, description, date_listed, rent, utilities, date_available from listing natural join house where description like '%" + detail + "%' and agent_id = " + usernameID + ";"; }
    else if(postal_code != "" && detail == ""){
    sql_query = "select listing_id, house_id, address, postal_code, description, date_listed, rent, utilities, date_available from listing natural join house where postal_code like '%" + postal_code + "%' and agent_id = " + usernameID + ";"; }
    else{
    sql_query = "select listing_id, house_id, address, postal_code, description, date_listed, rent, utilities, date_available from listing natural join house where agent_id = " + usernameID + ";"; }



    con.query(sql_query, function (err, result, fields) { // execute the SQL string
    if (err)
         throw err;                  // SQL error
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
				  html_body = html_body + "<BR><BR><BR><a href=http://localhost:3000/search>Back to search page</a><BR><BR><BR>";
			      html_body = html_body + "</BODY></HTML>";

                console.log(html_body);             // send query results to the console
			    res.send(html_body);                // send query results back to the browser
	         }
    });
});


app.post("/delete", function (req, res) {

    var listingID_for_delete = req.body.listingID_for_delete;       // extract the string received from the browser

    var sql_query = "delete from listing where listing_id = 0" + listingID_for_delete + " and agent_id = " + usernameID + ";";

    con.query(sql_query, function (err, result, fields) { // execute the SQL string
    if (err)
        res.send("Illegal Query" + err);                  // SQL error

    else {
                console.log(sql_query);                                   // send query results to the console
                const affectedRows = result.affectedRows;
                if(affectedRows>0){
	        	res.redirect("http://localhost:3000/delete_done");}  // redirect to the page that reflects the action done
                else{
                	res.redirect("http://localhost:3000/delete_fail");} 	
		
 
         }
    });
});




/* ******************************************************************************************
This handles specific GET requests from the browser (Adrienne)
********************************************************************************************* */
// dynamically creating view page (Adrienne)
app.get("/listings", function (req, res) {
    // sql query to be used
    var sql_query = "select listing_id, house_id, address, postal_code, description, date_listed, rent, utilities, date_available from listing natural join house where agent_id = " + usernameID +";";
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

            //** finish off the html body with a link back to the main page
            html_body = html_body + "<BR><BR><BR><a href=http://localhost:3000/main>Main Menu</a><BR><BR><BR>";
            html_body = html_body + "</BODY></HTML>";

            console.log(html_body);             // send query results to the console
            res.send(html_body);                // send query results back to the browser
        }
    });
});
