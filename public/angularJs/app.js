(function(){
  var app = angular.module('myApp',['ngRoute']);

  app.directive('header',function(){
    return{
      restrict: 'A',
      templateUrl: 'partials/common/header.html'
    }
  });





  // Controller pour créer un compte
  app.controller('registerController', function(charityService, $scope) {
    this.addUser = function() {
      var membreInformations = {
        name: $scope.name,
        email: $scope.email,
        password: $scope.password
      };

      console.log(membreInformations);
      charityService.memberAdd(membreInformations).then(function(response) {
        window.location.href = "dashboard";
      });
    }
    this.addAssociation = function() {
      console.log('ici');
        charityService.postAddOne({
            name: $scope.name,
            surname: $scope.surname,
            address: $scope.address,
            codePostal: $scope.codePostal,
            city: $scope.city,
            country: $scope.country,
            phone: $scope.phone,
            description: $scope.description,
            photo: $scope.photo,
            email: $scope.email2,
            password: $scope.password2
        }).then(function(response) {
            window.location.href = "dashboardassoc";
        });
    }
  });

  app.controller('loginController', function(charityService, $scope) {
    this.seConnecter = function() {
      var membreInformations = {
        email: $scope.email,
        password: $scope.password
      };
      charityService.connect(membreInformations).then(function(response) {
        console.log(response);
        if(response.data.isAssoc)
          window.location.href = "dashboardassoc";
        else
          window.location.href = "dashboard"
      });
    }
  });



  app.config(['$routeProvider',function($routeProvider){
    $routeProvider
      .when('/',{
        templateUrl:'partials/home/home.html'
      })
      .when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'registerController',
        controllerAs: 'registerCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginController',
        controllerAs: 'loginCtrl'
      })

  }]);

  app.factory('charityService', function($http) {
      return {
          getAllPosts: getAllPosts,
          getOnePost: getOnePost,
          postAddOne: postAddOne,
          deleteOne : deleteOne,
          putOne: putOne,
          memberAdd: memberAdd,
          connect : connect
      };

      function getAllPosts() {
          return $http.get('/api/association').then(complete).catch(failed);
      }

      function  getOnePost(associationId) {
          return $http.get('/api/association/'+associationId).then(complete).catch(failed);
      }

      function postAddOne(association) {
          return $http.post('/api/association', association).then(complete).catch(failed);
      }

      function deleteOne(association) {
        return $http.delete('/api/association', association).then(complete).catch(failed);
      }

      function putOne(associationId, association){
        return $http.put('/api/association/'+associationId, association).then(complete).catch(failed);
      }
      function memberAdd(memberInfo) {
        return $http.post('/api/member', memberInfo).then(complete).catch(failed);
      }
      function connect(memberInfo) {
        return $http.post('/api/login', memberInfo).then(complete).catch(failed);
      }

      function complete(response) {
          return response;
      }

      function failed(error) {
          console.log(error.statusText);
      }

  });

})();
