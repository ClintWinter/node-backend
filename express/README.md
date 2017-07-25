# Notes

* Keep in mind the HTTP request/response cycle  


Routes listen for and receive requests (get, post, etc.). Run some code depending on the request

## Install with --save  

Saves the package into our package.json file. Use `npm init` to create a boilerplate page.


## Routes  

* The `*` route match is for non-existant pages. Useful for a 404 page
    * The `*` catch all must be at the bottom of the routes, otherwise it will be used for every page.  

* Route parameters/variables or path variables are used to match any name. For example, reddit's subreddit. There isn't a route for every single subreddit, they just use a parameter to match it.
    * To use a parameter, we add a colon in front of the word. `app.get("/r/:subredditName", `
    * Anything in front of that word will go to the 404 page if there is no route for it.
        * `/r/gaming/comments` will go to the 404 page because there is more following the subreddit name
    * If we want to use that parameter in our page, we use the request in the callback function: `req.params`

* `res.send` only can be used once.

* `res.render()` will be used to render HTML(from an EJS file)... because sending plain text only works for so long!
    * EJS is embedded javascript. Kind of works similarly to PHP. We can send parameters and other values through the router to the ejs page, so that it is dynamic.
    * we must `npm install ejs --save` for the pages to actually work first.
    * In an EJS file we use `<% %>` tags, sort of like php `<? ?>` tags. inside those tags is javascript, just like inside the php tags is php. So we can do any kind of javascript that can be done in a regular js file.
    * We pass variables to the ejs page as the second argument of `res.render`. It must be an object. `res.render('home.ejs', {name: username});`
    * We can save a bit of code by letting our router know what type of files we will be serving up, so we don't have to put `.ejs` after every file name: `app.set("view engine", "ejs");`

* Partials
    * Let's not repeat css on every single view.
    * We use our main `app.js` file for this: `app.use(express.static("public"));` We created a public folder to hold all of our resources like css. This serves up ALL of the contents of the directory.
    * Notice so far we are missing all of our html boilerplate (DOCTYPE, html, head, body, etc.). This is where partials come in.
    * Add a directory called partials to the views directory. Create a 'header.ejs' and 'footer.ejs' file. Add the standard html boilerplate, as well as the links for css, etc. This is known by now. Then in the views we can add `<% include partials/header %>` and `<% include partials/footer %>` at the top and bottom to avoid writing all of that for each page.
    * Also make sure app.css href begins with a '/'.