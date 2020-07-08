const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
    {
        userName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
        },
        password: {
            type: String,
            trim: true,
            required: "Password is Required",
            validate: [({ length }) => length >= 6, "Password should be longer."]
        },
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        userCreated: {
          type: Date,
          default: Date.now
        },
        userUpdated: Date,
        fullName: String
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

AccountSchema.methods.setFullName = function() {
    this.fullName = `${this.firstName} ${this.lastName}`;
    return this.fullName;
};

AccountSchema.methods.lastUpdatedDate = function() {
    this.userUpdated = Date.now();
    return this.userUpdated;
};

AccountSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

AccountSchema.methods.profileInfo = function(){
    const profile = {
        userName: this.userName,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        fullName: this.fullName,
        updated: this.userUpdated
    }
    return profile;
};

AccountSchema.methods.beforeCreate = function(){
    this.password = bcrypt.hashSync(
        this.password,
        bcrypt.genSaltSync(10),
        null
    );
};

const UserAccount = mongoose.model("UserAccount", AccountSchema);

module.exports = UserAccount;