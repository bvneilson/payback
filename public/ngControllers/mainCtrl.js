var app = angular.module("payback");

app.controller("mainCtrl", function($scope, mainService, $location) {


    
    //register

    $scope.submit = function(email, password) {
        console.log("submit function ran")
        var newUser = {
        // full_name: $scope.full_name, 
        email: $scope.email,
        password: $scope.reg_password
    };
        console.log('newUser', newUser)
        mainService.signup(email, password).then(function(res){
            console.log('success', 'Ok!', 'You are now registered');
            Materialize.toast("Account Created!", 2500, 'toast-success');
                $('#modal1').closeModal();
                $location.path("/dashboard/");
             
              // $scope.full_name = '';
              $scope.email = '';
              $scope.reg_password = '';
              $scope.password_confirm = '';
        })
        .catch(function(err){
            console.log(err);
            console.log('warning', 'Opps!', 'Could not register');
            $('#modal1').closeModal();
            Materialize.toast("Opps!, You were not registered", 2500, 'toast-warning');
        });

    };


    // Login


        $scope.submitLogIn = function(email, password) {
        mainService.login(email, password).then(function(login) {
            console.log('success', 'Ok!', 'You are now loged in');
            Materialize.toast("You are now loged in!", 2500, 'toast-success');
                $('#modal2').closeModal();
                $scope.email = '';
                $scope.password = '';
        }).catch(function(err) {
            $scope.error = err.message;
            console.log('warning', 'Opps!', 'Could not login');
            Materialize.toast("Incorrect Username/Password!", 2500, 'toast-warning');
            $scope.password = '';
            
        });
    };

})