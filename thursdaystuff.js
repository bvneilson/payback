var dropdown = document.getElementById("selectDebt");
            console.log("dropdwon", dropdown)
            var options = $scope.debts;

            for(var i = 0; i < options.length; i++) {
                var opt = document.createElement('option');

                opt.innerHTML = options[i].newdescription;
                opt.value = options[i].newdescription;
                dropdown.appendChild(opt);
                console.log(opt)
            }