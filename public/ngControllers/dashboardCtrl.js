var app = angular.module("payback");

app.controller("dashboardCtrl", function($scope, user, dashboardService, debtService) {

    

    function setDebtBtns(debtDoc) {
        if (debtDoc.status === "Closed"){
            $scope.debtDiscountAmount = false;
            $scope.debtInterestAmount = false;
            $scope.debtDisplay = false;
            $scope.debtDiscountSet = false;
            $scope.debtInterestSet = false;
        };

        if (debtDoc.status === "Open" && debtDoc.interest === false && debtDoc.discount === true){
            $scope.debtDisplay = true;
            $scope.debtDiscountAmount = true;
            $scope.debtInterestAmount = false;
            $scope.debtDiscount = false;
            $scope.debtDiscountSet = true;
            $scope.debtInterestSet = false;
        };

        if (debtDoc.status === "Open" && debtDoc.interest === true && debtDoc.discount === false){
            $scope.debtDisplay = true;
            $scope.debtDiscountAmount = false;
            $scope.debtInterestAmount = true;
            $scope.debtDiscountSet = false;
            $scope.debtInterestSet = true;
            $scope.debtInterest = false;
        };

        if (debtDoc.status === "Open" && debtDoc.interest === false && debtDoc.discount === false){
            $scope.debtDiscountAmount = false;
            $scope.debtInterestAmount = false;
            $scope.debtDiscountSet = true;
            $scope.debtDiscount = true;
            $scope.debtInterestSet = true;
            $scope.debtInterest = true;
            $scope.debtDisplay = true;
        };
    };
 
//changed 8/4 7:00
    $scope.user = user.data; 
    $scope.getdata = function(get){
        dashboardService.getTheData(get)
    };

    $scope.getCurrentUser = function(get){
        dashboardService.getCurrentUser(get)
    };

    $scope.closeDebt = function(debtDoc) {
        debtDoc.status = "Closed";
        debtService.updateDebt(debtDoc).then(function() {
            setDebtBtns(debtDoc);
        });
    };

    $scope.reopenDebt = function(debtDoc) {
        debtDoc.status = "Open";
        debtService.updateDebt(debtDoc).then(function() {
            setDebtBtns(debtDoc);
        });
    };

    $scope.applyDiscount = function(debtDoc) {
        debtDoc.discount = true;
        debtDoc.discountedAmount = (debtDoc.amount * .9);
        debtDoc.discountedAmount = debtDoc.discountedAmount.toFixed(2);
        debtService.updateDebt(debtDoc).then(function() {
            setDebtBtns(debtDoc);
        });
    };

    $scope.removeDiscount = function(debtDoc) {
        debtDoc.discount = false;
        debtDoc.discountedAmount = debtDoc.amount;
        debtService.updateDebt(debtDoc).then(function() {
            setDebtBtns(debtDoc);
        });
    };

    $scope.applyInterest = function(debtDoc) {
        debtDoc.interest = true;
        debtDoc.increasedAmount = (debtDoc.amount * 1.05);
        debtDoc.increasedAmount = debtDoc.increasedAmount.toFixed(2);
        debtService.updateDebt(debtDoc).then(function() {
            setDebtBtns(debtDoc);
        });
    };

    $scope.removeInterest = function(debtDoc) {
        debtDoc.interest = false;
        debtDoc.increasedAmount = debtDoc.amount;
        debtService.updateDebt(debtDoc).then(function() {
            setDebtBtns(debtDoc);
        });
    };

    //added 8/4 7:00
    $scope.updateUser = function(user) {
        console.log("new user",user)
        dashboardService.updateUser(user);
    };

    $scope.getDebts = function() {
        debtService.getDebts().then(function(data) {
            var debtArray = [];
            var debtTotal = 0;
            console.log("user", user)
            console.log("scope.user", $scope.user)
            for (var i = 0; i < data.length; i++){
                if (user.data._id === data[i].userId  && user.data._id ){
                    phoneNo = data[i].cellPhone;
                    data[i].amount = data[i].amount.toFixed(2);
                    data[i].discountedAmount = data[i].discountedAmount.toFixed(2);
                    data[i].increasedAmount = data[i].increasedAmount.toFixed(2);
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
            $scope.debtDoc = $scope.selected[0];

            if ($scope.debtDoc){
              setDebtBtns($scope.debtDoc);
              $('#modal4').openModal();
            };
        },
        height: '200px',
        sortInfo: {fields: ['Name', 'Amount', 'Description', 'Status'], directions: ['asc']},
        columnDefs: [
            {field: 'fullname', displayName: 'Name'},
            {field: 'amount', displayName: 'Amount'},
            {field: 'newdescription', displayName: 'Description'},
            {field: 'message', displayName: 'Message'},
            {field: 'status', displayName: 'Status'}
        ]
    };
});