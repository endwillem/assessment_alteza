(function(angular){

  angular
    .module("overview-page-controller", ["routing-service"])
    .controller("overviewPageController", overviewPageController);

    overviewPageController.$inject = ["$scope", "$timeout"];

   function overviewPageController($scope, $timeout){
     
    init();

    function init(){
      var user = getUserData();
      user.then (function (result){  
        $scope.account = result;
      });
      
      var transactions = getTransactions();
      transactions.then (function (result){  
        $scope.transactions = result;
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

    function getTransactions(){
      //timeout 0 forces the next digest to render the promised data
      return $timeout(function () {
        return getTransactionsFromServer();
      }, 0)
    }

    const getTransactionsFromServer = async(accountId) => {
      const transactions = await fetch(`http://localhost:3000/accounts/62854f66fffc2933946e23cb/transactions`);
      return await transactions.json();
    };

  }
}(angular));
