angular.module('payback').service('dashboardService', function($http, $q) {
  this.getUser = function() {

    return $http({
      method: 'GET',
      url: 'http://localhost:1337/api/user/'
    })

  };
  this.getData = function() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/api/user/'+user_id
    }).then(function(users) {
      deferred.resolve(users.data);
    });
    return deferred.promise;
  }

});