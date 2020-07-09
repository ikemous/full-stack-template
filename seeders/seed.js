const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost/accounts", {
    useNewUrlParser: true,
    useFindAndModify: false
});

const userAccountSeed = [
    {
        username: "Ikemous",
        email: "ikemous@ikemous.com",
        password: "secret",
        firstname: "ike",
        lastname: "ikelast"
    }
];

const users = userAccountSeed.map(account => {
    const newAccount = new db.Accounts(account);
    newAccount.beforeCreate();
    return newAccount;
});

console.log(users);

db.Accounts.deleteMany({})
.then(() => db.Accounts.insertMany(users))
.then(data => {
    console.log(" records inserted!");
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});
