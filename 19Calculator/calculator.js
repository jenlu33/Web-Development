const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

// __dirname gives you the file path of the current file 
// no matter where it's hosted (on somebody else's computer, in the cloud, etc)

app.listen(3000, () => console.log("server started on port 3000"));
