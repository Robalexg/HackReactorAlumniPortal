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
	knex.select('*').from('messages').orderBy('created_at', 'desc')
  .then(function (table) {
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

// Updating Likes in the  Database. 
app.post('/likes',function(req,res){
  console.log('############ in likessss', req.body)
  knex('messages')
    .where({ id: req.body.content})
    .update({ likes: req.body.like})
    .then(function(data){
      console.log("added likes",data)
    }).catch(function(err){
      console.log("errr", err);
    })
   })



app.get('/questions',function(req,res){
  knex.select('*').from('questions')
  .then(function (table) {
    res.status(200).json(table)
  })
  .catch(function(err){
    console.log('this is a get/messages error', err)
  })
})


app.post('/questions',function(req,res){
  console.log("Helllo U r in Questions post", req.body)
  knex('questions').insert({content: req.body.content})
  .then(function () {
    console.log('this was added')
    res.status(201).end()
  })
})


app.get('/Answers',function(req,res){
 
 knex('Questions')
.join('Answers', 'Questions.id', '=', 'Answers.qid')
.select('Questions.id', 'Questions.Content','Answers.id','Answers.Answer','Answers.qid ')
 .then(function (table) { 
    res.status(200).json(table)
  })
  .catch(function(err){
    console.log('this is a get/messages error', err)
  })
 })



app.post('/Answers',function(req,res){
   console.log('Answersssssss Knex', req.body)
knex.insert({Answer:req.body.answer, qid:req.body.content}).into('Answers')
.then(function () {
     console.log('this was added')
     res.status(201).end()
   })
})


app.listen(3000)
console.log("Listening on port 3000")

module.exports = app;

