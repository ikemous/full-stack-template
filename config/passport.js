//import dependcies
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//import database
const db = require("../models");
//Initialize passport
passport.use(
    new LocalStrategy(
        {
            //Email is the login username
            usernameField: "email"
        },
        //Check login information
        (email, password, done) => {
            //Query email from database
            db.Accounts.find({email: email})
            .then(user => {
                //Check for user
                if(!user)
                {
                    //Return callback with massage
                    return done(null, false, {
                        message: "incorrect Email"
                    });
                }
                //Check if the user has a valid password
                else if (!user[0].validPassword(password))
                {
                    //Return callback with message
                    return done(null, false, {
                        message: "incorrect Password"
                    });
                }
                //Return callback with user information
                return done(null, user);
            });
        }
    )
);

//User login
passport.serializeUser((user, cb) => {
    cb(null, user);
});

//User Logout
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

//export passport
module.exports = passport;