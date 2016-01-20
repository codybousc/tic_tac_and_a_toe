ticTacAndAToe = angular.module("ticTacAndAToe", [])

ticTacAndAToe.controller('GameController', ['$scope','$http',
function($scope, $http) {

  $scope.board = {
    "A1": "X",
    "A2": " ",
    "A3": " ",
    "B1": " ",
    "B2": " ",
    "B3": " ",
    "C1": " ",
    "C2": " ",
    "C3": " "
  }

  $scope.player = {
    "name": " ",
    "Marker": " "
  }

  $scope.computer = {
    "name": "R2D2",
    "marker": " "
  }

  $scope.squareAvailability = function(specificKey) {
    var boardLength = Object.keys($scope.board).length;
    var boardKeys = Object.keys($scope.board);
    for(var key in $scope.board) {
      if($scope.board[specificKey] == " ") {
        return true;
      }
      else {
        return false;
      }
    }
  }

  $scope.squareAvailability("A1");

  $scope.pickSquare = function() {

  }
}]);
