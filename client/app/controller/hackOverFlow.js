angular.module('reactorlounge.hackOverFlow', [])

.controller('HackOverFlowController', ['$scope', 'overFlow', function ($scope, overFlow) {

  $scope.data = {}

     var getQuestions = function(){
     overFlow.getQuestion()
      .then(function(msg){
       $scope.data.msgs = msg;
       console.log('Values from Data Base', msg)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

   $scope.postAnswer = function(qid,answer){
        console.log('hey u r in the post answer', qid, answer);
     overFlow.addAnswer(qid,answer) 
      .then(function(){

       getAnswers();
        console.log("hellooo Sucesss");
      })
      .catch(function (error) {
        console.error(error);
      });
    
  }

  var getAnswers = function(){
     overFlow.getAnswer()
      .then(function(ans){
       $scope.data.answers = ans;
       console.log('Values from Data Base in the ansers', ans);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  $scope.postQue = function(){
        console.log('message has been posted', $scope.question);
    overFlow.addQuestion($scope.question) 
      .then(function(){
        $scope.question=null;
        getQuestions();
      })
      .catch(function (error) {
        console.error(error);
      });
  }


getQuestions(); 

getAnswers();

}]);