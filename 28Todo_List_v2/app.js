//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemsSchema = new mongoose.Schema ({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
  name: "Welcome to your todo list!"
})
const item2 = new Item ({
  name: "Hit the + button to add a new item"
})
const item3 = new Item ({
  name: "<-- Hit this to delete an item"
})

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema ({
  name: String,
  items: [itemsSchema]
});

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {
  Item.find({}, (error, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Successfully inserted many into Items Collection!");
        }
      });
    }

    res.render("list", {listTitle: "Today", newListItems: foundItems});
  });
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item ({
    name: itemName
  });

  if (listName === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, (error, found) => {
      if (!error) {
        found.items.push(newItem);
        found.save();
        res.redirect(`/${listName}`);
      }
    });
  }
});

app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("successfully removed item!");
      }
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate( // what we're finding, what we want to update, callback
      {name: listName},
      {$pull: {items: {_id: checkedItemId}}}, // pull from items array that has an id of the checkedItemId
      (error, found) => {
        if (!error) {
          res.redirect(`/${listName}`);
        }
      }
    )
  }

  
})

app.get("/:customName", (req, res) => {
  const title = _.startCase(req.params.customName);
  List.findOne({name: title}, (error, found) => {
    if (!error) {
      if (!found) {
        const list = new List ({
          name: title,
          items: defaultItems
        });
        list.save();
        res.redirect(`/${title}`);
      } else {
        res.render("list", {listTitle: title, newListItems: found.items});
      }
    } 
  })

})


app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
