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