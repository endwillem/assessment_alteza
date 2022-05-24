(function(){

  angular.module("routing-service", [])
    .factory("routingService", routingService);

    routingService.$inject = ["$http", "$log"];

    function routingService($http, $log){

      var pages = [
        {
          title: "home",
          link: "home"
        },
        {
          title: "overview",
          link: "overview"
        },
        {
          title: "payment",
          link: "payment"
        }
      ]

      return{
        pages: pages
      };


    };

}());
