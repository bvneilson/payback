var app = angular.module('payback', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'view/main.html',
      controller: 'mainCtrl',
      resolve: {
        user: function(dashboardService){
          return dashboardService.getUser().then(function(response){
            console.log(777777, response);  
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
            console.log(111111, response);  
            return response;
          });
        }
      }
    })
    .when('/logout', {
        templateUrl: '/logout'
    })
    .when('/newdebt', {
        templateUrl: 'newDebtTmpl.html',
        controller: 'debtCtrl'
    })
    // .when('/newgoal', {
    //   templateUrl: 'templates/newgoal.html',
    //   controller: 'newgoalCtrl'
    // })
    // .when('/about', {
    //   templateUrl: 'templates/about.html'
    // })
    // .when('/contact', {
    //   templateUrl: 'templates/contact.html'
    // })
    .otherwise({
      redirectTo: '/'
    })
});