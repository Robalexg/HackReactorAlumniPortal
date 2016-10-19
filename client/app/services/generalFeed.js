angular.module('reactorlounge.services', [])

.factory('generalFeed', ['$http', function ($http) {
  return {
  //get request to fetch all messages from /messages
    getMsg: function () {
      return $http({
        method: 'GET',
        url: '/messages'
      }).then(function(resp) {
        return resp.data
      })
    },


// To  Update Likes Post Request 

  addlike: function (id,like) {
     console.log("u r in the Addddddd Like ","id",id , "incremented like",like);
      return $http({
        method: 'POST',
        url:    '/likes', 
         data: {content:id,like}
      
      })
    },
 //post request to add a message to /messages
    addMsg: function (Msg) {
      return $http({
        method: 'POST',
        url: '/messages',
        data: {content: Msg}
      })
    }
  }


}]);


