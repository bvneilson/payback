var app = angular.module('payback');

app.service('mainService', function($http) {
    this.signup = function(email, password) {
        return $http({
            method: 'POST',
            url: '/api/user/signup',
            data: {
                // full_name: newUser.full_name,
                email: email, 
                password: password,
            }
        }).then(function(dataResponse) {
            console.log('service', dataResponse);
        })
        console.log(newUser);
    }

    this.login = function(email, password) {
        return $http({
            method: 'POST',
            url: '/api/user/login',
            data: {
                // full_name: user.full_name,
                email: email, 
                password: password,
            }
        }).then(function(dataResponse) {
            console.log('service', dataResponse);
        })
        console.log(newUser);
    }
})