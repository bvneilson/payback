var app = angular.module('payback');

app.controller('debtCtrl', function($scope, debtService) {

	$scope.createNewDebt = function(message){
		debtService.createDebt(message).then(function(res){
			$scope.
		})
	}

	

})