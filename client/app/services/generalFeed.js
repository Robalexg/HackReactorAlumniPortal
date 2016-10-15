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


