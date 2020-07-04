const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
    {
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
    this.lastUpdatedDate = Date.now();
    return this.userUpdated;
};

const userAccount = mongoose.model("userAccount", AccountSchema);

module.exports = userAccount;