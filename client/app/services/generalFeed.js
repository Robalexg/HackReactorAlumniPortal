angular.module('reactorlounge.services', [])

.factory('generalFeed', ['$http', function ($http, $scope) {
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
    addMsg: function (Msg, Url) {
      return $http({
        method: 'POST',
        url: '/messages',
        data: {content: Msg, msgImageUrl: Url}
      })
    },
  //get request to get comments from /comments
    getCmt: function () {
      return $http({
        method: 'GET',
        url: '/comments'
      }).then(function(resp) {
        return resp.data
      })
    },
  //post request to add a comment to /comments
    addCmt: function(Cmt) {
        return $http({
          method: 'POST',
          url: '/comments',
          data: {content: Cmt}
      })
    },
  }
}]);


