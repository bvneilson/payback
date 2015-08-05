var app = angular.module('payback', ['ngRoute', 'ngGrid']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'view/main.html',
      controller: 'mainCtrl',
      resolve: {
        user: function(dashboardService){
          return dashboardService.getUser().then(function(response){ 
            return response;
          });
        }
      }
    })
    .when('/dashboard', {
      templateUrl: 'view/dashboard.html',
      controller: 'dashboardCtrl',
      resolve: {
        user: function(dashboardService){
          return dashboardService.getUser().then(function(response){ 
            return response;
          });
        }
      }
    })
    .when('/logout', {
        templateUrl: '/logout'
    })
    .when('/newdebt', {
        templateUrl: 'view/newDebt.html',
        controller: 'debtCtrl'
    })
    .when('/about', {
      templateUrl: 'view/about.html'
    })
    .when('/email', {
      templateUrl: 'view/newemail.html'
    })
    .when('/text', {
      templateUrl: 'view/text.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});