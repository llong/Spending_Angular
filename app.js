/*global Firebase*/
var spendingApp = angular.module("spendingApp", ["ui.router","firebase"]);

spendingApp.config(function($stateProvider, $urlRouterProvider) {



  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      controller: 'SpendingController'
    })

    .state('edit', {
      url: "/edit/:itemId",
      templateUrl: "partials/edit.html",
      controller: 'SpendingController'

    });
});


spendingApp.controller("SpendingController", function($scope, $firebase,$stateParams) {

  
  //Setup Firebase DB and make available to app
  var ref = new Firebase("https://llong-spending.firebaseio.com");
  var sync = $firebase(ref);
  $scope.posts = sync.$asArray();
  $scope.whichItem = $stateParams.itemId;
  console.log($stateParams);

  $scope.itemTitle = $scope.whichItem;
  
  // Add new Item to DB
  $scope.addPost = function() {
    $scope.posts.$add({
      name: $scope.itemName, 
      title: $scope.itemTitle, 
      details: $scope.itemDetails, 
      amount: parseFloat($scope.itemAmount),
      created_at:  Date()
    });
    // Clears values;
    $scope.itemName = "";
    $scope.itemAmount = "";
    $scope.itemTitle = "";
    $scope.itemDetails = "";
  }

  // Remove item from DB
  $scope.removePost = function() {
    confirm("Are you sure you want to remove this item?");
    $scope.posts.$remove(this.post);
  }

  // Calculate Total Amount Spent
  var LewisTotal = 3200;
  var XueminTotal = 3200;

  $scope.summed = function() {
            var count = 0;
            angular.forEach($scope.posts, function(val) {
                count += val;
            });
            return count;
      };



});