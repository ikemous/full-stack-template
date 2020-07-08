//Import depencencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//Create Schema from mongoose
const Schema = mongoose.Schema;

//Create AccountSchema
const AccountSchema = new Schema(
    //Chema Rows
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

/**
 * setFullName()
 * Purpose: Use the first and last name to set full name
 * Parameters: None
 * Return: FullName - users first and last name in one string
 */
AccountSchema.methods.setFullName = function() {
    //Update full name
    this.fullName = `${this.firstName} ${this.lastName}`;
    //return full name
    return this.fullName;
};//End setFullName()

/**
 * lastUpdatedDate()
 * Purpose: Update the date the user updated profile information
 * Parameters: None
 * Return: userUpdated - Todays date for updated date
 */
AccountSchema.methods.lastUpdatedDate = function() {
    //updated updatedDate
    this.userUpdated = Date.now();
    //return updated date
    return this.userUpdated;
};//End lastUpdatedDate

/**
 * validPassword()
 * Purpose: Use bcrypt to check if password is the same as hash
 * Parameters: password - password inputed by the user
 * Return: true/false - if password is the same
 */
AccountSchema.methods.validPassword = function(password){
    //Use bcrypt to check passwords
    return bcrypt.compareSync(password, this.password);
};//End validPassword()

/**
 * profileInfo()
 * Purpose: grab profile information from the user
 * Parameters: None
 * Return: profile - object containing user information
 */
AccountSchema.methods.profileInfo = function(){
    //create profile object
    const profile = {
        userName: this.userName,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        fullName: this.fullName,
        updated: this.userUpdated
    }
    //return profile information
    return profile;
};//end profileInfo()

/**
 * beforeCreate()
 * Purpose: Encrypt the password using bcrypt
 * Parameters: None
 * Return: FullName
 */
AccountSchema.methods.beforeCreate = function(){
    //ecrypt user password
    this.password = bcrypt.hashSync(
        this.password,
        bcrypt.genSaltSync(10),
        null
    );
};//end beforeCreate()

//Finish UserAccountModel
const UserAccount = mongoose.model("UserAccount", AccountSchema);
//Export UserAccount Model
module.exports = UserAccount;