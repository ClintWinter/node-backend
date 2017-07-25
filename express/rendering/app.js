// alternative:
// var app = require("express")();

var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("home"); // give the name of a file
});

app.get("/fallinlovewith/:thing", function(req, res) {
	// var thing = req.params.thing;

	res.render("love", {
		thing: req.params.thing
	});
});

app.get("/posts", function(req, res) {
	var posts = [
		{title: "A new post", author: "Clint"},
		{title: "A totally different post", author: "Ross"},
		{title: "I love da gamez", author: "Jake"}
	];

	res.render("posts", {
		posts: posts
	});
})

app.listen(3000, 'localhost', function() {
	console.log("Server listening...");
});