angular.module('reactorlounge.generalPage', [])

.controller('GeneralFeedController', ['$scope', 'generalFeed', function ($scope, generalFeed) {

  $scope.data = {}

    

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
        console.log('message has been posted', $scope.msg);
    generalFeed.addMsg($scope.msg) 
      .then(function(){
        $scope.msg=null;
        initialMsgs()
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  $scope.addLike = function(status, id, likes){ 
      if (status){
          likes++; 
          $scope.data.msgs.forEach(function(message){
      if (message.id === id){
          message.likes++;
          angular.element('#'+ message.id).addClass('blue-text'); 
          }
          })     
         }

   else {
         likes--; 
        $scope.data.msgs.forEach(function(message){
    if (message.id === id){
        message.likes--;
        angular.element('#'+ message.id).removeClass('blue-text');
        }
       })  
     }
      generalFeed.addlike(id, likes)
         .then(function(){
           console.log("successs in add like");
             })
          .catch(function (error) {
          console.error(error);
         });
        }



//gets messages when general is loaded
 initialMsgs();

}]);
