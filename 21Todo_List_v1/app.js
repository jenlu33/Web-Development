const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
  const today = new Date();

  if (today.getDay() === 0 || today.getDay() === 6) {
    res.send("Yay, it's the weekend!!")
  } else {
    res.send("Boo, it's not the weekend")
  }
});

app.listen(3000, () => {
  console.log("server started on port 3000");
})