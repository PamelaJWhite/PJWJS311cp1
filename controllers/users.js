//something comes before these functions, but what?

//need to access db

//POST function to add a teacher
const createTeacher = function(res, req){
    //add a teacher
    //minimum email or name?
        //prob both
        //email should be unique
    //auto create id
    // add to db?
}

//PUT function to modify a teacher
const modifyTeacher = function(res, req){
    //find by id(?)
    //by the id?
    //modify: first name, last name
    //can't change id
    //can't change email?  or can only if there isn't another the same?
}

//GET function to retrieve teacher by...
const getTeacher = function(res, req){
    // by id?
    //by email?
    //respond with whole object? or only certain info?
}
   

// DELETE function to delete a teacher
const deleteTeacher = function(res, req){
    //delete teacher 
    //by id?
    //by email?
}

//export controllers
modules.export = {
    
}
