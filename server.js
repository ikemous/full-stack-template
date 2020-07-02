const express = require("express");
const exphbs = require("express-handlebars");

const server = expres();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Set Handlebars.
server.engine("handlebars", exphbs({ defaultLayout: "main" }));
server.set("view engine", "handlebars");

server.listen(PORT, () => {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});