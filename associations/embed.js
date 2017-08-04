var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog_demo", {useMongoClient: true});

// POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);



// var newUser = new User({
// 	email: "spider-man@web.com",
// 	name: "Spider Man"
// });

// newUser.posts.push({
// 	title: "How to swing from buildings",
// 	content: "Just kidding, only I can do that fool!"
// });

// newUser.save(function(err, user) {
// 	if (err) console.log(err);
// 	else console.log(user);
// });

// var newPost = new Post({
// 	title: "Reflections on Apples",
// 	content: "They are delicious."
// });

// newPost.save(function(err, post) {
// 	if (err) console.log(err);
// 	else console.log(post);
// });

User.findOne({name: "Spider Man"}, function (err, user) {
	if (err) {console.log(err);}
	else {
		user.posts.push({
			title: "My Worst Enemy",
			content: "The green goblin!"
		});
		user.save(function(err, user) {
			if (err) console.log(err);
			else console.log(user);
		});
	}
});