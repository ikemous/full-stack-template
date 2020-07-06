const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email"
        },
        (email, password, done) => {
            db.UserAccount.find({email: email})
            .then(user => {
                if(!user)
                {
                    return done(null, false, {
                        message: "incorrect Email"
                    });
                }
                else if (!user[0].validPassword(password))
                {
                    return done(null, false, {
                        message: "incorrect Password"
                    });
                }
                return done(null, user);
            });
        }
    )
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

module.exports = passport;