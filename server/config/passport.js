var configAuth = require("./auth")
var FacebookStrategy = require("passport-facebook").Strategy;

module.exports = function(passport,knex){
	passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: configAuth.facebookAuth.profileFields 
  },
  function(accessToken, refreshToken, profile, cb) {
  	process.nextTick(function () {
  		profile = profile._json
  		console.log("profile",profile.picture.data.url)
 			knex('user').where({facebookID:profile.id}).then(function(table){
 				if(table.length === 0){
 					knex('user').insert({
 						facebookID:profile.id,
 						firstName: profile.first_name,
 						lastName: profile.last_name,
 						email:profile.email,
 						gender:profile.gender,
 						photolink: profile.picture.data.url
 					})
 					.then(function (err,user) {
 							if(err){
 								return cb(null,err)
 								console.log('err',err)
 							}else{
 								console.log('Inserted',user)
 								return cb(null,user)
 							}
 					})
 				}else{
 					return cb(null,table)
 				}
 			})
  	})
  }
));
}


