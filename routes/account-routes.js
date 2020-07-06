const router = require("express").Router();
const UserAccount = require("../models/userAccount.js");

router.get("/account/users", (req, res) => {
    UserAccount.find({}).then(accounts => {
        res.json(accounts);
    });
});

module.exports = router;