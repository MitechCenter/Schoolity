
var ShoolityApp = angular.module('ShoolityApp', []);

ShoolityApp.controller('ShoolityCtrl', function ($scope, $http) {
    
 
   $http.get("user/json/danhsach.json")
   .then(function (response) {
       var data;
       data = response.data;
       
       $scope.row = data.danhsach[0];

       //alert($scope.danhsach);
       
   });
      
});

       
