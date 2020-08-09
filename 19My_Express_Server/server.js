const express = require('express');
const app = express();


// method that's provided by Express that allows us to specify 
// what should happen when a browser gets in touch with our server
// and makes a GET request

// req = response, res = response
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
})

app.get("/about", (req, res) => {
  res.send("<h3>Hello I am Jen and I want to be the best programmer</h3><br><p>hohohaha</p>")
})

app.get("/hobbies", (req, res) => {
  res.send("I have some hobbies")
})

app.listen(3000, () => {
  console.log("server started on port 3000");
});

