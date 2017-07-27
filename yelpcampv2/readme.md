# YelpCamp version 2  

Cloned version 1 and will continue to improve upon it. Including:  

* improved header/title
* grid display
* style form
* add Mongoose
* setup campground model
* Add showpage
	* Review the RESTful routes we've seen
	* Add description to campground model
	* Show db.collection.drop()
	* Add a show route/template


## RESTful routes  

7 types of RESTful routes:

| Name   | URL       | Verb | Description                      |
|--------|-----------|------|----------------------------------|
| INDEX  | /dogs     | GET  | Display a list of all dogs.      |
| NEW    | /dogs/new | GET  | Displays form to make a new dog. |
| CREATE | /dogs     | POST | Add new dog to DB.               |
| SHOW   | /dogs/:id | GET  | Shows info about ONE dog         |
|        |           |      |                                  |
|        |           |      |                                  |
|        |           |      |                                  |

## db.collection.drop()

`db.collection.drop()` deletes everything in the database. `db.campgrounds.drop()` gets rid of all saved campgrounds.

## findById  

Mongoose gives us a command called `findById` which allows us to find an item by its mongo-assigned id. Use like this: 

```javascript
Campground.findById(req.params.id, function(err, campground) {
	if (err) return err;

	res.render("show", campground);
});
```