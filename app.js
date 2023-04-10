//jshint esversion:6
require("dotenv").config();
//Needs to be called as early as possible in the file because if you make a environment variable and it's not configured, it won't work
//Do 'touch .env' inside the terminal. It is a hidden file.
const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");
// const encrypt = require("mongoose-encryption");
const bcrypt = require("bcrypt")

const app = express();

//Allows EJS to look inside the views folder
app.set("view engine", "ejs");

//Commands that allow us to use body-parser and EJS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

//Connect to Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/userDB", {
  useNewUrlParser: true,
});

//SCHEMAS

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Can call the environment variable anytime
// Will only encrypt the password field
// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]});

const User = mongoose.model("User", userSchema);

// ====================================================================================================================================================================================

app.get("/", function (req, res) {
  res.render("home");
});

// LOGIN
app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    // Compare the outcome of this to the stored hashed password

    const user = await User.findOne({ email: username });
    console.log(user);

    // Check if the user exists
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Check if the password is correct by comparing to the stored password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      throw new Error("Invalid email or password");
    }

    res.render("secrets");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// REGISTRATION
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {

    // Hash the password before saving it to the database
    // Set a salt value of 10 
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create new user using data entered into registration form
    const newUser = new User({
      email: req.body.username,
      password: hashedPassword,
    });

    await newUser.save();
    console.log(newUser);


    console.log("User registered successfully");
    res.render("secrets");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// ====================================================================================================================================================================================

app.listen(3000, function () {
  console.log("Server now started on port 3000");
});
