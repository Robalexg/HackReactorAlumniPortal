angular.module('reactorLounge.services', [])

.factory('General', function ($http) {
  
  //get request to fetch all messages from /messages
  var getMsg = function () {
    return $http({
      method: 'GET',
      url: '/messages'
    })
    .then(function (resp) {
      return resp;
    });
  };

 //post request to add a message to /messages 
  var addMsg = function (Msg) {
    return $http({
      method: 'POST',
      url: '/messages',
      data: Msg
    });
  };

  return {
    getMsg: getMsg,
    addMsg: addMsg
  };
  })