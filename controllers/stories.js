
//get access to the database file
let db = require('../db/db')

//loooooook at all my pretty functions that get the stuff done!

//POST create one story 
const createStory = function(req, res){
    console.log("Welcome to createStory()" )
    //code to add a story to the DB

    //get the different parts of the req body
        //get the title
    let title = req.body.title
        //get the content
    let content = req.body.content

    //only accept it if there is a title (required)
    //if no title, send error
    //and exit the function
    if (!title){
        console.log("There wasn't a title in the req")
        return res.sendStatus(400)
    }else {
    //else if title then...
        //id is assigned automatically (see db/boilerplate)
        //use sql to add the story to the db
        let sql = `INSERT INTO stories(title, content) values ("${title}", "${content}")`
        db.query(sql, function(error, rows){
            //return a response of 500 if the query fails
            if (error){
                console.log("I FAILED to add to database", error)
                res.sendStatus(500);
            } else {
                //else return a response that it's okay
                res.sendStatus(204)
            }
        })
    }
}

//this function retrieves all the stories, 
//summarizes them into id and title, 
//and saves them as an array
const getStories = function(req, res){
    console.log("Bienvenidos al getStories()")

    //issue the query: SELECT * FROM stories to look through all the stories in the db
    let sql = "SELECT * FROM stories"

    // and process the results
    db.query(sql, function(error, rows){
        //if there is an error, respnd back with 500 on the response
        if (error){
            console.log("I FAILED to add to database", error)
            res.sendStatus(500);

        //if there is no error
        } else {
            console.log("Hey hey! Look! We didn't GET an error! rows: ", rows)

            //instantiate an empty array
            let storiesArray = []

            //loop through the resutls of the query
            //using map() to create a summary and add the summary to the array for each
            let createStoriesArray = rows.map(function createStoriesArray(element){

                // create a variable for the new, summarized story object
                //and store an object in it that contains the title and id
                let storySummary = {
                    id: element.id,
                    title: element.title 
                }

                //add that storySummary to the storiesArray
                storiesArray.push(storySummary)
                console.log("storiesArray: ", storiesArray)
            })
        //send the array back on the response 
        res.json(storiesArray)
        }
    })         
}

//function to get one story with details
const getStoryDetails = function(req, res){
    console.log("Wilkommen getStoryDetails()")

    //save the id we got in the request as a variable
    let requestedId = req.params.id
    console.log("requested id:", requestedId)

    //grab the whole db
    let sql = "SELECT * FROM stories"

    //process it
    db.query(sql, function(error, rows){

        //if there is an error, respnd back with 500 on the response
        if (error){
            console.log("I FAILED", error)
            // res.sendStatus(500);

        //if there is no error
        } else {
            console.log("rows: ", rows)

            //loop through the db of stories
            let found = rows.find(function(element){

                //find the story id that matches the saved id
                if(element.id == requestedId){
                    return true
                }
                else{
                    return false
                }
            })
            if(!found){
                //if there's no matching id to be found in the db, send 404 status
                res.sendStatus(404)
            }
            console.log("found: ", found)
        }
    })
}

//PUT modify one story
//this works
    //but it has several layers
    //and I feel like it could be much simpler or at least shorter
    //it uses db.query three times
        //twice those queries are almost the same thing
        //should I combine them, somehow? 
        //make the db.query part a function
        //then call that function for each piece that needs to be updated?
const modifyStory = function(req, res) {
    console.log("Bienvenue modifyStory()")

    //save the id in the request
    let requestedId = req.params.id

    //grab all the data from the db
    let sql = "SELECT * FROM stories"

    //process the results
        //in british accent: why helloooo db, i'd like to query you
    db.query(sql, function(error, rows){
        console.log("Hey modifyStories, let's process some stuff")

        //do something with an error
        if(error){
            res.sendStatus(500)
        }else{
            console.log("modifyStories() - there's no error")

            //loop through the array of rows
            rows.find(function(element){
                console.log("the id of the db row: ", element.id)

                //find the row with the id that matches the req. id
                if(element.id == requestedId){
                    console.log("i found the correct id:", element.id)

                    //save that id number 
                    let foundId = element.id

                    //save the whole found object 
                    let foundStory = element
                    console.log("Found a story that matches: ", foundStory)

                
                    //grab the title from the request
                    requestedTitle = req.body.title
                    //grab the content from the request
                    requestedContent = req.body.content
                    console.log("title of the request: ", requestedTitle)

                    //if there is a title in the request,
                    if(requestedTitle ){
                        console.log("There is a title! title of the request: ", requestedTitle)

                        //replace the db title with the requested title
                        let updateSql = `UPDATE stories SET title = '${requestedTitle}' WHERE id = ${foundId};`
                        db.query(updateSql, function(error, rows){
                            console.log("title db.query in modifyStories")
                         })
                    }

                    // if there is content, replace the db content with the requested content
                    if(requestedContent){
                        console.log("I DO have content: ", req.body.content)
                        let updateSql = `UPDATE stories SET content = '${requestedContent}' WHERE id = ${foundId};`
                        db.query(updateSql, function(error, rows){
                            console.log("content db.query in modifyStories")
                        })
                    }
                }
            })  
        }
    })
    res.sendStatus(204)
}
//DELETE one story
const deleteStory = function(req, res){
    console.log("Benvenuto deleteStory()")

    //collect the id of the req
    let requestedId = req.params.id

    //get all from the db
    //I'm repeating this a bunch, too... should/ could i simplify it?
        //really, i find the damn id several times, should/ could i simplify that?
    let sql = "SELECT * FROM stories"

    //process the results
    db.query(sql, function(error, rows){

        //loop through the db
        rows.find(function(element){

            //find matching ids
                //I know it doesn't really matter which side of each variable is on
                //but is there a conventional way to decide which side?
            if(element.id == requestedId){

                //delete the story on the db with the matching id   
                let deleteSql = `DELETE from stories WHERE id = ${requestedId}`;
                db.query(deleteSql, function(error, rows){
                    console.log("That's all, folks! Goodbye: ", rows)
                })
            }
        })
    })
    res.sendStatus(204)
}

//export the functions so the routers file can (or any file could) use them
module.exports = {
    createStory,
    getStories,
    getStoryDetails,
    modifyStory, 
    deleteStory
}
