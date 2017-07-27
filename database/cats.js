var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// first, connect to a DB.
mongoose.connect("mongodb://localhost/cat_app", {useMongoClient: true});
// cat_app is the name of the database

var catSchema = new mongoose.Schema({ // setting a pattern that each object will follow
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema); // creating a model to use for all functions (find, insert, etc.)
// "Cat" (in the model method) should be the singular version of your collection

// adding a new cat to the DB.
// var george = new Cat({
// 	name: "George",
// 	age: 11,
// 	temperament: "Grouchy"
// });
// george.save(function(err, cat) { // callback function so we can check if it wasn't added
// 	if (err) {
// 		console.log("ERROR");
// 	} else {
// 		console.log("saved: ");
// 		console.log(cat);
// 	}
// });

// create: new and save all at once
Cat.create({
	name: "Benny",
	age: 15,
	temperament: "Nice"
}, function(err, cat) {
	if (err) {
		console.log(err);
	} else {
		console.log(cat);
	}
});

// retrieve all cats from the DB and console.log each one.
Cat.find({}, function(err, cats) {
	if (err) {
		console.log("ERROR: " + err);
	} else {
		console.log("ALL THE CATS....");
		cats.forEach(function(cat) {
			console.log(cat.name + " - " + cat.age + " - " + cat.temperament);
		});
	}
});