angular.module('reactorlounge.generalPage', [])

.controller('GeneralFeedController', ['$scope', 'generalFeed', function ($scope, generalFeed) {

var messages = [
	{messageId:1, like:0, users:["Robert", "christina", "Kendrick"]},
	{messageId:2, like:0, users:["Robert"]},
	{messageId:3, like:0, users:["Robert","christina"]},
	{messageId:4, like:0, users:["Robert", "christina", "Tulasi"]},
	{messageId:5, like:0, users:["Robert", "Tulasi"]}
]



$scope.like = function (messageId){ 
	
	messages.forEach(function(message){ 
         
		if (message.messageId === messageId){
	


         $scope.likes=message.like++; 
         $scope.users= message.users;
		   } 

	})
}



}]);
