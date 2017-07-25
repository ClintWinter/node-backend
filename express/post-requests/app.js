var app = require("express")();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var friends = ["Raleigh", "Ross", "Vinny", "Rick", "Kristen"];

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/friends", function(req, res) {
	res.render("friends", {
		friends: friends
	});
});

app.post("/addfriend", function(req, res) {
	var newFriend = req.body.friend;
	friends.push(newFriend);
	res.redirect("/friends");
});

app.get("*", function(req, res) {
	res.send("Page not found");
});

app.listen(3000, 'localhost', function() {
	console.log('Server listening...');
});