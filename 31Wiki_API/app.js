const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/WikiDB", { useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
  .get((req, res) => { // fetches all articles
    Article.find((err, foundArticles) => {
      if (err) {
        res.send(err)
      } else {
        res.send(foundArticles);
      }
    });
  })

  .post((req, res) => { // creates one articles
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save((err) => {
      if (err) {
        res.send(err)
      } else {
        res.send("Successfully added a new article!")
      }
    });
  })

  .delete((req, res) => { // deletes all articles
    Article.deleteMany(err => { // 1. conditions(if none then everything will be deleted) 2. callback
      if (err) {
        res.send(error);
      } else {
        res.send("Successfully deleted everything!")
      }
    })
  });


app.route("/articles/:articleTitle")
  .get((req, res) => { // fetch a specific article
    const title = req.params.articleTitle;
    Article.findOne({title: title}, (err, foundArticle) => {
      if (foundArticle){
        res.send(foundArticle);
      } else {
        res.send("No article found with that name");
      }
    });
  })
  .put((req, res) => {
    Article.update( // 1. conditions 2. updates 3. overwrite: true (tells mongodb we want to overwrite the entire document with the updates) 4. callback
      {title: req.params.articleTitle},
      {title: req.body.title, content: req.body.content},
      {overwrite: true},
      (err) => {
        if (!err) {
          res.send("Successfully updated article using put!")
        }
      }
    );
  })
  .patch((req, res) => {
    Article.update( // overwrite is no longer set to true, only updates what needs updating
      {title: req.params.articleTitle},
      {$set: req.body},
      (err) => {
        if (!err) {
          res.send("Successfully updated article using patch!")
        }
      }
    )
  })
  .delete((req, res) => {
    Article.deleteOne({title: req.params.articleTitle}, (err) => {
      if (!err) {
        res.send("Successfully deleted single article!")
      } else {
        res.send(err)
      }
    });
  });


app.listen(3000, function () {
  console.log("Server started on port 3000");
});