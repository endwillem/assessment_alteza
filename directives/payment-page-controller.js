(function(angular){

  angular
    .module("payment-page-controller", ["routing-service"])
    .controller("paymentPageController", paymentPageController);

    paymentPageController.$inject = ["$scope", "$timeout"];

   function paymentPageController($scope, $timeout){
    
    $scope.doStuff = doPayment;

     init();

    function init(){
      var user = getUserData();
      user.then (function (result){  
        $scope.userAccount = result;
      });

      var allAccounts = getAllAccountsData();
      allAccounts.then (function (result){  
        $scope.allAccounts = result;
      });

    }
     
    const getUserAccount = async() => {
      const accounts = await fetch('http://localhost:3000/accounts/62854f66fffc2933946e23cb');
      return await accounts.json();
    };

    const getAllAccounts = async() => {
      const accounts = await fetch('http://localhost:3000/accounts');
      return await accounts.json();
    };

    function getUserData(){
      //timeout 0 forces the next digest to render the promised data
      return $timeout(function () {
        return getUserAccount();
      }, 0)
    }
    
    function getAllAccountsData(){
      //timeout 0 forces the next digest to render the promised data
      return $timeout(function () {
        return getAllAccounts();
      }, 0)
    }
    
  const makeTransaction = async (fromAccountId, toAccountNumber, amount) => {
    const createTransaction = await fetch(`http://localhost:3000/accounts/${fromAccountId}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: toAccountNumber,
        amount: amount
      })
    });
    return await createTransaction.json();
  };

  const doStuff = async (payment) => {

    // set the from as an id
    const from = $scope.userAccount._id;
    const transaction = await makeTransaction(from, payment.to, payment.amount);

  };

  function doPayment (payment) {
    //cannot call doStuff from the html
    doStuff(payment);  
  }

  }
}(angular));
