var app = angular.module('payback');

app.service('debtService', function($http) {

	this.createDebt = function() {
	  	return $http({
	    method: 'POST',
	    url: 'http://localhost:1337/payback/debts',
	    data: {
	    	
	    }
	  })
	 }

})