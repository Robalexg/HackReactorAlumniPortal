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

app.get('/messages',function(req,res){
	knex('messages').select().then(function (table) {
		res.status(200).json(table)
	})
  .catch(function(err){
    console.log('this is a get/messages error', err)
  })
})

app.post('/messages',function(req,res){
  console.log('############', req.body)
  knex('messages').insert({content: req.body.content})
  .then(function () {
    console.log('this was added')
    res.status(201).end()
  })
})

app.post('/likes',function(req,res){
  console.log('############', req.body)
  Knex('messages')
    .where('id', req.body.id)
    .update({
    likes: req.body.likes,
    })
    .then(function(data){
      console.log("added likes",data)
    })
})




app.listen(3000)
console.log("Listening on port 3000")

module.exports = app;

