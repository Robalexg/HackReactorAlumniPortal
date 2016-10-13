angular.module('reactorLounge.general', [])

.controller('GenController', function ($scope, General) {
  $scope.data = {}

  //get messages from server
  $scope.initialMsgs = function(){
    General.getMsg()
      .then(function(msg){
       $scope.data.msgs = msg;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

//post messages on submit
  $scope.postMesg = function(){
    General.addMsg()
      .then(function(){
        console.log('message has been posted')
      })
      .catch(function (error) {
        console.error(error);
      });
  }

//gets messages when general is loaded 
  $scope.initialMsgs();
});