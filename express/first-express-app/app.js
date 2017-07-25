var express = require("express");
var app = express();

// "/" => "Hi"
app.get("/", function(req, res) {
	res.send("Hi!");
});

// "/bye" => "Bye"
app.get("/bye", function(req, res) {
	res.send("Goodbye!");
});

// "/dog" => "meow"
app.get("/dog", function(req, res) {
	res.send("MEOW!");
});

app.get("/r/:subredditName", function(req, res) {
	console.log(req.params);
	var subreddit = req.params.subredditName;
	res.send("welcome to r/" + subreddit);
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
	console.log(req.params);
	res.send("a reddit post's comments!");
});

app.get("*", function(req, res) {
	res.send("YOU ARE A STAR");
});


// Tell Express to listen for requests (start server)
app.listen(3000, 'localhost', function() {
	console.log("Server has started");
});