var app = angular.module("payback");

app.controller("dashboardCtrl", function($scope, user, dashboardService) {
    $scope.user = user;
    console.log(2222, $scope.user);
    $scope.getdata = function(get){
        dashboardService.getTheData(get).then(function(res) {
        	$scope.user = res;
            console.log(res);
        });
    };
    

});