"use strict";

var gameSquareArray = Array.from(document.getElementsByClassName("gameSquare"));
var turnDisplay = document.getElementById("turnDisplay");
var resetButton = document.getElementById("restart");
var instructionDisplay = document.getElementById("instructions");
var turn = "x";

resetButton.addEventListener("click", resetGame);

gameSquareArray.forEach(function(item){
	item.addEventListener("click", handleButtonClick);
});

function handleButtonClick(){
	
	if(this.touched || checkGameOverConditions() != ""){
		return;
	}
	
	if(turn === "x"){
		this.innerHTML = "X";
		this.touched = true;
		turnDisplay.innerHTML = "O's turn";
		turn = "o";
	}else{
		this.innerHTML = "O";
		this.touched = true;
		turnDisplay.innerHTML = "X's turn";
		turn = "x";
	}

	if(checkGameOverConditions() !== ""){
		resetButton.style.visibility = "visible";
		resetButton.style.margin = "5px auto 5px auto";
		instructionDisplay.innerHTML = "Click the button below to reset";
		if(checkGameOverConditions() === "x"){
			turnDisplay.innerHTML = "GAME OVER - X WINS!";
			markWinnerTextRed("x");
		}else if(checkGameOverConditions() === "o"){
			turnDisplay.innerHTML = "GAME OVER - O WINS!";
			markWinnerTextRed("o");
		}else if(checkGameOverConditions() === "tie"){
			turnDisplay.innerHTML = "GAME OVER - IT'S A TIE!";
			markWinnerTextRed("tie");
		}
	}


}

/*
checkGameOverConditions() checks the board and returns "x" if X won, "o" if O won, 
"tie" if all squares are filled but no one won, or an empty string if the game isn't over yet.
*/
function checkGameOverConditions(){
	var b0h = gameSquareArray[0].innerHTML.toLowerCase();
	var b1h = gameSquareArray[1].innerHTML.toLowerCase();
	var b2h = gameSquareArray[2].innerHTML.toLowerCase();
	var b3h = gameSquareArray[3].innerHTML.toLowerCase();
	var b4h = gameSquareArray[4].innerHTML.toLowerCase();
	var b5h = gameSquareArray[5].innerHTML.toLowerCase();
	var b6h = gameSquareArray[6].innerHTML.toLowerCase();
	var b7h = gameSquareArray[7].innerHTML.toLowerCase();
	var b8h = gameSquareArray[8].innerHTML.toLowerCase();
	
	if((b0h === "x" && b1h === "x" && b2h === "x") || 
		 (b3h === "x" && b4h === "x" && b5h === "x") ||
		 (b6h === "x" && b7h === "x" && b8h === "x") ||
		 (b0h === "x" && b3h === "x" && b6h === "x") ||
		 (b1h === "x" && b4h === "x" && b7h === "x") ||
		 (b2h === "x" && b5h === "x" && b8h === "x") ||
		 (b0h === "x" && b4h === "x" && b8h === "x") ||
		 (b2h === "x" && b4h === "x" && b6h === "x")){
		return "x";
	}else if((b0h === "o" && b1h === "o" && b2h === "o") || 
		 (b3h === "o" && b4h === "o" && b5h === "o") ||
		 (b6h === "o" && b7h === "o" && b8h === "o") ||
		 (b0h === "o" && b3h === "o" && b6h === "o") ||
		 (b1h === "o" && b4h === "o" && b7h === "o") ||
		 (b2h === "o" && b5h === "o" && b8h === "o") ||
		 (b0h === "o" && b4h === "o" && b8h === "o") ||
		 (b2h === "o" && b4h === "o" && b6h === "o")){
			return "o";
	}else if(allSquaresFull()){
		return "tie";
	}else{
		return "";
	}
}
/*
allSquaresFull() checks if all the squares of the game are full, returns true if they are,
false if not.
*/
function allSquaresFull(){
	return gameSquareArray.every(function(item){
		return item.touched;
	});
}

/*
resetGame() resets the game by resetting game variables such as the turn and
clearing all game squares, then hides the reset button. Return type void.
*/
function resetGame(){
	turn = "x";
	gameSquareArray.forEach(function(item){
		item.innerHTML = "";
		item.touched = false;
		item.style.color = "black";
	});
	resetButton.style.visibility = "hidden";
	resetButton.style.margin = "-5px";
	turnDisplay.innerHTML = "X's turn";
	instructionDisplay.innerHTML = "Click a square to mark it";
}
/*
markWinnerTextRed() changes the color of the winner's text to red for the user to more easily
see the victory. Return type void.
*/
function markWinnerTextRed(winner){
	gameSquareArray.forEach(function(item){
		if(item.innerHTML.toLowerCase() === winner){
			item.style.color = "red";
		}else if(winner.toLowerCase() === "tie"){
			item.style.color = "gray";
		}
	});
}