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



  app.config(['$routeProvider',function($routeProvider){
    $routeProvider
      .when('/',{
        templateUrl:'partials/home/home.html'
      })
      .when('/association',{
        templateUrl:'partials/association.html'
      })
      .when('/profile',{
        templateUrl:'partials/profile.html'
      })
      .when('/form',{
        templateUrl:'partials/form.html'
      })
  }]);


})();
