ticTacAndAToe = angular.module("ticTacAndAToe", [])

ticTacAndAToe.controller('GameController', ['$scope','$http',
function($scope, $http) {

  $scope.board = {
    "A1": "X",
    "A2": "X",
    "A3": "X",
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
    "Marker": " "
  }

  $scope.computer = {
    "name": "R2D2",
    "marker": " "
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

  $scope.pickSquare = function(chosenSquare, marker) {
    if($scope.squareAvailability(chosenSquare)) {
      $scope.board[chosenSquare] = marker;
      console.log("pickSquare ", $scope.board);
    }
    else {
      console.log("That's square's already taken, my friend");
    }
  }

// TODO right now, this is just iterating through the object and placing the marker in numberical order. not exactly random. also doesn't choose if site is already taken
  $scope.randoComputerMove = function(marker) {
    var boardKeys = Object.keys($scope.board); //returns an array of $scope.board keys
    var counter = 0;
    for(var i = 0; i < boardLength; i++) {
      //if space is not occupied
      if($scope.squareAvailability(boardKeys[i])) {
        console.log("PASSING FIRST CONDITIONAL");
        // console.log("KEY = ", boardKeys[i]);
        $scope.board[boardKeys[i]] = marker;
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
            console.log(boardKeys[i], "= ", marker);
            $scope.board[boardKeys[i]] = marker;
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

      // counter++;
      // if(counter == 3) {
      //   counter = 0;
      //   everyThirdInc++;
      // }

    }
  }
  // $scope.pickSquare("C1", "X");
  // $scope.randoComputerMove("O");
  // $scope.checkForWinner();
  // $scope.pickSquare("C2", "X");
  $scope.randoComputerMove("O");
  $scope.checkForWinner();
  // $scope.pickSquare("C3", "X");
  // $scope.randoComputerMove("O");
  // $scope.checkForWinner();


}]);
