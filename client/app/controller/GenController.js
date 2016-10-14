angular.module('reactorLounge.general', [])

.controller('GenController', function ($scope, General) {
  $scope.data = {}

  //get messages from server
  var initialMsgs = function(){
    General.getMsg()
      .then(function(msg){
       $scope.data.msgs = msg;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  $scope.msgs = {}
//post messages on submit
  $scope.postMsg = function(){
    General.addMsg($scope.msgs)
      .then(function(){
        console.log('message has been posted');
        initialMsgs()
      })
      .catch(function (error) {
        console.error(error);
      });
  }

//gets messages when general is loaded 
 initialMsgs();
});