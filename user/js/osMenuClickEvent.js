ShoolityApp.controller('MenuCtrl', function ($scope, $http) {
    $scope.BredcumPath = ["", "", ""];
    // HOC SINH
    //// Ho so hoc sinh
    $(document).ready(function () {
        $('a[id*="lv1_MenuObj_"]').click(function () {
            $scope.BredcumPath[0] = $(this).text() + " > ";
            //            alert($(this).text());
        });
        $('a[id*="lv2_MenuObj_"]').click(function () {
            $scope.BredcumPath[1] = $(this).text() + " > ";
            //            alert($(this).text());
        });
        $('a[id*="lv3_MenuObj_"]').click(function () {
            $scope.BredcumPath[2] = $(this).text() + " > ";
        });
        // student click event
        $(function () {
            for (i = 11; i <= 26; i++) {
                if ((i >= 11 && i < 15) || (i >= 19 && i < 23))
                    $("#lv2_MenuObj_" + i.toString()).click(function () {
                        currentMenuSelectedID = this.id;
                        let getNum = this.id.replace(/lv2_MenuObj_/g, '');
                        $scope.$emit('CurrentActivity', {"path": $scope.BredcumPath[0] + $scope.BredcumPath[1],"id":Number(getNum) - 10});
                    });
                else if (!((i >= 11 && i < 15) || (i >= 19 && i < 23)))
                    $("#lv3_MenuObj_" + i.toString()).click(function () {
                        currentMenuSelectedID = this.id;
                        let getNum = this.id.replace(/lv3_MenuObj_/g, '');
                        $scope.$emit('CurrentActivity', {"path": $scope.BredcumPath[0] + $scope.BredcumPath[1] + $scope.BredcumPath[2],"id":Number(getNum) - 10});
                    });
            }
        }());
    });
});