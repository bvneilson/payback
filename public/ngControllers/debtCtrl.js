var app = angular.module('payback');

app.controller('debtCtrl', function($scope, $location, debtService) {

	$scope.createNewDebt = function() {
		var newDebt = {
			email: $scope.email,
			fullname: $scope.fullname,
			amount: $scope.amount,
			cellPhone: $scope.phone,
			newdescription: $scope.newdescription
		};
		console.log('newDebt', newDebt)
		debtService.createDebt(newDebt).then(function(res) {
			console.log('success', 'Ok!', 'You wager is under way');
            Materialize.toast("Debt Created!", 2500, 'toast-success');
		}).then(function() {
			$location.path('/dashboard');
		})
		.catch(function(err){
            console.log(err);
            console.log('warning', 'Opps!', 'Could not create Debt');
            Materialize.toast("Opps!, You're debt was not created", 2500, 'toast-warning');
        });
	};
	
	// $scope.removeDebt = function(debt) {
	// 	debtService.removeDebt(debt).then(function() {
	// 		$scope.getDebtData();
	// 		console.log("Debt deleted.")
	// 	})
	// }
	

});