(function(){
  var app = angular.module('myApp', ['ngRoute']);

  app.directive('header',function(){
    return {
      restrict:'A',
      templateUrl:'partials/common/header2.html'
    }
  });

  app.controller('homeController', function(charityService, $scope) {
    $scope.infos = {};
    charityService.getOneAssociation().then(function(response){
      $scope.infos = response.data;
    });

  });

  app.controller('calendrierController',function(){

  });

  app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
      templateUrl:'partials/home/home_association.html',
      controller: "homeController",
      controllerAs: "homeCtrl"
    })
    .when('/calendrier',{
      templateUrl:'calendar.html',
      controller:'calendrierController',
      controllerAs:'calendrierCtrl'
    })
  }]);

  app.controller('mainController', function() {

  });

  app.factory('charityService', function($http) {
      return {
          getOneAssociation: getOneAssociation,
      };

      function  getOneAssociation() {
          return $http.get('/api/association').then(complete).catch(failed);
      }

      function complete(response) {
          return response;
      }

      function failed(error) {
          console.log(error.statusText);
      }
    });
})();
