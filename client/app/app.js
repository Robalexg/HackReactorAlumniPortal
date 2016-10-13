angular.module('reactorLounge', [
	'reactorLounge.services',
	'reactorLounge.general',
	//add all additional modules here 
	'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/general', {
      templateUrl: 'app/views/general.html',
      controller: 'GenController'
    })
    //add routes and their controller and templateURL
})

//add .run if there is anything that needs to run once the module is configured 