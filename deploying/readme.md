# Deploying

How to actually host our new app on our own site, heroku, or AWS.  

For this example we use heroku.

Make sure our package.json has all of our saved dependencies because when we put our application on a host like heroku, they will run `npm install` and pull all the dependencies in that are needed to run the app.

Create a heroku account, then download the heroku CLI that is in the (getting started guide)[https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up] for node.  

Once that's done, start with `$ heroku login` and give your email/password.

If the app isn't in a git repo yet, do that now.

Then run `$ heroku create`. This generates the app, and adds a remote in git called "heroku". Now to push your app to heroku, run `$ git push heroku master`. However, this most likely will not work when you go to the given url.  

To see errors, run `$ heroku logs --tail`. The error you should see is "ERR! missing script: start", which is the script to run the app from package.json. Go to `package.json` and add this in "scripts":

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"i
  },
```

Then we add the changes to master FIRST! `$ git add -A` then `$ git commit -m "changes"`.
Now we can push the master changes to heroku: `$ git push heroku master`.

You can also open the app using `$ heroku open`.

**_NOTE: Using variables from an outside untracked file won't work. Not sure the optimal way to do it yet, but you can set config vars for heroku with `heroku config:set Var=something`. And use process.env.VAR in the file. Then for local you can use a package called `node-env-file` that will pull variables you set in a .env file by requiring it and then doing `env(__dirname + '/.env');` to get them._**