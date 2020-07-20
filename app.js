// expres will help to set locahost
const express = require("express");
const app = express();

// request initiliased for fetching data using apis
var request = require("request");


// api key
// 20508155a28a2cde37c27df0837520f9-us10

// mailchimp audience LIST id
// 5dc3f94b10

// body parser is used to fetch data from forms
const bodyParser = require("body-Parser");

app.use(bodyParser.urlencoded({
  extended: true
}));

// for using this functon "method = post" hona chaiye form ke andr!!
app.post("/subscribed", function(req, res) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;

  const data = {
    members: {
      email_address: email,
      status: "pending"
    }
  }

  const jsondata = JSON.stringify(data);

  // callling our request function
  var options = {
    url: "https://us10.api.mailchimp.com/3.0/lists/5dc3f94b10",
    method: "POST",
    headers: {
      Authorization: "auth 20508155a28a2cde37c27df0837520f9-us10"
    },
    body: jsondata
  };



  request(options, function(error, res, body) {
    if (error) {
      console.log("cant submit")
    } else if(res.statusCode===200){
      console.log("You are now subscribed");
    }

  });
});



// sending dta to our server to display(using express) get method
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.use(express.static("static"));











// starting server at 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("server has started");
});
