var app = angular.module("payback");

app.controller("dashboardCtrl", function($scope, user, dashboardService) {
    $scope.user = user; 
    console.log(2222, $scope.user)
    $scope.getdata = function(get){
        dashboardService.getTheData(get).then(function(res) {
            console.log(res);
        })
    }
    $scope.getCurrentUser = function(get){
        dashboardService.getCurrentUser(get).then(function(res) {
            console.log(res);
        })
    }
    

});