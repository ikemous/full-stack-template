const router = require("express").Router();
const isAuthenticated = require("../config/middleware/isAuthenticated.js");
const db = require("../models");
const UserAccount = require("../models/userAccount.js");
const passport = require("passport");


router.get("/", (req, res) => {
    console.log(req.user);
    if(req.user)
    {
        res.redirect("nextPage");
    }
    res.redirect("/login");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/account/signup", ({body}, res) => {
    const newAccount = new UserAccount(body);
    newAccount.beforeCreate();
    newAccount.lastUpdatedDate();
    console.log(newAccount);

    db.UserAccount.insertMany(newAccount)
    .then(() => {
        res.redirect(307, "/");
    })
    .catch(err => {
        res.status(401).json(err);
    });
});

router.post("/account/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
});

router.get("/nextPage", isAuthenticated, (req, res) => {
    res.render("index");
});
module.exports = router;