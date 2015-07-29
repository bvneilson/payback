var app = angular.module('payback');

app.service('debtService', function($http) {

	// this.getDebts = function() {
	//  	return $http({
	//  		method: 'GET',
	//  		url: 'https://localhost:1337/payback/debts',
	//  	})
	//  }

	this.createDebt = function(newDebt) {
	  	return $http({
	    method: 'POST',
	    url: '/api/debt/create',
	    data: {
	    	// date: Date.now(),
	    	email: newDebt.email,
	    	fullname: newDebt.fullname,
	    	amount: newDebt.amount,
	    	cellPhone: newDebt.cellPhone,
	    	newdescription: newDebt.newdescription
	    	
	  	}
	  }).then(function(dataResponse) {
            console.log('service', dataResponse);
        })
        console.log(newDebt);
	 }

	 // this.removeDebt = function(debt) {
	 // 	$http({
	 // 		method 'DELETE',
	 // 		url: 'http://localhost:1337/payback/debts/:id',
	 // 	})
	 // }
}) //Close service.