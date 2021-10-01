//import the mysql library
let mysql = require('mysql')

//this accesses the .env file
require("dotenv").config("");

//give the information to allow it to access the db
//using variables attached to the .env file, because that information is private
let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB
  })

//make that connection
connection.connect();

//issue a query on that connection 
//and the callback is saying
  //do this with errors
  //or else (if the error is falsey)show me the sqlrows in the console
connection.query("use " + process.env.MYSQL_DB, function(error, rows){
  console.log("Inside connection.query in db/db")
  if(error){
      console.log("DB query error", error)
  } else {
      console.log("Query results:", rows)
}
})

//this exports the connection
//which will be used by the controllers files
module.exports = connection;