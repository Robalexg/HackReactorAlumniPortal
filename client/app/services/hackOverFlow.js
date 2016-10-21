angular.module('reactorlounge.overFlowService', [])

.factory('overFlow', ['$http', function ($http) {
  return {
  
    getQuestion: function () {
      return $http({
        method: 'GET',
        url: '/questions'
      }).then(function(resp) {
        return resp.data
      })
    } , 

 
     addQuestion: function (que) { 

     console.log("u r in addQuestion");
      return $http({
        method: 'POST',
        url:    '/questions', 
         data: {content:que}
      
      })
    },
  

  addlike: function (id,like) {
     console.log("u r in the Addddddd Like ","id",id , "incremented like",like);
      return $http({
        method: 'POST',
        url:    '/Answerlikes', 
         data: {content:id,like}
      
      })
    },


    getAnswer: function () {
      return $http({
        method: 'GET',
        url: '/Answers'
      }).then(function(resp) {
        return resp.data
      })
    } , 

     addAnswer: function (qid,answer) {
     console.log("u r in addAnswer in Severice", "qid",qid,"answer",answer);
      return $http({
        method: 'POST',
        url:    '/Answers', 
         data: {content:qid,answer}
      
      })
    }



}
}]);