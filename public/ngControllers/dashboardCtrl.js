var app = angular.module("payback");

app.controller("dashboardCtrl", function($scope, user, dashboardService, debtService) {
    
    function setResolveBtn(debtDoc){
        if (debtDoc.status === "Open"){
            $scope.debtDisplay = true;
        } else {
            $scope.debtDisplay = false;
        }
    }
//changed 8/4 7:00
    $scope.user = user.data; 
    $scope.getdata = function(get){
        dashboardService.getTheData(get)
    };

    $scope.getCurrentUser = function(get){
        dashboardService.getCurrentUser(get)
    };

    $scope.closeDetails = function(){
        $scope.showDebt = false;
    };

    $scope.closeDebt = function(debtDoc) {
        debtDoc.status = "Closed";
        debtService.updateDebt(debtDoc).then(function() {
            $scope.getDebts();
            setResolveBtn(debtDoc);
        });
    };

    $scope.reopenDebt = function(debtDoc) {
        debtDoc.status = "Open";
        debtService.updateDebt(debtDoc).then(function() {
            $scope.getDebts();
            setResolveBtn(debtDoc);
        });
    };

    //added 8/4 7:00
    $scope.updateUser = function(user) {
        dashboardService.updateUser(user);
    };

    $scope.getDebts = function() {
        debtService.getDebts().then(function(data) {
            var debtArray = [];
            var debtTotal = 0;
            for (var i = 0; i < data.length; i++){
                if (user.data._id === data[i].userId  && user.data._id ){
                    phoneNo = data[i].cellPhone;
                    data[i].amount = data[i].amount.toFixed(2);
                    data[i].cellPhone = phoneNo.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                    debtArray.push(data[i]);
                    if (data[i].status === "Open"){
                        debtTotal += parseInt(data[i].amount);
                    }
                
                }

            }
            $scope.debts = debtArray;
            $scope.debtTotal = debtTotal.toFixed(2);
            
        });
    };
    
    $scope.getDebts();

    $scope.selected = [];
    $scope.debtDoc = "";

    $scope.gridOptions = { 
        data: 'debts',
        rowTemplate:'<div style="height: 100%" ng-class="{closedRowColor: row.getProperty(\'status\') === \'Closed\'}"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                           '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"></div>' +
                           '<div ng-cell></div>' +
                     '</div></div>',
        enableColumnResize: true,
        selectedItems: $scope.selected,
        multiSelect: false,
        afterSelectionChange: function (row, event) {
            $scope.showDebt = false;
            $scope.debtDoc = $scope.selected[0];

            if ($scope.debtDoc){

              $scope.showDebt = true;

              if ($scope.selected[0].status === "Open"){
                $scope.debtDisplay = true;
              } else {
                $scope.debtDisplay = false;
              }

            }
            
        },
        height: '200px',
        sortInfo: {fields: ['Name', 'Amount', 'Description', 'Status'], directions: ['asc']},
        columnDefs: [
            {field: 'fullname', displayName: 'Name'},
            {field: 'amount', displayName: 'Amount'},
            {field: 'newdescription', displayName: 'Description'},
            {field: 'status', displayName: 'Status'}
        ]
    };
});