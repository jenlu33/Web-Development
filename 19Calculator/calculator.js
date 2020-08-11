const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse data that comes from an HTML form
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

// __dirname gives you the file path of the current file 
// no matter where it's hosted (on somebody else's computer, in the cloud, etc)

app.post("/", (req, res) => {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let result = num1 + num2;
  res.send(`The result of the calculation is ${result}`)
})

app.get("/bmi", (req, res) => {
  res.sendFile(__dirname + "/bmi.html");
})

app.post("/bmi", (req, res) => {
  let weight = Number(req.body.weight);
  let height = Number(req.body.height);
  let bmi = Math.round(weight / (height * height));
  res.send(`Your BMI is ${bmi}`);
})

app.listen(3000, () => console.log("server started on port 3000"));
 