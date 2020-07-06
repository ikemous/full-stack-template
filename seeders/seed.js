const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost/useraccount", {
    useNewUrlParser: true,
    useFindAndModify: false
});

const userAccountSeed = [
    {
        userName: "Ikemous",
        email: "ikemous@ikemous.com",
        password: "secret",
        firstName: "ike",
        lastName: "ikelast",
        userUpdated: Date.now(),
        fullName: "ike ikelast"
    }
];

db.UserAccount.deleteMany({})
.then(() => db.UserAccount.insertMany(userAccountSeed))
.then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});
