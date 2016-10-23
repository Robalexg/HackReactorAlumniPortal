var express = require("express")
var path = require("path")
var app = express()
var configKnex = require("../knexfile.js")
var middleware = require("./config/middleware")
var authFacebook = require('./config/passport.js')
var passport = require("passport")
var uuid = require("uuid")
var knex = require('knex')(configKnex.development)
knex.migrate.latest([configKnex])

authFacebook(passport,knex,app)
middleware(app,express)

app.get("/auth",function (req,res) {
  if(req.cookies['session-id']){
    knex("sessions").where({sessionId:req.cookies['session-id']}).then(function(session){
      if(session != 0){
        res.sendStatus(200)      
      }else{
        res.sendStatus(401)
      }
    })
  }
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
  knex('messages')
    .where('id', req.body.id)
    .update({
    likes: req.body.likes,
    })
    .then(function(data){
      console.log("added likes",data)
    })
})

app.get('/users',function(req,res){
  knex("user").select().then(function (users) {
    if(users != 0){
      res.status(200).json(users)  
    }
  })
})




app.listen(3000)
console.log("Listening on port 3000")

module.exports = app;

