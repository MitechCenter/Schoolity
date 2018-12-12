
var ShoolityApp = angular.module('ShoolityApp', []);

ShoolityApp.controller('ShoolityCtrl', function ($scope, $http) {
    
    $http.get("user/json/header.json")
   .then(function (response) {
       var data;
       data = response.data;
      
       $scope.header = response.data;
       //alert($scope.danhsach[0].name);
      
   });

   $http.get("user/json/danhsach.json")
   .then(function (response) {
       var data;
       data = response.data;
       
       $scope.danhsach = response.data;

       alert($scope.danhsach);
       
   });
      
});



       
