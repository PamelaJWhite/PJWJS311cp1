//change controller file b/c i changed the location of this file

//import express?
const express = require('express')
//use express?

//import controller file
const controller = require('./controllers')

//use or access the Router?
let router = express.Router() //????

//POST path to add a teacher
router.post("/teacher", controller.createTeacher)
    
//PUT path to update a teacher by id
router.put("/teacher/id", controller.FUNCTION_NAME)

//GET path to get all teachers? or get a teacher by id?or both?
router.get("/teacher/id", controller.FUNCTION_NAME)

//DELETE path to delete a teacher
router.delete("/teacher/id", controller.FUNCTION_NAME)

//export the routes
module.exports(
    routers
)