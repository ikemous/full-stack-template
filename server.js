const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport");

//Create server setup
const server = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Set Handlebars.
server.engine("handlebars", exphbs({ defaultLayout: "main" }));
server.set("view engine", "handlebars");

// Static directory
server.use(express.static("public"));

const dataBaseName = process.env.MONGODB_URI || "UserAccount";
mongoose.connect(`mongodb://localhost/${dataBaseName}`,{
    useNewUrlParser: true,
    useFindAndModify: false
});

const secretString = process.env.SECRET || "secret";
// We need to use sessions to keep track of our user's login status
server.use(
    session({ secret: `${secretString}`, resave: true, saveUninitialized: true })
);
server.use(passport.initialize());
server.use(passport.session());


server.use(require("./routes/html-routes.js"));
server.use(require("./routes/account-routes.js"));

server.listen(PORT, () => {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});