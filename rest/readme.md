# RESTful Routing

## Introduction

* Define REST and explain WHY it matters
* List of all  RESTful routes
* Show example of RESTful routing in practice

_REST(Representational State Transfer) - a mapping between HTTP routes and CRUD_  

**C**reate  
**R**ead  
**U**pdate  
**D**estroy   

REST is good because it's a predictable pattern. Sort of like an industry standard.

There are 7 restful Routes:

|	Name	|	Path			|	HTTP Verb	|	Purpose								|
|	---		|	---				|	---			|	---									|
|	Index	|	/dogs			|	GET			|	List all dogs						|
|	New		|	/dogs/new		|	GET			|	Show new dog form 					|
|	Create	|	/dogs			|	POST		|	Create a new dog, then redirect		|
|	Show	|	/dogs/:id		|	GET			|	Show info about single dog			|
|	Edit	|	/dogs/:id/edit	|	GET			|	Show edit form for single dog		|
|	Update	|	/dogs/:id		|	PUT			|	Update a single dog, then redirect	|
|	Destroy	|	/dogs/:id		|	DESTROY		|	Delete a single dog, then redirect	|

It makes sense when you think about it because, at least with express, when you go to /dogs/:id to delete for example, the parameters give you the id so you can target it to delete it from the database. If you didn't use /dogs/:id, you'd have to use some other wonky way to target and delete the dog.  

We are allowed to do anything we want, obviously, but RESTful routing is simply a guideline to use HTTP requests the way it was envisioned.  

You may notice that the root of a site doesn't actually have anything attached to it. `localhost/` would be a 404. It's typical to have the root redirect to our index, `/dogs`.  

### <%-
`<%-  %>` will render html as opposed to `<%=  %>` leaves it as plain text. This useful because our blog posts need italics/bold and paragraph formatting.

### Edit/Update

`edit.ejs` file to edit an object

```javascript
// edit
app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, blog) {
		if (err) res.redirect("/blogs");
		else res.render("edit", {blog: blog});
	});
});
```

PROBLEM: html forms don't support PUT requests, so when using a form to update, we can't change the method to PUT to make it go to the right place. It defaults to a get instead. To fix this we use something called `method-override`. In the form's `action` attribute, we have to add `?_method=PUT` to the end, and method-override will see _override the method_ and do a PUT request like desired.

`npm install method-override --save`  

Require the package in app.js, and write the following line:  

`app.use(methodOverride("_method"));`  

This makes it so whenever `_method` is detected, whatever it's value is, override the current request being done and use the specified method instead. Now we can use the PUT route as we need to:

```javascript
// update
app.put("/blogs/:id", function(req, res) {
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog) {
		if (err) res.redirect("/blogs/"+req.params.id+"/edit");
		else res.redirect("/blogs/"+req.params.id+"/show");
	});
});
```

### Destroy  

We have to use the method-override thing again to delete. We can't simply use a button, we actually have to put the button inside a form to use the delete request. Same as with put, we use the suffix `?_method=DELETE` to make it do the proper request.

```html
<form action="/blogs/<%= blog._id %>?_method=DELETE" method="POST">
	<input type="submit" value="DELETE">
</form>
```

Now for our delete route we can use another specific mongoose function to perform the needed action:  

```javascript
// delete
app.delete("/blogs/:id", function(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if (err) res.redirect("/blogs");
		else res.redirect("/blogs");
	});
});
```

Was getting an error when clicking delete: `cannot DELETE /blogs/<id>?_method=DELETE`. Realized I forgot the slash before blogs at `app.delete("blogs/:id`. If I get that error check that.

### Express Sanitizer

Used to sanitize html where user inputs html, to block them from uploading malicious content.  

`$ npm install express-sanitizer --save`  

`sanitizer = require("express-sanitizer")`  

`app.use(sanitizer());` must go after the `app.use` for body-parser.  

Will be used for create and update:  
`req.body.blog.body = req.sanitize(req.body.blog.body);` re-assigns it to itself as a sanitized version. Things like script tags will be removed.