# Associations

## Intro
How data relates to each other. Multiple types of relationships:

* one to one - one entity related to another (one book, one publisher)
* one to many - one entity related to many of another entity (one user, multiple photos. One user can have multiple photos but one photo cannot have multiple users)
* many to many - many of an entity related to many of another entity (students registering for courses. A student can sign up for multiple courses and a course can have multiple students.)

## Embedding Data
How to set up a one to many association to embed data. Like a user having many posts, but the posts belong to one user.

First we create a user and a post, and they are not related:

```javascript
var newUser = new User({
	email: "charlie@brown.edu",
	name: "Charlie Brown"
});

newUser.save(function(err, user) {
	if (err) console.log(err);
	else console.log(user);
});

var newPost = new Post({
	title: "Reflections on Apples",
	content: "They are delicious."
});

newPost.save(function(err, post) {
	if (err) console.log(err);
	else console.log(post);
});
```

To embed posts into the user, we change the user schema:

```javascript
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});
```

We give it an array, and in the array define what kind of data it will be receiving, which are posts. It requires the schema rather than the model. Also, make sure the postSchema is defined before the user, otherwise it won't know what postSchema is.

Let's embed a post for a new user:

```javascript
var newUser = new User({
	email: "spider-man@web.com",
	name: "Spider Man"
});

newUser.posts.push({
	title: "How to swing from buildings",
	content: "Just kidding, only I can do that fool!"
});

newUser.save(function(err, user) {
	if (err) console.log(err);
	else console.log(user);
});
```

Then we can find the user:

```javascript
User.findOne({name: "Spider Man"}, function (err, user) {
	if (err) console.log(err);
	else console.log(user);
});
```

Now we can add another post to an existing user:

```javascript
User.findOne({name: "Spider Man"}, function (err, user) {
	if (err) {console.log(err);}
	else {
		user.posts.push({
			title: "My Worst Enemy",
			content: "The green goblin!"
		});
		user.save(function(err, user) { // welcome to callback hell!
			if (err) console.log(err);
			else console.log(user);
		})
	}
});
```

When we save, we call another of the same callback inside the first callback. This is called callback hell, and that's why promises exist. I should probably learn those.

## Referencing Data
Referencing is very similar to embedding, but the difference between them is that (using the User/Post relationship again) instead of storing(embedding) the actual posts in an array inside user, we store an array of IDs(references).

```javascript
{
	name: "asdf",
	posts: [
		15623687654323456,
		12456764321235673,
		23456732346892345,
		12678321234568765
	]
}
```

Now, in our user Schema, instead of putting postSchema in the array, we do this:

```javascript
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
```

First create a user:

```javascript
User.create({
	email: "bob@gmail.com",
	name: "Bob Belcher"
}, function(err, user) {
	if (err) console.log(err);
	else console.log(user);
});
```

Then, let's create a post, find the user, and save that post to the user:

```javascript
Post.create({	// create the post
	title: "make a chair",
	content: "hammer wood"
}, function(err, post) {
	User.findOne({	// find the user
		email: "bob@gmail.com"
	}, function(err, foundUser) {
		if (err) {console.log(err);}
		else {
			foundUser.posts.push(post);	// link the post
			foundUser.save(function(err, data) {	// save the new user data
				if (err) console.log(err);
				else console.log(data);
			});
		}
	});
});
```

Yes, that is 3 nested callback functions; yes, it looks like a blob of shit. You should get this back:

```javascript
{ _id: 59808101ad7eb434aff4a224,
  email: 'bob@gmail.com',
  name: 'Bob Belcher',
  __v: 1,
  posts: [ 5980825365dac235812440d5 ] 
}
```

Next we want to do 2 things

1. Find the user
2. Find all posts for that user (the actual posts, not ids)

Which can actually be done with a single query:

```javascript
User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user) {});
```

We know what `findOne()` does. `.populate("posts")` will use the id to get the actual posts, and populate the posts array in the User object with the actual post data, not just the IDs. Then exec let's us use the callback and execute the query so we can get our data.

## Module.Exports
To clean up our code. Break everything up into different files. Create a folder called `models` and files for the schemas we use(Post and User). Go into `models/post.js`:

```javascript
// models/post.js

var mongoose = require("mongoose");

// POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});
var Post = mongoose.model("Post", postSchema);

module.exports = Post;
```

We must require mongoose in each file. Then we export the model to our main app.js(or in this case references.js) by requiring it `var Post = require("./models/post");`. When requiring from a different part of our app that isn't `node_modules`, we must specify the path by telling it to use the current directory with a `./`. Otherwise it will look in `node_modules`.