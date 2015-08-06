var app = angular.module('payback');

app.service('debtService', function($http, $q) {

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
	    	newdescription: newDebt.newdescription,
	    	message: newDebt.message,
	    	status: newDebt.status
	    	
	  	}
	}).then(function(dataResponse) {
         
    })
        console.log(newDebt);
	}

	 this.getDebts = function(){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/debts'
        }).then(function(response) {
            console.log("Got Debts", response);
            deferred.resolve(response.data)
        });
        return deferred.promise;
    }

    this.updateDebt = function(debtDoc) {
	    return $http({
	      method: 'PUT',
	      url: 'http://localhost:1337/api/debts/' + debtDoc._id,
	      data: debtDoc
	    });
  	}


	 // this.removeDebt = function(debt) {
	 // 	$http({
	 // 		method 'DELETE',
	 // 		url: 'http://localhost:1337/payback/debts/:id',
	 // 	})
	 // }
}) //Close service.