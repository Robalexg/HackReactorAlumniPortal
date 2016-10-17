angular.module('reactorlounge.generalPage', [])

.controller('GeneralFeedController', ['$scope', 'generalFeed', function ($scope, generalFeed) {
  $scope.data = {}
  // $scope.data.msgs = [{userId: 'Christina', created_at: 'October 15', content: 'This is great'}, {name: 'Robert', date: 'October 15', message: 'Im a genius'}, {name: 'Kendrick', date: 'October 15', message: 'I frequent Youtuber'}, {name: 'Tulasi', date: 'October 15', message: 'Im awesome'}];

  //get messages from server
  var initialMsgs = function(){
    generalFeed.getMsg()
      .then(function(msg){
       $scope.data.msgs = msg;
       console.log("DATA",$scope.data.msgs)
       console.log('got msg', msg)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

//post messages on submit, clear out msg submit field & make a call to initialmsg to fetch msgs
  $scope.postMsg = function(){
        console.log('message has been posted');
    generalFeed.addMsg($scope.msg)
      .then(function(){
        $scope.msg=null;
        initialMsgs()
      })
      .catch(function (error) {
        console.error(error);
      });
  }

//gets messages when general is loaded
 initialMsgs();
}]);
