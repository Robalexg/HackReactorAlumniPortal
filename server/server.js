var express = require("express")
var path = require("path")
var app = express()
var passport = require("passport-facebook")


app.use(express.static(path.join(__dirname,"../client/")))

app.get("/",function (req,res) {
	res.sendFile(path.join(__dirname ,"../client/public/index.html"))
})

app.get("/auth/facebook")







app.listen(3000)
console.log("listening")

