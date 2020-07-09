//import dependencies
const router = require("express").Router();
const isAuthenticated = require("../config/middleware/isAuthenticated.js");

/**
 * / route
 * Purpose: To render Home Page
 */
router.get("/", (req, res) => {
    //render index handlebars page
    res.render("index");
});// End /

/**
 * /login route
 * Purpose: To render login page
 */
router.get("/login", (req, res) => {
    if(req.user) res.redirect("/profile");
    //render login handlebars page
    res.render("login");
});

/**
 * /signup route
 * Purpose: Render signup page
 */
router.get("/signup", (req, res) => {
    if(req.user) res.redirect("/profile");
    //render signup handlebars page
    res.render("signup");
});//End /signup

//export routes
module.exports = router;