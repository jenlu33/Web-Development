const express = require("express");
const bodyParser = require("body-parser");
const request = require("postman-request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;

  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
    },
  };

  // insert options here

  // request(options, function (error, response) {
  //   if (error) throw new Error(error);
  //   console.log(response.body);
  // });

  request(options, function (error, response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      // console.log(response.statusCode);
      res.sendFile(__dirname + "/failure.html");
    }
  });



  // res.send("post request sent")
})

app.post("failure", (req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

