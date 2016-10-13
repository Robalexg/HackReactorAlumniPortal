var express = require("express")
var path = require("path")
var app = express()



app.use(express.static(path.join(__dirname,"../client/")))

app.get("/",function (req,res) {
	res.sendFile(path.join(__dirname ,"../client/public/index.html"))
})







app.listen(3000)
console.log("listening")

