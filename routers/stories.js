//import express
const express = require('express')

//create a router object to handle the routes
const router = express.Router()

//import the controllers
const controllers = require('../controllers/stories')

//POST create one story 
//the verb POST and the path /stories creates the route to create a story
//controllers.createStory gives access to the function in the controllers file
router.post('/stories', controllers.createStory)

//GET all: summaries of stories
//the verb GET and the path /stories creates the route to get all stories
//controllers.getstories gives access to the function in the controllers file
router.get('/stories', controllers.getStories)

//GET one with details
//the verb GET and the path /stories/:id creates the route to get one story
//controllers.getStoryDetails gives access to the function in the controllers file
router.get('/stories/:id', controllers.getStoryDetails)

//PUT modify one
//the verb PUT and the path /stories/:id creates the route to create a story
//controllers.modifyStory gives access to the function in the controllers file
router.put('/stories/:id', controllers.modifyStory)

//DELETE one
//the verb DELETE and the path /stories/:id creates the route to create a story
//controllers.deleteStory gives access to the function in the controllers file
router.delete('/stories/:id', controllers.deleteStory)

//export router object so routes can be used elsewhere in the code
module.exports = router