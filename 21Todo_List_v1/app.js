const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

let items = ['buy food', 'cook food', 'eat food'];
let workItems = [];

app.set('view engine', 'ejs'); // tells our app which is generated using Express to use EJS as its view engine

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  let day = date.getDate();
  res.render("list", { listTitle: day, newItems: items });
});

app.post("/", (req, res) => {
  let item = req.body.newTodo;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", {listTitle: "Work List", newItems: workItems});
});

app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about", (req, res) => {
  res.render("about");
})



app.listen(3000, () => {
  console.log("server started on port 3000");
})