(function(){
  var app = angular.module('myApp',['ngRoute']);

  app.directive('header',function(){
    return{
      restrict: 'A',
      templateUrl: 'partials/common/header.html'
    }
  });

  app.directive('footer',function(){
    return{
      restrict: 'A',
      templateUrl: 'partials/common/footer.html'
    }
  });

  app.controller('association',function(charityService, $scope){
    $scope.associations = [];
    charityService.getAllPosts().then(function(response) {
        // console.log(response.data);
        $scope.associations = response.data;
    });

  });

  app.controller('profile',function(charityService, $scope, $routeParams) {
        var associationId = $routeParams.associationId;
        console.log("ici", associationId);
        $scope.profile = {};
        charityService.getOnePost(associationId).then(function(response) {
          console.log(response);
            $scope.profile = response.data;
            console.log($scope.profile);
        });

  });



  app.controller('form',function(charityService, $scope){
    this.contact = function() {
        charityService.postAddOne({
            name: $scope.name,
            username: $scope.username,
            address: $scope.address,
            codePostal: $scope.codePostal,
            city: $scope.city,
            country: $scope.country,
            phone: $scope.phone,
            description: $scope.description,
            photo: $scope.photo
        }).then(function(response) {
            window.location.href = "#/association"
        });
    }


  });


  app.config(['$routeProvider',function($routeProvider){
    $routeProvider
      .when('/',{
        templateUrl:'partials/home/home.html'
      })
      .when('/association',{
        templateUrl:'partials/association.html',
        controller: 'association',
        controllerAs: 'associationCtrl'
      })
      .when('/profile/:associationId',{
        templateUrl:'partials/profile.html',
        controller:'profile',
        controllerAs:'profileCtrl'
      })
      .when('/form',{
        templateUrl:'partials/form.html',
        controller:'form',
        controllerAs:'formCtrl'
      })

  }]);

  app.factory('charityService', function($http) {
      return {
          getAllPosts: getAllPosts,
          getOnePost: getOnePost,
          postAddOne: postAddOne,
          deleteOne : deleteOne,
          putOne: putOne
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

      function putOne(association){
        return $http.put('/api/association', association).then(complete).catch(failed);
      }

      function complete(response) {
          return response;
      }

      function failed(error) {
          console.log(error.statusText);
      }

  });

})();
