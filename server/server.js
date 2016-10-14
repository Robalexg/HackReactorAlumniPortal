var express = require("express")
var path = require("path")
var app = express() 
var configKnex = require("../knexfile.js")
var middleware = require("./config/middleware")
var authFacebook = require('./config/passport.js')
var passport = require("passport")
var knex = require('knex')(configKnex.development)
 knex.migrate.latest([configKnex])

authFacebook(passport,knex)
middleware(app,express)

app.get("/",function (req,res) {
	res.sendFile(path.join(__dirname ,"../client/public/index.html"))
})

app.get("/success",function (req,res) {
	res.end("success")
})
app.get('/fail',function (req,res) {
	res.end("nahhh")
})




app.listen(3000)
console.log("Listening on port 3000")

module.exports = app;

