var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
	var animal = req.params.animal.toLowerCase();
	var sounds = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof",
		cat: "Meow",
		goat: "maaaaa",
		sheep: "baaaaa",
		horse: "neigh",
		donkey: "wee-snaw",
		goldfish: "..."
	};

	res.send("The " + animal + " says '" + sounds[animal] + "'");
});

app.get('/repeat/:text/:number', function(req, res) {
	var text = req.params.text;
	var number = Number(req.params.number);
	var message = '';
	for (var i = 0; i < number; i++) {
		message += text + ' ';
	}

	res.send(message);
});

app.get("*", function(req, res) {
	res.send("Oops! Wrong turn.");
});

app.listen(3000, 'localhost', function() {
	console.log('Started');
});