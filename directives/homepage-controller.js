(function(angular){

  angular
    .module("homepage-controller", ["routing-service"])
    .controller("homepageController", homepageController);

    homepageController.$inject = ["$scope", "$http", "$timeout"];

   function homepageController($scope, $http, $timeout){

    $scope.patchUserData = patchUserData;
    init();

    function init(){
      var user = getUserData();
      user.then (function (result){  
        $scope.account = result;
      });
    }

    const getUserAccount = async() => {
      const accounts = await fetch('http://localhost:3000/accounts/62854f66fffc2933946e23cb');
      return await accounts.json();
    };

    function getUserData(){
      //timeout 0 forces the next digest to render the promised data
      return $timeout(function () {
        return getUserAccount();
      }, 0)
    }

    function patchUserData(user) {
      
      //did not find a satisfying way to validate email in the form.

      $http.patch("http://localhost:3000/accounts/62854f66fffc2933946e23cb", user).then(function (response) {
        //assignment did not specify what to do with the data after posting. just logging it to make sure the post worked.
        console.log(response);
      })
    }
  }
}(angular));
