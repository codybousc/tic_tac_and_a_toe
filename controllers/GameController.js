ticTacAndAToe = angular.module("ticTacAndAToe", [])

ticTacAndAToe.controller('GameController', ['$scope','$http',
function($scope, $http) {

  $scope.chosenSquare;
  $scope.playerMarker;
  $scope.computerMarker;
  $scope.openSpaces = [];
  $scope.allSquaresOccupied = false;
  $scope.winner = false;


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

  $scope.restartGame = function() {
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
  }

  $scope.squareAvailability = function(specificKey) {
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
    playerMarker = $scope.playerMarker;
    if($scope.squareAvailability(chosenSquare)) {
      $scope.board[chosenSquare] = playerMarker;
    }
    else {
      console.log("That's square's already taken, my friend");
    }
  }

// TODO right now, this is just iterating through the object and placing the marker in numberical order. not exactly random.
  $scope.randoComputerMove = function() {
    var computerMarker = $scope.computerMarker;
    var boardKeys = Object.keys($scope.board); //returns an array of $scope.board keys
    var counter = 0;
    for(var i = 0; i < boardLength; i++) {
      //if space is not occupied
      if($scope.squareAvailability(boardKeys[i])) {
        $scope.board[boardKeys[i]] = computerMarker;
        break
      }
      //if space is occupied
      else {
        while(!$scope.squareAvailability(boardKeys[i])) {
          i++;
          if($scope.squareAvailability(boardKeys[i])) {
            $scope.board[boardKeys[i]] = computerMarker;
            break
          }
        }
      }
      break
    }
  }

  //create separate funciton that checks for open spaces. use open spaces as a global variable
  $scope.checkForOpenSpaces = function() {
    console.log("making it to checkForOpenSpaces");
    var openSpaces = [];
      for(var key in $scope.board) {
        var value = $scope.board[key];
        console.log(value);
        if(value == " ") {
          openSpaces.push(value)
          console.log(openSpaces)
        }
      }//return true if no spaces available
        if(openSpaces.length == 0) {
          console.log("No open spaces left, browski!")
          $scope.allSquaresOccupied = true;
          prompt("It's a tie!");
          $scope.restartGame();
        }
  }


  $scope.checkForWinner = function() {
    //Check if winning lines are occupied && occupied by the same marker
    var boardLength = Object.keys($scope.board).length;
    var threeInARow = [["A1", "A2", "A3"], ["B1", "B2", "B3"], ["C1", "C2", "C3"], ["A1", "B1", "C1"], ["A2", "B2", "C2"], ["A3", "B3", "C3" ], ["A1", "B2", "C3"], ["C1", "B2", "A3"]];
    var counter = 0;
    var everyThirdInc = 0;
    var nopeCounter = 0;
    for(var i = 0; i < threeInARow.length; i++) {
      if($scope.board[threeInARow[everyThirdInc][counter]] == "X" && $scope.board[threeInARow[everyThirdInc][counter + 1]] == "X" && $scope.board[threeInARow[everyThirdInc][counter + 2]] == "X"
      || $scope.board[threeInARow[everyThirdInc][counter]] == "O" && $scope.board[threeInARow[everyThirdInc][counter + 1]] == "O" && $scope.board[threeInARow[everyThirdInc][counter + 2]] == "O") {
        $scope.winner = true;
            if($scope.board[threeInARow[everyThirdInc][counter]] == $scope.playerMarker) {
              prompt("Player is a weeeeiner!");
              $scope.restartGame();
              // break
            }
            else if ($scope.board[threeInARow[everyThirdInc][counter]] == $scope.computerMarker) {
              prompt("Computer Wins!");
              $scope.restartGame();
              // break
            }
        }
        //ERROR HERE: THIS IS NEVER GETTING CALLED
        //Tie (All Squares occupied and no winner)
        else if ($scope.allSquaresOccupied){
          // prompt("It's a tie!");
          // $scope.restartGame();
          break

        }
      else {
        // console.log("making it to nope counter")
        // console.log("NOPE COUNTER ", nopeCounter);
        everyThirdInc++;
        nopeCounter++;
      }
    }
  }


  // $scope.game = function() {
    $scope.choseMarker();
  //   // while(!$scope.winner) {
  //     $scope.playerPickSquare();
  //     checkForOpenSpaces();
  //     $scope.checkForWinner();
  //   // }
  // }
  //
  // $scope.game();


}]);
