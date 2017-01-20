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

      $scope.modif_description = $scope.infos.description;
      $scope.modif_name = $scope.infos.name;
      $scope.modif_address = $scope.infos.address;
      $scope.modif_codePostal = $scope.infos.codePostal;
      $scope.modif_city = $scope.infos.city;
      $scope.modif_country = $scope.infos.country;
      $scope.modif_surname = $scope.infos.surname;
    });


    this.modifierAssociation = function() {
      console.log('icici');
      let infos = {
        description: $scope.modif_description,
        name: $scope.modif_name,
        address: $scope.modif_address,
        codePostal: $scope.modif_codePostal,
        city: $scope.modif_city,
        country: $scope.modif_country,
        surname: $scope.modif_surname

      }
      charityService.putAssociationInfo(infos).then(function() {
        // Ici on va recharger les informations de l'association
        charityService.getOneAssociation().then(function(response){
          $scope.infos = response.data;
        });
      })
    }

  });

  app.controller('calendrierController',function(charityService, $scope, $templateCache, $route){

    // Méthode qui renvoit true ou false si on a un événement pour le mois spécifier
    // Elle est placé dans un ng-class qui dit que si on a true, on ajoute la classe CSS ".in"
    // au div collapse pour qu'il soit ouvert quand on a un événement
    $scope.siUnEvenementPourCeMois = function(mois) {
      // Tableau avec tous les mois
      let tousLesMois = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

      // On définie une variable qui va s'incrementer si on trouve des événements
      // Qui on lieu le mois passé en parametre


      // On parcours les events
      for(var i=0;i<$scope.events.length;i++) {
        // On créé un objet date JS avec la date de l'événement
        let dateCurrentEvent = new Date($scope.events[i].date*1000);
        // getMonth retourne l'index du mois; 0 pour janvier, 1 pour février.
        // On le passant sur le tableau des mois on a donc le bon mois.
        // La condition regarde si le mois de l'événements est de la même valeur
        // que le mois passé en parametre
        if(tousLesMois[dateCurrentEvent.getMonth()] == mois) {
          return true;
        }
      }
      return false;
    }


    // Méthode de placement des événements en fonction de leurs mois
    $scope.siLeMoisDeLevenementEstLeMemeQueLeDIV = function(event, mois) {
      // Tableau avec tous les mois
      var tousLesMois = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

      // Ici je récupère la date au format timestamp que j'injecte dans un nouvel objet Date.
      let eventDate = new Date(event.date*1000);

      // On sait que getMonth renvoit le numero du mois, 0 pour janvier, 1 pour février, etc.
      // En haut on a un tableau avec tous les mois. Ici on regarde si dans le tableau avec l'index
      // du mois que renvoi getMonth, on récupère Janvier par exemple et on le compare avec mois
      // qui est le second parametre de la méthode, sa valeur est définie dans le html
      if(tousLesMois[eventDate.getMonth()] == mois) {
        return true
      }
      else {
        return false;
      }
      // On renvoi true ou false pour dire a angular d'afficher (puisque la fonction est dans
      // un ng-show) les événements avec le bon mois dans le bon div
    }


    // Date PICKER
    $scope.dateTimestamp = "";
    $.datetimepicker.setLocale('fr');
    $('#datetimepicker').datetimepicker({
      format:'d/m/Y H:i:s',
      onChangeDateTime:function(dp,$input){
        if(dp != null) {
          $scope.dateTimestamp = dp.getTime()/1000;
          $('input#datepickertimestamp').val(dp.getTime()/1000);
        }
      }
    });
    // END Date PICKER


    $scope.calendarEvent = function() {

      charityService.postOneEvent({
        name: $scope.name,
        description: $scope.description,
        place: $scope.place,
        date: $scope.dateTimestamp
      }).then((response) => {

        $('body').removeClass('modal-open'); // On supprime la class que la modal a mise sur le body
        $('#closePopUp').trigger('click'); // On va chercher le bouton "Annuler" de la popup et on
        // Déclenche son click, la popup se ferme

        // Le traditionnel window.location.href ne semble pas fonctionner si on redirige vers la
        // même page avec angular. Ducoup on recharge la route de cette manière.
        var currentPageTemplate = $route.current.templateUrl;
        $templateCache.remove(currentPageTemplate);
        $route.reload();

      });
    }

    $scope.events = [];
    charityService.getAllEvent().then(function(response) {
        console.log(response.data);
        $scope.events = response.data;
    });

    $scope.selectedEvent = null;
    this.clickOnEvent = function(evenement) {
      $scope.selectedEvent = evenement;
    }

    // Méthode pour supprimer un event
    this.deleteEvent = function(evenement){
      charityService.deleteOneEvent(evenement._id).then(function(response){
        // Le traditionnel window.location.href ne semble pas fonctionner si on redirige vers la
        // même page avec angular. Ducoup on recharge la route de cette manière.
        var currentPageTemplate = $route.current.templateUrl;
        $templateCache.remove(currentPageTemplate);
        $route.reload();
      })
    }

  });

  app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/', {
      templateUrl:'partials/home/home_association.html',
      controller: "homeController",
      controllerAs: "homeCtrl"
    })
    .when('/calendrier', {
      templateUrl:'calendar.html',
      controller:'calendrierController',
      controllerAs:'calendrierCtrl'
    })
  }]);


  app.factory('charityService', function($http) {
      return {
          getOneAssociation: getOneAssociation,
          putAssociationInfo: putAssociationInfo,
          getAllEvent: getAllEvent,
          getOnePost: getOnePost,
          postOneEvent: postOneEvent,
          deleteOneEvent: deleteOneEvent
      };

      function  getOneAssociation() {
          return $http.get('/api/association').then(complete).catch(failed);
      }

      function postOneEvent(evenement) {
           return $http.post('/api/event', evenement).then(complete).catch(failed);
       }

        function getAllEvent() {
            return $http.get('/api/event').then(complete).catch(failed);
       }

        function getOnePost(eventid) {
          return $http.get('/api/event/' + eventid).then(complete).catch(failed);
       }

        function deleteOneEvent(eventid){
          return $http.delete('api/event/' + eventid).then(complete).catch(failed);
       }

      function putAssociationInfo(infos) {
        return $http.put('api/association', infos).then(complete).catch(failed);
       }

      function complete(response) {
          return response;
      }

      function failed(error) {
          console.log(error.statusText);
      }
    });
})();
