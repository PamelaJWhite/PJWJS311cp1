//import express
const express = require('express')

//instantiate an application server
const app = express();

//use express to parse json
app.use(express.json())

//Here are my static files for use
app.use(express.static('public'))

//import routes for stories
const stories = require("./routers/stories")

//use the routes from the stories folder
app.use(stories)

//hold the port this app will use
//which is defined in the .env file
let port = process.env.PORT

//connect to the port
app.listen(port, function(){
    console.log("Hey, is this thing on? Port: ", port)
})


