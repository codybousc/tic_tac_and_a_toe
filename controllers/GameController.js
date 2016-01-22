ticTacAndAToe = angular.module("ticTacAndAToe", [])

ticTacAndAToe.controller('GameController', ['$scope','$http',
function($scope, $http) {

  $scope.chosenSquare;
  $scope.playerMarker;
  $scope.computerMarker;

  $scope.board = {
    "A1": " ",
    "A2": " ",
    "A3": " ",
    "B1": " ",
    "B2": " ",
    "B3": " ",
    "C1": " ",
    "C2": " ",
    "C3": " "
  }

  var boardLength = Object.keys($scope.board).length;

  $scope.player = {
    "name": " ",
    "playerMarker": " "
  }

  $scope.computer = {
    "name": "R2D2",
    "computerMarker": " "
  }

  $scope.choseMarker = function() {
    $scope.playerMarker = prompt("Chose your marker, X or O");
    if($scope.playerMarker == "X") {
      $scope.computerMarker = "O";
    }
    else {
      $scope.computerMarker = "X";
    }
    console.log("Player's marker = ", $scope.playerMarker);
    console.log("Computer's marker = ", $scope.computerMarker)
  }

  $scope.playersChoice = function() {
    $scope.$chosenSquare = prompt("Enter an available square, bro");
    $scope.playerPickSquare($scope.$chosenSquare, $scope.playerMarker)

  }

  $scope.squareAvailability = function(specificKey) {
    console.log("ARGS LEngth ", arguments.length);
    //Check Square Availability for Player Move (argument provided)
    if(arguments.length > 0) {
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
    //Check Square Availability for Computer Move (no argument provided)
    else {
      for(var key in $scope.board) {
        if($scope.board[specificKey] == " ") {
          return true;
        }
        else {
          return false;
        }
      }
    }
  }

  function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

  $scope.playerPickSquare = function(chosenSquare, playerMarker) {
    if($scope.squareAvailability(chosenSquare)) {
      $scope.board[chosenSquare] = playerMarker;
      console.log("pickSquare ", $scope.board);
    }
    else {
      console.log("That's square's already taken, my friend");
    }
  }

// TODO right now, this is just iterating through the object and placing the marker in numberical order. not exactly random. also doesn't choose if site is already taken
  $scope.randoComputerMove = function() {
    var computerMarker = $scope.computerMarker;
    var boardKeys = Object.keys($scope.board); //returns an array of $scope.board keys
    var counter = 0;
    for(var i = 0; i < boardLength; i++) {
      //if space is not occupied
      if($scope.squareAvailability(boardKeys[i])) {
        console.log("PASSING FIRST CONDITIONAL");
        // console.log("KEY = ", boardKeys[i]);
        $scope.board[boardKeys[i]] = computerMarker;
        // console.log($scope.squareAvailability(key), $scope.board[key]);
        // counter+=1
        // console.log(counter);
        console.log("randoComputerMove ", $scope.board)
        break
      }
      //if space is occupied
      else {
        while(!$scope.squareAvailability(boardKeys[i])) {
          i++;
          console.log("I is = to ", i)
          if($scope.squareAvailability(boardKeys[i])) {
            console.log("PASSING SECOND CONDITIONAL");
            console.log(boardKeys[i], "= ", computerMarker);
            $scope.board[boardKeys[i]] = computerMarker;
            console.log("randoComputerMove ", $scope.board);
            break
          }
        }
      }
      break
    }
  }

  $scope.checkForWinner = function() {
    //Check if winning lines are occupied && occupied by the same marker
    var boardLength = Object.keys($scope.board).length;
    var threeInARow = [["A1", "A2", "A3"], ["B1", "B2", "B3"], ["C1", "C2", "C3"], ["A1", "B1", "C1"], ["A2", "B2", "B3"], ["C1", "C2", "C3" ], ["A1", "B2", "C3"], ["C1", "B2", "A3"]];
    var counter = 0;
    var everyThirdInc = 0;
    var nopeCounter = 0;
    for(var i = 0; i < threeInARow.length; i++) {
      // console.log("everyThirdInc = ", everyThirdInc);
      // console.log("COUNTER = ", counter);
      // console.log("SOME SHIZ ", threeInARow[everyThirdInc][counter])
      if($scope.board[threeInARow[everyThirdInc][counter]] == "X" && $scope.board[threeInARow[everyThirdInc][counter + 1]] == "X" && $scope.board[threeInARow[everyThirdInc][counter + 2]] == "X"
      || $scope.board[threeInARow[everyThirdInc][counter]] == "O" && $scope.board[threeInARow[everyThirdInc][counter + 1]] == "O" && $scope.board[threeInARow[everyThirdInc][counter + 2]] == "O") {
          console.log("We've got ourselves a weiner!");
          break
        }
      else {
        console.log("NOPE COUNTER ", nopeCounter);
        everyThirdInc++;
        nopeCounter++;
      }
    }
  }
  $scope.choseMarker();
  $scope.playersChoice();
  $scope.randoComputerMove();

  $scope.playersChoice();
  $scope.randoComputerMove();

  $scope.playersChoice();
  $scope.checkForWinner();
  $scope.randoComputerMove();
  $scope.checkForWinner();

  $scope.playersChoice();
  $scope.checkForWinner();
  $scope.randoComputerMove();
  $scope.checkForWinner();



}]);
