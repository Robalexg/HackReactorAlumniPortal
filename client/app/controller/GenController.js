angular.module('reactorLounge.gen', [])

.controller('GenController', function ($scope, General) {
  $scope.data = {}

  //get messages from server
  var initialMsgs = function(){
    General.getMsg()
      .then(function(msg){
       $scope.data.msg = msg;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

//post messages on submit
  var postMesg = function(){
    General.addMsg()
      .then(function(){

      })
      .catch(function (error) {
        console.error(error);
      });
  }

//gets messages when general is loaded 
  initialMsgs();
});