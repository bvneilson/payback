var app = angular.module('payback');

app.service('debtService', function($http) {

	this.getDebts = function() {
	 	return $http({
	 		method: 'GET',
	 		url: 'https://localhost:1337/payback/debts',
	 	})
	 }

	this.createDebt = function(debt) {
	  	return $http({
	    method: 'POST',
	    url: 'http://localhost:1337/payback/debts',
	    data: {
	    	date: Date.now(),
	    	text: debt
	  	}
	  })
	 }

	 // this.removeDebt = function(debt) {
	 // 	$http({
	 // 		method 'DELETE',
	 // 		url: 'http://localhost:1337/payback/debts/:id',
	 // 	})
	 // }
}) //Close service.