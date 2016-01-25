ticTacAndAToe = angular.module("ticTacAndAToe", [])

ticTacAndAToe.controller('GameController', ['$scope','$http',
function($scope, $http) {

  $scope.chosenSquare;
  $scope.playerMarker;
  $scope.computerMarker;
  $scope.openSpaces = [];
  $scope.allSquaresOccupied = false;
  $scope.winner = false;
  var computerMoveCount = 0;
  var playerMoveCount = 0;
  $scope.defenseTargetSquare;
  $scope.attackTargetSquare;


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


    $scope.chosenSquare = undefined;
    $scope.openSpaces = [];
    $scope.allSquaresOccupied = false;
    $scope.winner = false;
    var computerMoveCount = 0;
    var playerMoveCount = 0;
    $scope.defenseTargetSquare = undefined;
    $scope.attackTargetSquare = undefined;

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

  $scope.playerPickSquare = function(chosenSquare, playerMarker) {
    playerMoveCount++;
    playerMarker = $scope.playerMarker;
    if($scope.squareAvailability(chosenSquare)) {
      $scope.board[chosenSquare] = playerMarker;
    }
    else {
      console.log("That's square's already taken, my friend");
    }
  }

  $scope.twoInaRow = function() {
    var twoInaRowArray = [["A1", "A2", "A3"], ["A2", "A3", "A1"], ["B1", "B2", "B3"], ["B2", "B3", "B1"], ["C1", "C2", "C3"], ["C2", "C3", "C1"],
                          ["A1", "B1", "C1"], ["B1", "C1", "A1"], ["A2", "B2", "C2"], ["B2", "C2", "A2"],["A3", "B3", "C3"], ["B3", "C3", "A3"], ["A1", "B2", "C3"],
                           ["B2", "C3", "A1"], ["C1", "B2", "A3"], ["A3", "B2", "C1"]];

    var enumerator = 0;
    var counter = 0;
    for(var i = 0; i < twoInaRowArray.length; i++) {
      //TODO Each Condition needs to check for two cases: If Player two in a row = update defenseTargetSquare && If Computer Two in a row = update attackTargetSquare
      console.log("Line 123 ", twoInaRowArray[enumerator][counter] + "= ",  $scope.board[twoInaRowArray[enumerator][counter]], "and ", twoInaRowArray[enumerator][counter + 1] + "= ",  $scope.board[twoInaRowArray[enumerator][counter + 1]]);
      console.log("enumerator = ", enumerator + " and counter = ", counter);
      console.log("==================================================");
      if($scope.board[twoInaRowArray[enumerator][counter]] == $scope.computerMarker && $scope.board[twoInaRowArray[enumerator][counter + 1]] == $scope.computerMarker) {
        $scope.attackTargetSquare = twoInaRowArray[enumerator][counter + 2];
        console.log("Two in a row if Attack ============================================ $scope.attackTargetSquare ", $scope.attackTargetSquare)

         if($scope.board[twoInaRowArray[enumerator][counter]] == $scope.playerMarker && $scope.board[twoInaRowArray[enumerator][counter + 1]] == $scope.playerMarker) {
           $scope.defenseTargetSquare = twoInaRowArray[enumerator][counter + 2];
           console.log("Two in a row NESTED if Defense ============================================ $scope.defenseTargetSquare ", $scope.defenseTargetSquare )
           break;
        }

      }
      else if($scope.board[twoInaRowArray[enumerator][counter]] == $scope.playerMarker && $scope.board[twoInaRowArray[enumerator][counter + 1]] == $scope.playerMarker) {
        $scope.defenseTargetSquare = twoInaRowArray[enumerator][counter + 2];
        console.log("Two in a row Else IF DEFENSE ============================================ $scope.defenseTargetSquare ", $scope.defenseTargetSquare)
        break;
      }
      enumerator++
    }
  }

  $scope.computerAIMove = function() {
    console.log("Making it to computerAIMove");
    console.log("######################################################################");
    var defenseTargetSquare = $scope.defenseTargetSquare;
    var attackTargetSquare = $scope.attackTargetSquare;
    var computerMarker = $scope.computerMarker;

    //first move
    if (computerMoveCount == 0) {
      console.log("Making it to computerAIMove First Move");

      computerMoveCount++;
      if($scope.board["B2"] == " ") {
        $scope.board["B2"] = computerMarker;
      }
      else {
        $scope.board["C1"] = computerMarker;
      }
    }
    //second move
    else if(computerMoveCount == 1) {
      console.log("Making it to second move")
      computerMoveCount++;
      if($scope.defenseTargetSquare && $scope.board[defenseTargetSquare] == " ") {
        console.log("Move 2 Line 164 Defensive Target Square! ", defenseTargetSquare);
        $scope.board[defenseTargetSquare] = computerMarker;
      }
      else if ($scope.board["B2"] == $scope.computerMarker && $scope.board["C1"] == " ") {
        $scope.board["C1"] = computerMarker;
      }
      else if ($scope.board["C1"] == $scope.computerMarker && $scope.board["C2"] == " "){
        $scope.board["C2"] = computerMarker;
      }
      else {
        $scope.randoComputerMove();
      }
    }
    //third move (Defensive && Attack Move) TODO Figure out a way not to hard code the Defensive portion
    else if(computerMoveCount > 1) {
      console.log("making it to third move ", "defTar ", defenseTargetSquare, "attaTar ", attackTargetSquare)
      //Defensive Move
      //TODO NEED A DIFFERENT CONDITIONAL HERE.
      if ($scope.attackTargetSquare && $scope.board[attackTargetSquare] == " ") {
        console.log("Move 3 Line 180 attack Square", attackTargetSquare);
        $scope.board[attackTargetSquare] = computerMarker;
      }
      else if($scope.defenseTargetSquare && playerMoveCount >= 2 && $scope.board[defenseTargetSquare] == " ") {
        console.log("Move 3 Line 181 hitting Defense Square! ", defenseTargetSquare);
        $scope.board[defenseTargetSquare] = computerMarker;
      }


      else {
        //Doesn't always find empty position
        console.log(" Greater Than 1 RANDOM ELSE")
        $scope.randoComputerMove();
      }
    }
    else {
      //Doesn't always find empty position
      console.log("RANDOM ELSE")
      $scope.randoComputerMove();
    }
  }

// TODO right now, this is just iterating through the object and placing the marker in numberical order. not exactly random.
//Also doesn't seem to find last open position
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

  //function that checks for open spaces. use open spaces as a global variable
  $scope.checkForOpenSpaces = function() {
    var openSpaces = [];
      for(var key in $scope.board) {
        var value = $scope.board[key];
        if(value == " ") {
          openSpaces.push(value)
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
    $scope.twoInaRow()
    //Check if winning lines are occupied && occupied by the same marker
    var boardLength = Object.keys($scope.board).length;
    var threeInARow = [["A1", "A2", "A3"], ["B1", "B2", "B3"], ["C1", "C2", "C3"], ["A1", "B1", "C1"], ["A2", "B2", "C2"],
                      ["A3", "B3", "C3" ], ["A1", "B2", "C3"], ["C1", "B2", "A3"]];
    var counter = 0;
    var everyThirdInc = 0;
    var nopeCounter = 0;
    for(var i = 0; i < threeInARow.length; i++) {
      if($scope.board[threeInARow[everyThirdInc][counter]] == "X" && $scope.board[threeInARow[everyThirdInc][counter + 1]] == "X" && $scope.board[threeInARow[everyThirdInc][counter + 2]] == "X"
      || $scope.board[threeInARow[everyThirdInc][counter]] == "O" && $scope.board[threeInARow[everyThirdInc][counter + 1]] == "O" && $scope.board[threeInARow[everyThirdInc][counter + 2]] == "O") {
        $scope.winner = true;
            if($scope.board[threeInARow[everyThirdInc][counter]] == $scope.playerMarker) {
              prompt("Player is a winna!");
              console.log("Winning moves = ", threeInARow[everyThirdInc]);
              $scope.restartGame();
              break;
            }
            else if ($scope.board[threeInARow[everyThirdInc][counter]] == $scope.computerMarker) {
              prompt("Computer Wins!");
              console.log("Winning moves = ", threeInARow[everyThirdInc]);
              $scope.restartGame();
              break;
            }
        }
        //Tie (All Squares occupied and no winner)
        else if ($scope.allSquaresOccupied){
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






}]);
