(function(){

  var app = angular
    .module("myApp", ["ngRoute",
                      "homepage-controller",
                      "overview-page-controller",
                      "payment-page-controller"
                      ]);

  app.config(function($routeProvider) {
      $routeProvider
      .when("/home", {
          templateUrl: "directives/homepage.tpl.html",
          controller: "homepageController"
      })
      .when("/overview", {
        templateUrl: "directives/overview-page.tpl.html",
        controller: "overviewPageController"
    })
    .when("/payment", {
      templateUrl: "directives/payment-page.tpl.html",
      controller: "paymentPageController"
  })
      .otherwise({redirectTo:"/home"})
  });

  app.controller('NavCtrl', 
  ['$scope', '$location', function ($scope, $location) {

    $scope.selectedPage = 'home';

    $scope.navigateToPage = function (page) {
      $location.url('/' + page);
      $scope.selectedPage = page;
    };

  }]);

}());
