const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

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

const dataBaseName = "newDatabase";
mongoose.connect(`mongodb://localhost/${dataBaseName}`,{
    useNewUrlParser: true,
    useFindAndModify: false
});

server.use(require("./routes/html-routes.js"));

server.listen(PORT, () => {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});