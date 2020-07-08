//import dependencies
const router = require("express").Router();
const passport = require("passport");
//import authentication middleware
const isAuthenticated = require("../config/middleware/isAuthenticated.js");
//import databases
const db = require("../models");


/**
 * /account/signup route
 * Purpose: To sign up user and insert them into the database
 */
router.post("/account/signup", ({body}, res) => {
    //create new user
    const newAccount = new UserAccount(body);
    //hash password
    newAccount.beforeCreate();
    //update updated date
    newAccount.lastUpdatedDate();
    //Create user account
    db.UserAccount.create(newAccount)
    .then(() => {
        //redirect to profile page
        res.redirect(307, "/account/login");
    })
    .catch(err => {
        //change status and return json of err
        res.status(401).json(err);
    });
});//End /account/signup

/**
 * /account/login route
 * Purpose: To login user to the website
 */
router.post("/account/login", passport.authenticate("local"), (req, res) => {
    //return user information
    res.json(req.user);
});//End /account/login

/**
 * /profile
 * Purpose: to render profile information
 */
router.get("/profile", isAuthenticated, (req, res) => {
    //use user information to find database information
    db.UserAccount.findById({_id: req.user[0].id})
    .then(async user => {
        //grab user profile information
        const profileInfo = await user.profileInfo();
        //render profile page
        await res.render("profile", {profile: profileInfo});
    })
    .catch(err => {
        //return json of err
        res.json(err);
    });
});//end /profile

//export routes
module.exports = router;