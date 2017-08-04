var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog_demo_2", {useMongoClient: true});

var Post = require("./models/post");
var User = require("./models/user");

// GIVE USER A POST
Post.create({
	title: "do a thing",
	content: "Lorem ipsum dolor amet"
}, function(err, post) {
	User.findOne({
		email: "bob@gmail.com"
	}, function(err, foundUser) {
		if (err) {console.log(err);}
		else {
			foundUser.posts.push(post);
			foundUser.save(function(err, data) {
				if (err) console.log(err);
				else console.log(data);
			});
		}
	});
});

// CREATE USER
// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Belcher"
// }, function(err, user) {
// 	if (err) console.log(err);
// 	else console.log(user);
// });

// find user
// get all posts for that user
// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user) {
// 	if (err) console.log(err);
// 	else console.log(user);
// });