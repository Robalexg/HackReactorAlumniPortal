var express = require("express")
var path = require("path")
var app = express()
var passport = require("passport-facebook")


app.use(express.static(path.join(__dirname,"../client/")))

// app.get("/",function (req,res) {
// 	res.sendFile(path.join(__dirname ,"../client/public/index.html"))
// })

<<<<<<< HEAD
app.get("/auth/facebook")
=======
require('./config/middleware.js')(app, express);
// require('./config/routes.js')(app, express);

app.get("/auth/facebook");
>>>>>>> e2375f7b61181918f06b9288510b909ab98b3b08







app.listen(3000)
console.log("Listening on port 3000")

module.exports = app;

