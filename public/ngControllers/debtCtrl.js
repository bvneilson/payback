var app = angular.module('payback');

app.controller('debtCtrl', function($scope, debtService) {

	$scope.getDebtData = function() {
		debtservice.getDebts().then(function(response) {
			$scope.debts = response.data;
		})
	}

	$scope.createNewDebt = function(debt) {
		debtService.createDebt(debt).then(function() {
			$scope.getDebtData();
			console.log("Debt created.")
		})
	}

	$scope.removeDebt = function(debt) {
		debtService.removeDebt(debt).then(function() {
			$scope.getDebtData();
			console.log("Debt deleted.")
		})
	}
	

})