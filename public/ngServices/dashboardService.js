angular.module('payback').service('dashboardService', function($http, $q) {
  
  this.getUser = function(user_id) {
    return $http({
      method: 'GET',
      url: 'http://localhost:1337/api/user/'
    })
  };

  this.getCurrentUser = function(){
    $http.get('/api/user')
      .success(function(user){
        console.log("curruser",user); 
      })
      .error(function(err){
        if(err) return err;
      })
  }

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
//added 8/4 7:00
  this.updateUser = function(user) {
    return $http({
      method: 'PUT',
      url: '/api/users/' + user._id,
      data: user
    });
  }

});