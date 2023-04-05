//jshint esversion:6
require('dotenv').config();
//Needs to be called as early as possible in the file because if you make a environment variable and it's not configured, it won't work
//Do 'touch .env' inside the terminal. It is a hidden file.
const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");
const encrypt = require("mongoose-encryption");

const app = express();

//Allows EJS to look inside the views folder
app.set("view engine", "ejs");

//Commands that allow us to use body-parser and EJS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Connect to Mongoose
mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
});

//SCHEMAS

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

//Can call the environment variable anytime 
//Will only encrypt the password field
userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]});


const User = mongoose.model("User", userSchema);


// ====================================================================================================================================================================================

app.get("/", function (req, res) {
  res.render("home");
});

//LOGIN
app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username }).then(function (foundUser) {
    if (foundUser) {
      //Check if the user exists and if their password matches the password entered
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("secrets");
        }
      }
    } else {
      res.send("Error");
    }
  });
});

//REGISTRATION
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  //Create new user using data entered into registration form
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });

  newUser
    .save(function (err) {
      res.status(400).json({ message: err.message });
    })
    .catch(function () {
      res.status(200).render("secrets");
    });
});

app.listen(3000, function () {
  console.log("Server now started on port 3000");
});
