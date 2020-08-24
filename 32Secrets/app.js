require('dotenv').config(); //do not need to set to a constant. Important to put it right at top
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const FacebookStrategy = require("passport-facebook").Strategy;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
  secret: "This is a secret sentence.",
  resave: false,
  saveUninitialized: false
})); // sets up session

app.use(passport.initialize()); //sets up passport to start using for auth
app.use(passport.session()); // use passport for dealing with the session

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
  googleId: String,
  facebookId: String,
  secrets: Array
});

userSchema.plugin(passportLocalMongoose); // hash and salt our passwords, and save users to MongoDB
userSchema.plugin(findOrCreate);

// const secret = process.env.SECRET;
// userSchema.plugin(encrypt, { secret: secret }); // encrypts the entire database
// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] }); // encrypts the specific fields

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy()); // creates local login strategy

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/secrets"
    },
    function (accessToken, refreshToken, profile, cb) {
      // console.log(profile);
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.get("/", (req, res) => {
  
  res.render("home");
});

app.get("/auth/google",
  // use passport to authenticate our user using the Google strategy(setup above)
  passport.authenticate("google", {scope: ["profile"]}) //will bring up popup/new page to sign in with google
);

app.get("/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
});

app.get("/auth/facebook", 
  passport.authenticate("facebook")
);

app.get("/auth/facebook/secrets",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/secrets");
  }
);


app.get("/login", (req, res) => {
  res.render("login");
});

// app.post("/login", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   User.findOne({email: username}, (err, foundUser) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (foundUser) {
//         bcrypt.compare(password, foundUser.password, (err, result) => {
//           if (result) {
//             res.render("secrets");
//           }
//         })
        
//       }
//     }
//   });
// });

app.post("/login", (req, res) => {
  const user = new User ({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, err => {
    if (err) {
      console.log(err); 
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      })
    }
  })
});

app.get("/register", (req, res) => {
  res.render("register");
});

// app.post("/register", (req, res) => {
//   bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
//     const newUser = new User({
//       email: req.body.username,
//       password: hash,
//     });

//     newUser.save((err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.render("secrets");
//       }
//     });
//   })
  
// });

app.post("/register", (req, res) => {
  User.register({username: req.body.username}, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      })
    }
  })
});

app.get("/secrets", (req, res) => {
  // looks through the "secret" field of all users where secret is not null
  User.find({"secrets":{$ne: null}}, (err, foundUsers) => {
    if (err) {
      console.log(err);
    } else {
      res.render("secrets", {usersWithSecrets: foundUsers});
    }
  }); 
});

app.get("/logout", (req, res) => { //ends user session
  req.logout();
  res.redirect("/");
});

app.get("/submit", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

app.post("/submit", (req, res) => {
  const submittedSecret = req.body.secret;

  User.findById(req.user.id, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else if (foundUser){
      foundUser.secrets.push(submittedSecret);
      foundUser.save(() => {
        res.redirect("/secrets");
      });
    }
  });
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
})