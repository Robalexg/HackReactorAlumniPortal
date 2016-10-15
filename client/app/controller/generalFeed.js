angular.module('reactorlounge.general', [])

.controller('GeneralFeedController', ['$scope', 'generalFeed', function ($scope, generalFeed) {
  $scope.data = {}

  //get messages from server
  var initialMsgs = function(){
    generalFeed.getMsg()
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
    generalFeed.addMsg($scope.msgs)
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
}]);
