angular.module('reactorlounge.generalPage', ['angularMoment'])

.controller('GeneralFeedController', ['$scope', 'generalFeed', 'moment', function ($scope, generalFeed, moment) {
  $scope.data = {}
  // $scope.data.msgs = [{userId: 'Christina', created_at: 'October 15', content: 'This is great'}, {name: 'Robert', date: 'October 15', message: 'Im a genius'}, {name: 'Kendrick', date: 'October 15', message: 'I frequent Youtuber'}, {name: 'Tulasi', date: 'October 15', message: 'Im awesome'}];
  $scope.exampleDate = moment().hour(8).minute(0).second(0).toDate();
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
    generalFeed.addMsg($scope.msg)
      .then(function(){
        $scope.msg=null;
        initialMsgs()
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  var initialCmts = function(){
    generalFeed.getCmt()
    .then(function(cmt){
      $scope.data.cmts = cmt;
      console.log("comments", $scope.data.cmts);
    })
    .catch(function(err){
      console.log('this is a comment error', err);
    });
  }

  $scope.postCmt = function(){
    console.log('these are thecomments', $scope.cmt)
    generalFeed.addCmt($scope.cmt)
    .then(function(){
      $scope.comment=null;
      initialCmts()
    })
    .catch(function(err){
      console.log('this is a post comment error', err);
    })
  }


//gets messages and comments when general is loaded
 initialMsgs();
 initialCmts();
}]);
