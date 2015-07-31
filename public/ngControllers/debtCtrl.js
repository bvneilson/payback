var app = angular.module('payback');

app.controller('debtCtrl', function($scope, $location, debtService) {

	// $scope.getDebtData = function() {
	// 	debtservice.getDebts().then(function(response) {
	// 		$scope.debts = response.data;
	// 	})
	// }

	$scope.createNewDebt = function() {
		var newDebt = {
			email: $scope.email,
			fullname: $scope.fullname,
			amount: $scope.amount,
			cellPhone: $scope.phone,
			newdescription: $scope.newdescription
		};
		console.log('newDebt', newDebt)
		console.log("scope user", $scope.user.$$state.value.data)
		debtService.createDebt(newDebt).then(function(res) {
			var currUserId = $scope.user.$$state.value.data.debtId;
			
			console.log('success', 'Ok!', 'You wager is under way');
            Materialize.toast("Wager Created!", 2500, 'toast-success');
		}).then(function() {
			$location.path('/dashboard');
		})
		.catch(function(err){
            console.log(err);
            console.log('warning', 'Opps!', 'Could not create wager');
            Materialize.toast("Opps!, You're wager was not created", 2500, 'toast-warning');
        });
	}

	// $scope.removeDebt = function(debt) {
	// 	debtService.removeDebt(debt).then(function() {
	// 		$scope.getDebtData();
	// 		console.log("Debt deleted.")
	// 	})
	// }
	

})