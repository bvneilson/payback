var app = angular.module("payback");

app.controller("dashboardCtrl", function($scope, user, dashboardService, debtService) {
    $scope.user = user; 
    console.log(2222, $scope.user);
    console.log(99999, user.data);
    $scope.getdata = function(get){
        dashboardService.getTheData(get).then(function(res) {
            console.log(res);
        });
    };
    $scope.getCurrentUser = function(get){
        dashboardService.getCurrentUser(get).then(function(res) {
            console.log(res);
        })
    }

    $scope.closeDetails = function(){
        $scope.showDebt = false;
    };

    $scope.getDebts = function() {
        debtService.getDebts().then(function(data) {
            console.log("debts", data);
            var debtArray = [];
            for (var i = 0; i < data.length; i++){
                if (user.data._id === data[i].userId){
                    debtArray.push(data[i])
                }
            }
            $scope.debts = debtArray;
            
        })
       // return $scope.debts
    };
    
    $scope.getDebts();

    $scope.selected = [];

    $scope.gridOptions = { 
        data: 'debts',
        enableColumnResize: true,
        selectedItems: $scope.selected,
        multiSelect: false,
        afterSelectionChange: function (row, event) {
            $scope.showDebt = false;
            $scope.debtSelected = $scope.selected[0];
            if ($scope.debtSelected){
              $scope.showDebt = true;
            };
        },
        height: '200px',
        sortInfo: {fields: ['Name', 'Amount', 'Description'], directions: ['asc']},
        columnDefs: [
            {field: 'fullname', displayName: 'Name'},
            {field: 'amount', displayName: 'Amount'},
            {field: 'newdescription', displayName: 'Description'}
        ]
    };
});