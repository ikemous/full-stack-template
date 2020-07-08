const router = require("express").Router();
const isAuthenticated = require("../config/middleware/isAuthenticated.js");
const db = require("../models");
const UserAccount = require("../models/userAccount.js");
const passport = require("passport");


router.get("/", (req, res) => {
    res.render("index");
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

    db.UserAccount.create(newAccount)
    .then(() => {
        res.redirect(307, "/account/login");
    })
    .catch(err => {
        res.status(401).json(err);
    });
});

router.post("/account/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
});

router.get("/profile", isAuthenticated, (req, res) => {
    db.UserAccount.findById({_id: req.user[0].id})
    .then(async user => {
        const profileInfo = await user.profileInfo()
        await res.render("profile", {profile: profileInfo});
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;