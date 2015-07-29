var app = angular.module("payback");

app.controller("dashboardCtrl", function($scope, user, dashboardService) {
    console.log(2222, $scope.user)
    console.log(99999, user)
    $scope.getdata = function(get){
        dashboardService.getTheData(get).then(function(res) {
        	$scope.user = res; 
            console.log(res);
        })
    }
    

});