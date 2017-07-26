# Databases

## Intro to Databases
* What is a datbase
	* A collection of information/data
	* Has an interface
* SQL(relation) vs NoSQL(non-relation)

### SQL
* SQL tables are relational, tabular, and flat.

### No-SQL
* NO tables, and things can be nested
* BSON - binary javascript object notation
* Basically javascript objects
* Rather than id's and join tables, we can just nest all a user's comments as an array in their object.
* It may be more flexible, but mostly they are not better than SQL databases.

MEAN Stack - Mongo / Express / Angular / Node

## Mongo Basics
* run `$ mongod` in one terminal window and leave it
* run `$ mongo` in the other to use the mongo shell
* to see databases, type `show dbs`
* to use or create a new database, type `use <db>`
* type `help` to see basic commands
* most commonly used will be `insert`, `find`, `update`, `remove`.
* An example: `db.dogs.insert({name: "Phoebe", breed: "Coton"})`
	* `db` is the database currently being used
	* `dogs` is the collection inside that database. It does not need to be created. Using it creates it, same as a database.
	* `insert` is obviously the action.
	* When successfully inserted, you'll receive `WriteResult({ "nInserted" : 1 })`
* Type `show collections` to see the collections that have been created. After the last line, `dogs` would be one of the collections we see.
* To see the objects in the dog collection, type `db.dogs.find()`.
	* If no arguments passed, you'll filter out no dogs.
	* A unique ID will be assigned to each object added to a collection. `"_id": ObjectID("asekfljj1235vdsa")`
	* To filter down to specific dogs, like the name of Phoebe, do `db.dogs.find({name: "Phoebe"})`
* The acronym __CRUD__ is used to describe these basic database actions
	* Create (insert)
	* Read (find)
	* Update (update)
	* Destroy (remove)
* To update a dog, `db.dogs.update({name: "Emma"}, {name: "Emma", breed: "Lab"})`
	* Two arguments are used in update. The first is to filter to find the object, the second is what to change it to.
	* Notice the second argument also has name, updating this way is more of a replace. If we leave out the name in the second argument, the name will be removed.
	* Let's add another property `db.dogs.update({name: "Phoebe"}, {$set: {name: "Finn", isCute: true}})`
		* Using `$set` will preserve the other properties when updating an object
* Last is remove `db.dogs.remove({breed: "Bernese"})`
	* Straight forward, will remove all objects that match.
	* We can also use a modifier if wanted to only remove up to a certain number of objects
		* `db.dogs.remove({breed: "Bernese"}).limit(1)`