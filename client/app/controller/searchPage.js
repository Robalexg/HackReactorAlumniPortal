angular.module('reactorlounge.searchPage', [])
	.controller('SearchController', function($scope, $location, $http,$window){
		
		$http.get("/users",function () {
		}).then(function (resp) {
			console.log(resp.data)
			$scope.users = resp.data
		})


	})
