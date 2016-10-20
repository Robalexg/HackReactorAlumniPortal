angular.module('reactorlounge', [
  'ngRoute',
  'reactorlounge.services',
  'reactorlounge.profilePage',
  'reactorlounge.generalPage',
  'reactorlounge.loginPage',
  'reactorlounge.searchPage',
  'reactorlounge.hackOverFlow',
  'reactorlounge.overFlowService'
])
	.config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider){
	 $routeProvider
     .when('/', {
        templateUrl: '../app/views/loginPage.html',
        controller: 'LoginController'
      })
  	  .when('/profile', {
        templateUrl: '../app/views/profilePage.html',
        controller: 'ProfilePageController'
      })
      .when('/general', {
      templateUrl: '../app/views/general.html',
      controller: 'GeneralFeedController'
    }).when("/search",{
      templateUrl: "../app/views/searchPage.html",
      controller: "SearchController"
    })  
    .when('/overFlow', {
      templateUrl: '../app/views/HackOverFlow.html',
      controller: 'HackOverFlowController'
    })

      .when('/resources', {
      templateUrl: '../app/views/comingSoonPage.html',
    })
      .when('/events', {
      templateUrl: '../app/views/comingSoonPage.html',
    })
      .when('/lectures', {
      templateUrl: '../app/views/comingSoonPage.html',
    })
      .when('/jobs', {
      templateUrl: '../app/views/comingSoonPage.html',
    })
      .otherwise({
        redirectTo: '/'
      });
    // $httpProvider.interceptors.push('AttachTokens');
	}]).run(['$http','$window',function ($http,$window,$location) {
   $http({
      method: "GET",
      url: "/auth"
    }).then(function () {
      $window.location.href = '/#/search'
    }).catch(function () {
      $window.location.href = '/#/'
    })
  }]);

  /*TODO:
    - Build out token auhentication
  */

//   .factory('AttachTokens', function ($window) {
//   // this is an $httpInterceptor
//   // its job is to stop all out going request
//   // then look in local storage and find the user's token
//   // then add it to the header so the server can validate the request
//   var attach = {
//     request: function (object) {
//       var jwt = $window.localStorage.getItem('com.shortly');
//       if (jwt) {
//         object.headers['x-access-token'] = jwt;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return attach;
// })
// .run(function ($rootScope, $location, Auth) {
//   // here inside the run phase of angular, our services and controllers
//   // have just been registered and our app is ready
//   // however, we want to make sure the user is authorized
//   // we listen for when angular is trying to change routes
//   // when it does change routes, we then look for the token in localstorage
//   // and send that token to the server to see if it is a real user or hasn't expired
//   // if it's not valid, we then redirect back to signin/signup
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });

