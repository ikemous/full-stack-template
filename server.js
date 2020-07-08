//import dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const compression = require("compression");
//import passport configurations
const passport = require("./config/passport");

//Create server setup
const server = express();
const PORT = process.env.PORT || 8080;

//compress files for Progressive Web Applications
server.use(compression());

// Sets up the Express app to handle data parsing
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Set Handlebars.
server.engine("handlebars", exphbs({ defaultLayout: "main" }));
server.set("view engine", "handlebars");

// Static directory
server.use(express.static("public"));
server.use(express.static("./node_modules/bootstrap/dist/js/"));

//Connect to Mongodb server
const dataBaseName = process.env.MONGODB_URI || "UserAccount";
mongoose.connect(`mongodb://localhost/${dataBaseName}`,{
    useNewUrlParser: true,
    useFindAndModify: false
});

//Create sevret password
const secretString = process.env.SECRET || "secret";
// We need to use sessions to keep track of our user's login status
server.use(
    session({ secret: `${secretString}`, resave: true, saveUninitialized: true })
);
server.use(passport.initialize());
server.use(passport.session());

//implement server routes
server.use(require("./routes/html-routes.js"));
server.use(require("./routes/account-routes.js"));

//create server to listen on defined PORT
server.listen(PORT, () => {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});