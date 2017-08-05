var mongoose = require("mongoose");
var plm = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

userSchema.plugin(plm);

var User = mongoose.model("User", userSchema);

module.exports = User;