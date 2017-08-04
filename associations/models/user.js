var mongoose = require("mongoose");

// USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [ // An array of
		{
			type: mongoose.Schema.Types.ObjectId, // object ids
			ref: "Post" // belonging to post.
		}
	]
});
var User = mongoose.model("User", userSchema);

module.exports = User;